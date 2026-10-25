/* ==========================================================================
   Site content — edit the words here; the pages update automatically.
   ========================================================================== */

/* Occasions: each piece in pieces.js carries one of these ids in "occasion". */
const OCCASIONS = [
    { id: 'bridal', name: 'Bridal', cover: 'temple-gold',
      blurb: 'For the muhurtham, the reception and every ceremony in between.' },
    { id: 'festive', name: 'Festive', cover: 'ochre-pearl',
      blurb: 'Deepavali, Pongal, family functions and evenings that call for silk.' },
    { id: 'everyday', name: 'Everyday Luxury', cover: 'aqua-sheer',
      blurb: 'Quietly embroidered pieces for the days that deserve a little more.' },
    { id: 'kids', name: 'Kids & Teens', cover: 'amber-kadwa',
      blurb: 'Pattu pavadais, frocks and half-sarees, made with the same care.' }
];

/* DRAFT — written for the site from the boutique's existing story.
   Please have Thamarai Selvi read and approve (or rewrite) before publishing. */
const ATELIER_NOTE = {
    quote: 'Every piece that leaves our boutique begins as a conversation: about the occasion, the colours you love, and how you want to feel when you wear it. We embroider each one by hand, slowly, here in Coimbatore, and we make it only once, so that what you wear is yours alone.',
    name: 'Thamarai Selvi',
    role: 'Thamarai Designers, Coimbatore'
};

/* How a commission works — every step reflects how the boutique already works. */
const PROCESS = [
    ['The conversation', 'Book a private viewing or message us on WhatsApp. We talk about your occasion, colours and the pieces you love.'],
    ['Cloth & design', 'Choose a piece from the collection, or ask for something entirely bespoke. Fabric, embroidery and size are agreed together.'],
    ['The handwork', 'Your piece is embroidered by hand in our Coimbatore boutique. Most pieces take four to fourteen days.'],
    ['Made for you', 'Your finished piece is made only once, for you.']
];

const FAQ = [
    ['How do I order a piece?',
     'Book a private viewing through the contact page or message us on WhatsApp. We will talk through your occasion, then confirm the fabric, design and size with you.'],
    ['How long does a piece take?',
     'Every piece is made to order. Most are ready in four to fourteen days, depending on the embroidery; the time for each piece is listed on its page.'],
    ['What sizes do you make?',
     'Most pieces are made in S to XL, and several from XS. The sizes for each piece are listed on its page; ask us if you need something different.'],
    ['How are pieces priced?',
     'Every piece is priced on request, based on the fabric, the embroidery and the length.'],
    ['Can I ask for a design of my own?',
     'Yes. Choose "Something bespoke" in the request form, or tell us on WhatsApp what you have in mind.'],
    ['Can I visit the boutique?',
     'Yes, by appointment. The boutique is in Saravanampatti, Coimbatore; the address and map are on the contact page.']
];

/* Client stories — the section stays hidden until at least one real story is added.
   Only add genuine words from real clients, with their permission. Example:
   { quote: 'Their words…', name: 'Client name', occasion: 'Wedding, 2026', piece: 'temple-gold' } */
const CLIENT_STORIES = [];

const INSTAGRAM = { handle: 'threads_by_thamarai', url: 'https://www.instagram.com/threads_by_thamarai/' };
