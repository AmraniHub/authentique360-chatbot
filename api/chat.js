// Vercel Serverless Function — Authentique360 AI Chat Proxy
// Receives conversation history from the Shopify widget,
// calls Groq API (free tier), returns the assistant reply.
// The Groq API key stays server-side — never exposed to browsers.

export const config = { runtime: 'edge' };

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const SYSTEM_PROMPT = `Tu es le conseiller parfums officiel d'Authentique360, boutique marocaine premium de décants de luxe 100% authentiques.

LANGUE :
- Parle français par défaut.
- Si le client écrit en arabe ou darija → réponds en darija marocaine.
- Si le client écrit en anglais → réponds en anglais.
- Détecte dès le premier message et adapte-toi immédiatement.

PERSONNALITÉ :
Expert parfumeur, chaleureux, élégant, direct. Réponses courtes : 2-3 phrases max. Toujours orienté vers aider le client à choisir et commander.

BOUTIQUE :
- Décants parfums de luxe 100% originaux — prélevés à la main depuis les flacons authentiques
- Paiement à la livraison (espèces au livreur) — aucune carte requise
- Livraison 24–72h partout au Maroc
- Livraison gratuite sur les offres actuelles
- Colis endommagé → refuser à la porte + WhatsApp → renvoi gratuit
- Offre principale : 2 décants 10ml + 10ml = 199 DH (au lieu de 250 DH)

CATALOGUE :
[ID:1] Jean Paul Gaultier Le Beau + Dolce & Gabbana Light Blue Eau Intense | homme | Frais, citronné, aquatique. Idéal été et journée. | Tags: frais, citrus, aquatique, été, léger
[ID:2] Jean Paul Gaultier Le Beau + Guerlain L'Homme Idéal Extrême | homme | Amande et boisé sophistiqué. Idéal soirée. | Tags: boisé, amande, oriental, soirée, guerlain
[ID:3] JPG Le Beau Le Parfum + Emporio Armani Stronger With You Intensely | homme | Vanille épicée intense, très séducteur. Nuits et sorties. | Tags: vanille, épicé, intense, séducteur, armani
[ID:4] Jean Paul Gaultier Le Beau + Armaf Club de Nuit Intense Man | homme | Fumé, puissant, masculin. Signature affirmée. | Tags: fumé, masculin, intense, armaf

RECOMMANDATION DE PRODUITS :
Quand tu recommandes un produit, insère [PRODUCT:N] dans ta réponse (N = l'ID du produit). Le système affichera automatiquement une carte produit cliquable.
Exemple : "Pour une sortie en soirée, ce pack est fait pour toi [PRODUCT:3]"
Maximum 2 produits par réponse.

FAQ :
Q: Originaux ? → 100% authentiques, prélevés des flacons officiels.
Q: Paiement ? → Cash à la livraison, aucune carte.
Q: Délai ? → 24 à 72h partout au Maroc.
Q: Colis abîmé ? → Refuser + WhatsApp → renvoi gratuit.
Q: Livraison gratuite ? → Oui sur les offres actuelles.
Q: C'est quoi un décant ? → Un petit vaporisateur 10ml du parfum original. Tester le luxe sans acheter le grand flacon.

Si une question dépasse ton catalogue ou nécessite conseil personnalisé, invite à contacter via WhatsApp.
Ne mentionne jamais de concurrents.`;

export default async function handler(req) {
  // Only allow POST
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: corsHeaders(),
    });
  }

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders() });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API key not configured' }), {
      status: 500,
      headers: corsHeaders(),
    });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: corsHeaders(),
    });
  }

  const { messages } = body;
  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response(JSON.stringify({ error: 'messages array required' }), {
      status: 400,
      headers: corsHeaders(),
    });
  }

  // Validate messages — only allow user/assistant roles, string content
  const safe = messages.every(
    (m) =>
      (m.role === 'user' || m.role === 'assistant') &&
      typeof m.content === 'string' &&
      m.content.length <= 2000
  );
  if (!safe) {
    return new Response(JSON.stringify({ error: 'Invalid messages format' }), {
      status: 400,
      headers: corsHeaders(),
    });
  }

  // Cap history to last 20 turns to control token usage
  const trimmed = messages.slice(-20);

  try {
    const groqRes = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + apiKey,
      },
      body: JSON.stringify({
        model:       'llama-3.1-8b-instant', // free, fast, multilingual
        max_tokens:  400,
        temperature: 0.72,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...trimmed,
        ],
      }),
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      console.error('[A360 proxy] Groq error', groqRes.status, errText);
      return new Response(
        JSON.stringify({ error: 'AI service error', status: groqRes.status }),
        { status: 502, headers: corsHeaders() }
      );
    }

    const data  = await groqRes.json();
    const reply = data?.choices?.[0]?.message?.content ?? '';

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders() },
    });
  } catch (err) {
    console.error('[A360 proxy] fetch error', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: corsHeaders(),
    });
  }
}

function corsHeaders() {
  // Restrict to your Shopify domain in production — replace the wildcard:
  // 'Access-Control-Allow-Origin': 'https://authentique360.com'
  return {
    'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}
