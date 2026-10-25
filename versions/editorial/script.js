/* ==========================================================================
   THAMARAI DESIGNERS
   Single-page site: entrance → home → collection → piece → story → contact.
   Piece data lives in pieces.js.
   ========================================================================== */

(() => {
    const WHATSAPP = '919047474752';
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    const $ = (sel, el = document) => el.querySelector(sel);
    const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];
    const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const byId = (id) => PIECES.find((p) => p.id === id);
    const num = (p) => `Nº ${p.code.replace(/^TD-/, '')}`;
    const range = (s) => String(s).replace(/(\d)\s*-\s*(\d)/g, '$1–$2');
    const waLink = (text) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

    const LOTUS = `<svg viewBox="0 0 100 92" aria-hidden="true">
        <path d="M50 14 C60 30 60 52 50 68 C40 52 40 30 50 14 Z"/>
        <path d="M50 68 C38 61 29 47 31 30 C42 36 49 50 50 68"/>
        <path d="M50 68 C62 61 71 47 69 30 C58 36 51 50 50 68"/>
        <path d="M50 68 C34 69 19 60 12 45 C27 44 41 54 50 68"/>
        <path d="M50 68 C66 69 81 60 88 45 C73 44 59 54 50 68"/>
        <path d="M20 78 H80"/><path d="M32 85 H68"/></svg>`;

    const CATEGORIES = [
        ['all', 'All'],
        ['blouses', 'Blouses'],
        ['sets', 'Lehengas & Sets'],
        ['dresses', 'Dresses & Kurtis']
    ];

    const tile = (p, i) => `
        <a class="tile" href="#/piece/${p.id}" data-reveal style="--d:${(i % 3) * 0.08}s">
            <div class="frame"><img src="${p.image}" alt="${esc(p.name)}" loading="lazy" decoding="async"></div>
            <div class="tile__cap">
                <h3 class="tile__name">${esc(p.name)}</h3>
                <p class="tile__meta">${esc(p.work)}</p>
            </div>
        </a>`;

    /* ----------------------------------------------------------------------
       Views
       ---------------------------------------------------------------------- */
    function homeView() {
        const hero = byId('navy-lehenga');
        const [lead, ...featured] = ['temple-gold', 'velvet-zardosi', 'forest-zardosi', 'royal-silk', 'ochre-pearl']
            .map(byId).filter(Boolean);
        const crafts = ['Zardosi', 'Gold saree', 'Mirror work', 'Beadwork', 'Stone work', 'Pearl detailing', 'Cut-work', 'Sequin work', 'Silk brocade', 'Kanjeevaram silk'];
        const mark = `<svg viewBox="0 0 100 92" aria-hidden="true"><path d="M50 14 C60 30 60 52 50 68 C40 52 40 30 50 14 Z"/><path d="M50 68 C34 69 19 60 12 45 C27 44 41 54 50 68"/><path d="M50 68 C66 69 81 60 88 45 C73 44 59 54 50 68"/></svg>`;
        const ribbon = crafts.map((c) => `<span>${c}</span>${mark}`).join('');
        const handwork = [
            ['forest-zardosi', 'detail-zardosi', 'Zardosi &amp; beadwork', 'Raised metallic thread finished with glass bead tassels along the sleeve.'],
            ['champagne-zardosi', 'detail-zari', 'Gold saree borders', 'Woven gold bands framing a sculpted open back.'],
            ['black-pink-saree', 'detail-thread', 'Thread &amp; stone work', 'Silk-thread florals set with stones, worked across the shoulder.'],
            ['temple-gold', 'detail-neckline', 'Temple neckline', 'A beaded saree neckline in the temple tradition.']
        ];

        return `
        <section class="hero wrap">
            <div class="hero__copy">
                <p class="eyebrow" data-hero style="--d:.1s">Bespoke embroidery · Coimbatore</p>
                <h1 class="hero__title" data-hero style="--d:.25s">One <em>of One.</em></h1>
                <p class="lede" data-hero style="--d:.45s">Hand-embroidered couture, made to order and made only once. Every piece is shown by private appointment.</p>
                <div class="hero__actions" data-hero style="--d:.6s">
                    <a class="btn" href="#/collection">View the collection</a>
                    <a class="btn btn--ghost" href="#/contact">Book a viewing</a>
                </div>
                <dl class="hero__facts" data-hero style="--d:.75s">
                    <div><dt>Craft</dt><dd>Embroidered by hand</dd></div>
                    <div><dt>Making</dt><dd>Made to order</dd></div>
                    <div><dt>Atelier</dt><dd>Coimbatore</dd></div>
                </dl>
            </div>
            <div class="hero__visual" data-hero style="--d:.35s">
                <a class="hero__frame" href="#/piece/${hero.id}">
                    <div class="frame"><img src="/images/web/hero.jpg?v=2" alt="${esc(hero.name)}" fetchpriority="high"></div>
                </a>
                <figure class="hero__detail">
                    <div class="frame"><img src="/images/web/detail-hero.jpg?v=2" alt="Close-up of the saree neckline"></div>
                </figure>
                <p class="hero__caption"><em>${num(hero)}</em><span>${esc(hero.name)}</span></p>
            </div>
        </section>

        <div class="ribbon" aria-hidden="true"><div class="ribbon__track">${ribbon}${ribbon}</div></div>

        <section class="intro wrap">
            <div data-reveal>
                <p class="eyebrow">The House</p>
                <h2 class="intro__text">Every piece is embroidered by hand in our Coimbatore atelier, made for <em>one person</em>, and never repeated.</h2>
            </div>
            <div class="intro__side" data-reveal style="--d:.12s">
                <p>Every piece at Thamarai Designers begins with a hand-tied thread and a maker's care. Our collections celebrate artisanal technique, thoughtful finishes, and premium luxury made with love.</p>
                <a class="text-link" href="#/story">Our story →</a>
            </div>
        </section>

        <section class="featured wrap">
            <div class="section-head">
                <div><p class="eyebrow" data-reveal>Featured</p><h2 class="title" data-reveal>Selected <em>pieces</em></h2></div>
                <a class="text-link" href="#/collection" data-reveal>View all ${PIECES.length} pieces →</a>
            </div>
            <div class="feature-grid">
                <a class="tile tile--lead" href="#/piece/${lead.id}" data-reveal>
                    <div class="frame"><img src="${lead.image}" alt="${esc(lead.name)}" loading="lazy" decoding="async"></div>
                    <div class="tile__cap">
                        <p class="tile__num">${num(lead)}</p>
                        <h3 class="tile__name">${esc(lead.name)}</h3>
                        <p class="tile__meta">${esc(lead.fabric)} · ${esc(lead.work)}</p>
                    </div>
                </a>
                ${featured.map((p, i) => tile(p, i + 1)).join('')}
            </div>
        </section>

        <section class="craft wrap">
            <div class="section-head">
                <div><p class="eyebrow" data-reveal>The Handwork</p><h2 class="title" data-reveal>Every stitch, <em>by hand.</em></h2></div>
                <p class="lede" data-reveal>Up close, the work speaks for itself. Each technique is placed by skilled hands in our atelier.</p>
            </div>
            <div class="craft__grid">
                ${handwork.map(([id, img, title, text], i) => `
                <a class="craft__item" href="#/piece/${id}" data-reveal style="--d:${i * 0.08}s">
                    <div class="frame"><img src="/images/web/${img}.jpg?v=2" alt="${title.replace('&amp;', 'and')} close-up" loading="lazy" decoding="async"></div>
                    <span class="craft__n">${['i', 'ii', 'iii', 'iv'][i]}.</span>
                    <h3>${title}</h3>
                    <p>${text}</p>
                </a>`).join('')}
            </div>
        </section>

        <section class="band">
            <div class="band__bg"><img src="/images/web/loom.jpg?v=2" alt="" loading="lazy" decoding="async"></div>
            <div class="band__inner wrap">
                <div>
                    <p class="eyebrow" data-reveal>The Atelier</p>
                    <h2 class="title" data-reveal>Made slowly,<br><em>in Coimbatore.</em></h2>
                    <p class="lede" data-reveal>From quiet loom rooms in Coimbatore to curated designs for modern celebration, we honour the slow craft of embroidery and the soulful values of homegrown creativity.</p>
                    <a class="btn btn--light" href="#/story" data-reveal>Our story</a>
                </div>
                <div class="band__img" data-reveal><div class="frame"><img src="/images/web/needle.jpg?v=2" alt="An artisan's hands embroidering white thread work" loading="lazy" decoding="async"></div></div>
            </div>
        </section>

        <section class="invite wrap">
            <div class="invite__card" data-reveal>
                <div class="invite__mark">${LOTUS}</div>
                <p class="eyebrow">By appointment</p>
                <h2 class="title">A private <em>viewing.</em></h2>
                <p class="lede">Tell us about your occasion and we will arrange a personal consultation with the atelier.</p>
                <a class="btn" href="#/contact">Book a viewing</a>
            </div>
        </section>`;
    }

    function collectionView() {
        const counts = Object.fromEntries(CATEGORIES.map(([key]) =>
            [key, key === 'all' ? PIECES.length : PIECES.filter((p) => p.category === key).length]));
        return `
        <section class="page-head wrap">
            <p class="eyebrow" data-reveal>The Collection</p>
            <h1 class="display" data-reveal>Each piece, <em>made once.</em></h1>
            <p class="lede" data-reveal>Browse the collection and choose a piece to begin a private conversation with the atelier.</p>
        </section>
        <section class="wrap collection-grid">
            <div class="filters" role="group" aria-label="Filter pieces">
                ${CATEGORIES.filter(([key]) => counts[key] > 0).map(([key, label]) =>
                    `<button class="chip" type="button" data-filter="${key}">${label}</button>`).join('')}
            </div>
            <div class="grid" id="collection"></div>
        </section>`;
    }

    function pieceView(p) {
        const i = PIECES.indexOf(p);
        const prev = PIECES[(i - 1 + PIECES.length) % PIECES.length];
        const next = PIECES[(i + 1) % PIECES.length];
        const enquiry = `Hello Thamarai Designers, I would like to enquire about ${p.name} (${p.code}).`;
        return `
        <article class="piece wrap">
            <a class="piece__back" href="#/collection">← Back to the collection</a>
            <div class="piece__grid">
                <div class="piece__media" data-reveal>
                    <div class="frame piece__frame" id="piece-frame"><img src="${p.image}" alt="${esc(p.name)}"></div>
                </div>
                <div class="piece__body">
                    <p class="eyebrow" data-reveal>${num(p)}</p>
                    <h1 class="piece__name" data-reveal>${esc(p.name)}</h1>
                    <p class="piece__desc" data-reveal>${esc(p.description)}</p>
                    <dl class="details" data-reveal>
                        <div><dt>Fabric</dt><dd>${esc(p.fabric)}</dd></div>
                        <div><dt>Embroidery</dt><dd>${esc(p.work)}</dd></div>
                        <div><dt>Sizes</dt><dd>${esc(p.sizes)}</dd></div>
                        <div><dt>Made to order</dt><dd>${esc(range(p.delivery))}</dd></div>
                    </dl>
                    <p class="price" data-reveal>Price on request</p>
                    <div class="piece__actions" data-reveal>
                        <a class="btn" href="#/contact/${p.id}">Book a viewing</a>
                        <a class="btn btn--ghost" href="${waLink(enquiry)}" target="_blank" rel="noreferrer">Ask on WhatsApp</a>
                    </div>
                </div>
            </div>
            <nav class="pager" aria-label="More pieces">
                <a href="#/piece/${prev.id}"><small>← Previous</small><strong>${esc(prev.name)}</strong></a>
                <a href="#/piece/${next.id}"><small>Next →</small><strong>${esc(next.name)}</strong></a>
            </nav>
        </article>`;
    }

    function storyView() {
        return `
        <section class="story-hero">
            <img src="/images/web/loom.jpg?v=2" alt="Looms in warm afternoon light">
            <div class="wrap">
                <p class="eyebrow" data-hero style="--d:.1s">Our Story</p>
                <h1 class="display" data-hero style="--d:.25s">Heritage,<br><em>by hand.</em></h1>
            </div>
        </section>
        <section class="wrap section story">
            <p class="story__lead" data-reveal>Handcrafted in Coimbatore, inspired by Tamil Nadu's <em>timeless weaving traditions.</em></p>
            <div class="story__body">
                <p data-reveal>Every piece at Thamarai Designers begins with a hand-tied thread and a maker's care. Our collections celebrate artisanal technique, thoughtful homemade finishes, and premium luxury made with love.</p>
                <p data-reveal>From quiet loom rooms in Coimbatore to curated designs for modern celebration, we honour the slow craft of embroidery and the soulful values of homegrown creativity.</p>
                <p data-reveal>Each ensemble is made with skilled hands, traditional weaving, and an elevated sense of refinement, creating heirloom-quality pieces that feel both authentic and undeniably luxurious.</p>
                <a class="btn" href="#/collection" data-reveal>View the collection</a>
            </div>
        </section>
        <section class="wrap duo">
            <div class="frame" data-reveal><img src="/images/web/needle.jpg?v=2" alt="White thread embroidery worked by hand" loading="lazy"></div>
            <div class="frame" data-reveal style="--d:.12s"><img src="/images/web/hoop.jpg?v=2" alt="Crewel embroidery on a hoop" loading="lazy"></div>
        </section>
        <section class="wrap section">
            <div class="pillars">
                <div data-reveal><h3>Artisanal weaving</h3><p>Handwoven textiles finished in rich, premium detail.</p></div>
                <div data-reveal style="--d:.1s"><h3>Handcrafted in Tamil Nadu</h3><p>Made by artisans rooted in Tamil Nadu's heritage of cloth and craft.</p></div>
                <div data-reveal style="--d:.2s"><h3>Made for you</h3><p>Locally crafted, beautifully personal, thoughtfully designed.</p></div>
            </div>
        </section>`;
    }

    function contactView(selected) {
        const options = PIECES.map((p) =>
            `<option value="${p.id}" ${selected && selected.id === p.id ? 'selected' : ''}>${esc(p.name)}</option>`).join('');
        return `
        <section class="page-head wrap">
            <p class="eyebrow" data-reveal>Contact</p>
            <h1 class="display" data-reveal>Book a <em>private viewing.</em></h1>
            <p class="lede" data-reveal>Share a few details and your request opens in WhatsApp, ready to send to the atelier. We reply to every enquiry personally.</p>
        </section>
        <section class="wrap contact">
            <form class="form" id="contact-form" data-reveal>
                <h2>Your request</h2>
                <div class="form__grid">
                    <div class="field"><label for="f-name">Name</label><input id="f-name" name="name" autocomplete="name" required></div>
                    <div class="field"><label for="f-phone">Phone</label><input id="f-phone" name="phone" type="tel" autocomplete="tel" required></div>
                    <div class="field"><label for="f-occasion">Occasion</label>
                        <select id="f-occasion" name="occasion">
                            <option>Wedding</option><option>Engagement</option><option>Reception</option><option>Festive celebration</option><option>Something else</option>
                        </select></div>
                    <div class="field"><label for="f-date">Date of the occasion</label><input id="f-date" name="date" type="date"></div>
                    <div class="field field--full"><label for="f-piece">Piece of interest</label>
                        <select id="f-piece" name="piece">
                            <option value="">Something bespoke</option>
                            ${options}
                        </select></div>
                    <div class="field field--full"><label for="f-note">Note (optional)</label><textarea id="f-note" name="note" rows="3"></textarea></div>
                </div>
                <div class="form__foot">
                    <p class="form__note">Sent only to the atelier, through WhatsApp.</p>
                    <button class="btn" type="submit">Send request</button>
                </div>
            </form>
            <aside data-reveal style="--d:.1s">
                <dl class="info">
                    <div><dt>Visit</dt><dd>4, Cherama, 332/3, Thirumurugan Nagar Road, Saravanampatti, Coimbatore 641014</dd></div>
                    <div><dt>Phone · Thamarai Selvi</dt><dd><a href="tel:+919047474752">+91 90474 74752</a></dd></div>
                    <div><dt>WhatsApp</dt><dd><a href="https://wa.me/${WHATSAPP}" target="_blank" rel="noreferrer">Message the atelier →</a></dd></div>
                    <div><dt>Email</dt><dd><a href="mailto:thamaraidesigner24@gmail.com">thamaraidesigner24@gmail.com</a></dd></div>
                    <div><dt>Instagram</dt><dd><a href="https://www.instagram.com/threads_by_thamarai/" target="_blank" rel="noreferrer">@threads_by_thamarai</a></dd></div>
                </dl>
                <div class="map">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1002444.6849472626!2d75.81891047812498!3d11.053650100000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8570011b7e14d%3A0x39879a1be0a00086!2sTHAMARAI%20DESIGNERS!5e0!3m2!1sen!2sin!4v1774978673514!5m2!1sen!2sin" title="Thamarai Designers location" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </aside>
        </section>`;
    }

    /* ----------------------------------------------------------------------
       Page behaviours
       ---------------------------------------------------------------------- */
    function bindCollection() {
        const grid = $('#collection');
        let filter = 'all';
        const draw = () => {
            const items = PIECES.filter((p) => filter === 'all' || p.category === filter);
            grid.innerHTML = items.map(tile).join('');
            $$('[data-filter]').forEach((b) => b.classList.toggle('is-active', b.dataset.filter === filter));
            observeReveals(grid);
        };
        $$('[data-filter]').forEach((b) => b.addEventListener('click', () => { filter = b.dataset.filter; draw(); }));
        draw();
    }

    function bindPiece() {
        const frame = $('#piece-frame');
        if (!frame || !finePointer) return;
        const img = $('img', frame);
        frame.addEventListener('mouseenter', () => frame.classList.add('is-zoom'));
        frame.addEventListener('mouseleave', () => frame.classList.remove('is-zoom'));
        frame.addEventListener('mousemove', (e) => {
            const r = frame.getBoundingClientRect();
            img.style.transformOrigin = `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`;
        });
    }

    function bindContact() {
        const form = $('#contact-form');
        if (!form) return;
        $('#f-date', form).min = new Date().toISOString().slice(0, 10);
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!form.reportValidity()) return;
            const data = new FormData(form);
            const piece = byId(data.get('piece'));
            const date = data.get('date')
                ? new Date(data.get('date') + 'T00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
                : 'Not yet fixed';
            const lines = [
                'Hello Thamarai Designers, I would like to book a private viewing.',
                '',
                `Name: ${data.get('name')}`,
                `Phone: ${data.get('phone')}`,
                `Occasion: ${data.get('occasion')}`,
                `Date: ${date}`,
                `Piece: ${piece ? `${piece.name} (${piece.code})` : 'Something bespoke'}`
            ];
            const note = String(data.get('note') || '').trim();
            if (note) lines.push(`Note: ${note}`);
            window.open(waLink(lines.join('\n')), '_blank', 'noopener');
        });
    }

    /* ----------------------------------------------------------------------
       Router
       ---------------------------------------------------------------------- */
    const app = $('#app');
    const header = $('#header');
    const ALIASES = { archive: 'collection', atelier: 'story', appointment: 'contact' };
    let darkHeader = false;

    function resolve() {
        let [route = '', param = ''] = location.hash.replace(/^#\/?/, '').split('/');
        route = ALIASES[route] || route;
        const base = 'Thamarai Designers';
        switch (route) {
            case 'collection':
                return { route, html: collectionView(), title: `Collection — ${base}`, bind: bindCollection };
            case 'piece': {
                const p = byId(param);
                if (p) return { route: 'collection', html: pieceView(p), title: `${p.name} — ${base}`, bind: bindPiece };
                return { route: 'collection', html: collectionView(), title: `Collection — ${base}`, bind: bindCollection };
            }
            case 'story':
                return { route, html: storyView(), title: `Our Story — ${base}`, dark: true };
            case 'contact':
                return { route, html: contactView(byId(param)), title: `Contact — ${base}`, bind: bindContact };
            default:
                return { route: 'home', html: homeView(), title: `${base} — One of One` };
        }
    }

    function render() {
        const view = resolve();
        app.innerHTML = view.html;
        document.title = view.title;
        darkHeader = !!view.dark;
        $$('[data-nav]').forEach((a) => a.classList.toggle('is-active', a.dataset.nav === view.route));
        window.scrollTo(0, 0);
        if (view.bind) view.bind();
        observeReveals(app);
        onScroll();
    }

    // Between pages: a parchment veil rises, the lotus blooms, and the new page is revealed beneath it.
    const bloom = $('#bloom');
    let navToken = 0;
    window.addEventListener('hashchange', () => {
        setMenu(false);
        if (reduceMotion) { render(); return; }
        const token = ++navToken;
        bloom.classList.remove('is-play');
        void bloom.offsetWidth;                 // restart the bloom animation
        bloom.classList.add('is-on', 'is-play');
        setTimeout(() => { if (token === navToken) render(); }, 550);
        setTimeout(() => { if (token === navToken) bloom.classList.remove('is-on'); }, 1150);
    });

    // Clicking a link to the current page: close the menu and return to the top.
    document.addEventListener('click', (e) => {
        const a = e.target.closest('a[href^="#/"]');
        if (!a || a.getAttribute('href') !== (location.hash || '#/')) return;
        e.preventDefault();
        setMenu(false);
        window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });

    /* ----------------------------------------------------------------------
       Reveal on scroll & header state
       ---------------------------------------------------------------------- */
    const io = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
        });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.1 }) : null;

    function observeReveals(root) {
        $$('[data-reveal]:not(.is-in)', root).forEach((el) => {
            if (io && !reduceMotion) io.observe(el);
            else el.classList.add('is-in');
        });
    }

    function onScroll() {
        const scrolled = window.scrollY > 40;
        header.classList.toggle('is-scrolled', scrolled);
        header.classList.toggle('is-dark', darkHeader && !scrolled);
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ----------------------------------------------------------------------
       Mobile menu
       ---------------------------------------------------------------------- */
    const menuBtn = $('#menu-toggle');
    const menu = $('#menu');
    function setMenu(open) {
        document.body.classList.toggle('menu-open', open);
        menuBtn.setAttribute('aria-expanded', String(open));
        menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        menu.setAttribute('aria-hidden', String(!open));
    }
    menuBtn.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

    /* ----------------------------------------------------------------------
       Entrance — plays its intro, then the doors sweep open on their own.
       A click, tap or key press opens them straight away.
       ---------------------------------------------------------------------- */
    const gate = $('#gate');
    let opened = false;

    function openGate(instant) {
        if (opened) return;
        opened = true;
        try { window.sessionStorage.setItem('td-entered', '1'); } catch (e) { /* private mode */ }
        if (instant) {
            gate.remove();
            document.body.classList.remove('is-gated');
            document.body.classList.add('is-entered');
            return;
        }
        gate.classList.add('is-opening');
        setTimeout(() => {
            document.body.classList.remove('is-gated');
            document.body.classList.add('is-entered');
        }, 400);
        setTimeout(() => gate.remove(), 1800);
        document.removeEventListener('keydown', onGateKey);
    }
    const onGateKey = () => openGate(false);

    render();
    if (document.documentElement.classList.contains('was-entered')) {
        openGate(true);
    } else {
        setTimeout(() => openGate(false), reduceMotion ? 600 : 3800);
        gate.addEventListener('click', () => openGate(false));
        document.addEventListener('keydown', onGateKey);
    }
})();
