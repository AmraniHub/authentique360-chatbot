# CLAUDE CODE BUILD PROMPT
## Authentique360 — AI Sales Chatbot for Shopify

Paste this entire file into Claude Code as your build instruction.

---

## WHAT TO BUILD

A floating AI-powered sales advisor chatbot widget for the Shopify store **authentique360.com**.

**Stack:**
- Vanilla HTML + CSS + JavaScript (embeddable in Shopify `theme.liquid`)
- Claude AI API (`claude-sonnet-4-20250514`) via `fetch()` on the frontend
- No framework, no build step — single `<script>` block + `<style>` block

**Output:** One self-contained HTML file (`authentique360-chatbot.html`) that:
1. Renders a floating chat button (bottom-right corner)
2. Opens a luxury dark/gold themed chat window
3. Calls Claude API with a trilingual system prompt + product catalog
4. Detects user language (French / Arabic / English) and responds accordingly
5. Renders clickable product cards inside chat when bot recommends a product
6. Has a WhatsApp contact button in the chat footer

---

## STORE INTELLIGENCE

### Brand
- **Name:** Authentique360
- **URL:** https://authentique360.com
- **Platform:** Shopify
- **Market:** Morocco (COD — paiement à la livraison)
- **Niche:** Décants de parfums de luxe 100% authentiques
- **Primary language:** French (ads and UI are in French)
- **Secondary:** Arabic (Darija), English

### Core Offer
- **Product:** Pack 2 Décants — 10ml + 10ml (two different fragrances)
- **Promo price:** 199 DH (strikethrough 250 DH)
- **USP:** Buy two luxury fragrance decants instead of a full bottle — test before you commit
- **Payment:** Cash on delivery, no card required
- **Delivery:** 24–72 hours partout au Maroc
- **Delivery cost:** Free on current promo offers; free above 500 DH otherwise
- **Damaged parcel policy:** Client refuses at door → WhatsApp → free resend, no charge

### Trust Signals (from ad creatives)
- ✅ 100% Original
- ✅ Qualité Premium
- ✅ Livraison partout au Maroc
- ✅ Livraison Rapide

---

## PRODUCT CATALOG

All 4 products confirmed from ad images. Price: 199 DH / oldPrice: 250 DH / Size: 10ml + 10ml.

```json
[
  {
    "id": 1,
    "name": "JPG Le Beau + D&G Light Blue",
    "fullName": "Jean Paul Gaultier Le Beau + Dolce & Gabbana Light Blue Eau Intense Pour Homme",
    "gender": "homme",
    "price": "199 DH",
    "oldPrice": "250 DH",
    "size": "10ml + 10ml",
    "olfactoryProfile": "Frais, citronné, aquatique — parfait pour l'été et la journée",
    "tags": ["frais", "citrus", "aquatique", "été", "léger", "casual", "jpg", "dolce gabbana"],
    "url": "https://authentique360.com/products/REPLACE_WITH_REAL_HANDLE",
    "image": "REPLACE_WITH_SHOPIFY_CDN_URL"
  },
  {
    "id": 2,
    "name": "JPG Le Beau + Guerlain L'Homme Idéal",
    "fullName": "Jean Paul Gaultier Le Beau + Guerlain L'Homme Idéal Extrême",
    "gender": "homme",
    "price": "199 DH",
    "oldPrice": "250 DH",
    "size": "10ml + 10ml",
    "olfactoryProfile": "Amande, boisé, oriental — sophistiqué et séduisant, idéal soirée",
    "tags": ["boisé", "amande", "oriental", "sophistiqué", "chaud", "soirée", "guerlain"],
    "url": "https://authentique360.com/products/REPLACE_WITH_REAL_HANDLE",
    "image": "REPLACE_WITH_SHOPIFY_CDN_URL"
  },
  {
    "id": 3,
    "name": "JPG Le Parfum + Armani Stronger With You",
    "fullName": "Jean Paul Gaultier Le Beau Le Parfum + Emporio Armani Stronger With You Intensely",
    "gender": "homme",
    "price": "199 DH",
    "oldPrice": "250 DH",
    "size": "10ml + 10ml",
    "olfactoryProfile": "Vanille, épicé intense — très séducteur, signature forte pour les sorties nocturnes",
    "tags": ["vanille", "épicé", "intense", "séducteur", "soirée", "armani", "chaud"],
    "url": "https://authentique360.com/products/REPLACE_WITH_REAL_HANDLE",
    "image": "REPLACE_WITH_SHOPIFY_CDN_URL"
  },
  {
    "id": 4,
    "name": "JPG Le Beau + Armaf Club de Nuit",
    "fullName": "Jean Paul Gaultier Le Beau + Armaf Club de Nuit Intense Man",
    "gender": "homme",
    "price": "199 DH",
    "oldPrice": "250 DH",
    "size": "10ml + 10ml",
    "olfactoryProfile": "Fumé, masculin puissant — signature affirmée, accord fumé et boisé",
    "tags": ["fumé", "masculin", "intense", "boisé", "soirée", "armaf", "club de nuit"],
    "url": "https://authentique360.com/products/REPLACE_WITH_REAL_HANDLE",
    "image": "REPLACE_WITH_SHOPIFY_CDN_URL"
  }
]
```

---

## SYSTEM PROMPT FOR CLAUDE API

Use this verbatim as the `system` field in every API call:

```
Tu es le conseiller parfums officiel d'Authentique360, boutique marocaine premium de décants de luxe 100% authentiques.

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
Ne mentionne jamais de concurrents.
```

---

## CHATBOT BEHAVIOR SPEC

### Language detection
- Default: French
- Arabic/Darija detected → respond in Darija
- English detected → respond in English
- Never mix languages in same response

### Product card rendering
- Parse bot response for `[PRODUCT:N]` tokens
- Replace each with a rendered product card (image, name, price, "Commander →" CTA button)
- CTA links to product URL in new tab
- If image URL is empty → show perfume bottle emoji as placeholder

### Quick replies on welcome message
Show these buttons after first bot message:
- "Parfums pour homme"
- "Offre en cours"
- "Livraison & paiement"
- "Besoin de conseils"

Clicking a quick reply sends it as a user message.

### WhatsApp
- Fixed button in chat footer: "Contacter sur WhatsApp"
- Links to: `https://wa.me/[WHATSAPP_NUMBER]?text=[URL_ENCODED_DEFAULT_MSG]`
- Default message: "Bonjour Authentique360, j'ai une question sur vos parfums"

### Welcome message (bot sends automatically on chat open, French)
```
Bienvenue chez **Authentique360** ✨
Je suis votre conseiller parfums. Nos packs 2 décants 10ml + 10ml sont à **199 DH** — livraison à domicile partout au Maroc, vous payez à la réception.
Comment puis-je vous aider ?
```

---

## DESIGN SPEC

### Theme
Dark luxury. Think high-end Moroccan parfumerie.

### Colors (CSS variables)
```css
--gold: #c9a84c;
--gold-light: #e8cc7a;
--dark: #0c0b09;
--dark-2: #171410;
--dark-3: #201d18;
--cream: #f0ead8;
--cream-dim: #9e967e;
--green-wa: #25D366;
```

### Typography
- Google Fonts: `Cormorant Garamond` (headings/brand) + `DM Sans` (body/UI)

### Layout
- Floating button: 62×62px circle, gold gradient, bottom-right, pulsing glow animation
- Chat window: 390×600px, dark background, gold border, opens with scale+fade animation
- Mobile: full width minus 16px padding, 72vh height

### Components
1. **Toggle button** — gold circle with chat icon; switches to X when open; notification badge (red dot with "1") until first open
2. **Chat header** — logo ring with "A", store name in Cormorant Garamond, green status dot "Conseiller Parfums"
3. **Message bubbles** — bot: dark bg with gold border; user: gold gradient
4. **Product card** — dark card, image (110px height), name, price (gold) + strikethrough old price, size label, gold "Commander →" button
5. **Typing indicator** — 3 gold dots bouncing
6. **Input area** — dark textarea + gold send button
7. **WhatsApp bar** — footer, green WA icon + "Contacter sur WhatsApp"

---

## API CALL SPEC

```javascript
const response = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY,
    'anthropic-version': '2023-06-01',
    'anthropic-dangerous-direct-browser-access': 'true'
  },
  body: JSON.stringify({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 400,
    system: SYSTEM_PROMPT,
    messages: conversationHistory // full history array [{role, content}]
  })
});
const data = await response.json();
const reply = data.content[0].text;
```

**Important:** For Shopify production, do NOT expose the API key in frontend JS.
Build a serverless proxy (Netlify Function or Vercel Edge Function) that receives the message history and calls the Anthropic API server-side. The chatbot widget calls your proxy URL instead.

---

## SHOPIFY EMBED INSTRUCTIONS (include as code comments)

```html
<!-- 
  SHOPIFY INTEGRATION:
  1. Go to Online Store → Themes → Edit Code
  2. Open theme.liquid
  3. Paste the <style> block inside <head>
  4. Paste the widget HTML + <script> block just before </body>
  5. Replace YOUR_API_KEY with your Anthropic API key (or proxy URL)
  6. Replace WHATSAPP_NUMBER with your actual number (no + sign, e.g. 212612345678)
  7. Replace all product URLs with actual Shopify product page URLs
  8. Replace all image fields with actual Shopify CDN image URLs
-->
```

---

## FILE OUTPUT

Produce a single file: `authentique360-chatbot.html`

Contains:
- Demo page backdrop (dark, for preview purposes only — remove when embedding in Shopify)
- `<style>` block with all CSS
- Widget HTML (toggle button + chat window)
- `<script>` block with all JS logic

All in one file, no external dependencies except Google Fonts CDN.
