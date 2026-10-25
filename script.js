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

    // phone-sized copies live in images/web/sm/ (640px wide)
    const small = (src) => src.replace('images/web/', 'images/web/sm/');
    // give every full-size photo a phone-sized alternative; the browser picks the right one
    const responsive = (html) => html.replace(/(data-)?src="(images\/web\/)(?!sm\/)([^"?]+)(\?[^"]*)?"/g,
        (m, data = '', dir, file, query = '') => `${m} ${data}srcset="${dir}sm/${file}${query} 640w, ${dir}${file}${query} 1000w"`)
        .replace(/<img (?![^>]*sizes=)([^>]*srcset=)/g, '<img sizes="(max-width: 960px) 50vw, 33vw" $1');

    const FRAME_LOTUS = LOTUS.replace('<svg ', '<svg class="slide__lotus" ');

    const FILTERS = [['all', 'All'], ...OCCASIONS.map((o) => [o.id, o.name])];

    // every photograph of a piece: the studio photo first, then any on-model photos
    const photos = (p) => [p.image, ...(p.more || [])];

    const tile = (p, i) => `
        <a class="tile${p.more ? ' has-alt' : ''}" href="#/piece/${p.id}" data-reveal style="--d:${(i % 3) * 0.08}s">
            <div class="frame"><img src="${p.image}" alt="${esc(p.name)}" loading="lazy" decoding="async">${p.more ? `<img class="tile__alt" src="${p.more[0]}" alt="" loading="lazy" decoding="async">` : ''}</div>
            <div class="tile__cap">
                <h3 class="tile__name">${esc(p.name)}</h3>
                <p class="tile__meta">${esc(p.work)}</p>
            </div>
        </a>`;

    /* ----------------------------------------------------------------------
       Views
       ---------------------------------------------------------------------- */
    function homeView() {
        // the lookbook shows each piece styled on a model; the piece pages keep the true product photographs
        const looks = ['navy-lehenga', 'temple-gold', 'champagne-zardosi', 'royal-silk', 'festive-heirloom']
            .map(byId).filter(Boolean).map((p) => ({ ...p, image: `images/web/look-${p.id}.jpg?v=1` }));
        const wall = ['teal-gold-broadneck', 'pink-openback', 'aqua-sweetheart', 'teal-mirror-vneck', 'maitri-dual-tone', 'teal-maroon-embroidered']
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
        const total = looks.length;
        const slide = (p, i) => `
                <article class="slide${i ? '' : ' is-active'}" aria-roledescription="slide" aria-label="${i + 1} of ${total}">
                    <div class="slide__backdrop"><img ${i ? 'data-' : 'loading="lazy" '}src="${small(p.image)}" alt=""></div>
                    <div class="slide__inner wrap">
                        <div class="slide__text">
                            <p class="slide__num">${num(p)}</p>
                            <h3 class="slide__name">${esc(p.name)}</h3>
                            <p class="slide__meta">${esc(p.fabric)} · ${esc(p.work)}</p>
                            <a class="text-link" href="#/piece/${p.id}">View the piece →</a>
                        </div>
                        <a class="slide__frame" href="#/piece/${p.id}"><img ${i ? 'data-' : 'loading="lazy" '}src="${p.image}" sizes="(max-width: 960px) 90vw, 40vw" alt="${esc(p.name)}">${FRAME_LOTUS}</a>
                    </div>
                </article>`;
        return `
        <section class="campaign" aria-label="Thamarai Designers">
            <picture class="campaign__photo">
                <source media="(max-aspect-ratio: 3/4)" srcset="images/web/sm/campaign-tall.jpg?v=1 720w, images/web/campaign-tall.jpg?v=1 1080w" sizes="100vw">
                <img src="images/web/sm/campaign-wide.jpg?v=1" srcset="images/web/sm/campaign-wide.jpg?v=1 1200w, images/web/campaign-wide.jpg?v=1 2200w" sizes="100vw" alt="Three models wearing Thamarai Designers pieces in a lamplit heritage hall" fetchpriority="high">
            </picture>
            <video class="campaign__video" muted loop playsinline preload="none" aria-hidden="true"></video>
            <div class="campaign__glow" aria-hidden="true"></div>
            <div class="campaign__words wrap">
                <p class="campaign__eyebrow">Bespoke embroidery · Coimbatore</p>
                <h1 class="campaign__name">Thamarai <em>Designers</em></h1>
                <p class="campaign__quote">“Made once. Worn by one.”</p>
                <div class="campaign__actions">
                    <a class="btn btn--gold" href="#/collection">View the collection</a>
                    <a class="btn btn--light" href="#/contact">Book a viewing</a>
                </div>
            </div>
        </section>

        <div class="lookbook-head wrap">
            <p class="eyebrow">The lookbook</p>
            <h2 class="title">Worn, <em>once.</em></h2>
        </div>
        <section class="stage" id="stage" aria-roledescription="carousel" aria-label="The lookbook">
            ${looks.map((p, i) => slide(p, i)).join('')}
            <div class="stage__bar">
                <div class="wrap">
                    <p class="stage__count"><b id="stage-cur">01</b> / ${String(total).padStart(2, '0')}</p>
                    <div class="stage__progress"><i></i></div>
                    <div class="stage__dots">${Array.from({ length: total }, (_, i) => `<button type="button" aria-label="Show look ${i + 1}" class="${i ? '' : 'is-active'}"></button>`).join('')}</div>
                    <div class="stage__nav">
                        <button type="button" data-step="-1" aria-label="Previous look">←</button>
                        <button type="button" data-step="1" aria-label="Next look">→</button>
                    </div>
                </div>
            </div>
        </section>

        <div class="ribbon" aria-hidden="true"><div class="ribbon__track">${ribbon}${ribbon}</div></div>

        <section class="intro wrap">
            <div data-reveal>
                <p class="eyebrow">The House</p>
                <h2 class="intro__text">Every piece is embroidered by hand in our Coimbatore boutique, made for <em>one person</em>, and never repeated.</h2>
            </div>
            <div class="intro__side" data-reveal style="--d:.12s">
                <p>Every piece at Thamarai Designers begins with a hand-tied thread and a maker's care. Our collections celebrate artisanal technique, thoughtful finishes, and premium luxury made with love.</p>
                <a class="text-link" href="#/story">Our story →</a>
            </div>
        </section>

        <section class="occasions wrap">
            <div class="section-head">
                <div><p class="eyebrow" data-reveal>Shop by occasion</p><h2 class="title" data-reveal>For every <em>celebration.</em></h2></div>
                <a class="text-link" href="#/collection" data-reveal>All ${PIECES.length} pieces →</a>
            </div>
            <div class="occasions__grid">
                ${OCCASIONS.map((o, i) => { const c = byId(o.cover); const n = PIECES.filter((p) => p.occasion === o.id).length; return `
                <a class="occasion" href="#/collection/${o.id}" data-reveal style="--d:${i * 0.08}s">
                    <div class="frame"><img src="${c.image}" alt="${esc(o.name)}" loading="lazy" decoding="async"></div>
                    <div class="occasion__cap">
                        <h3>${esc(o.name)}</h3>
                        <span>${n} pieces</span>
                    </div>
                    <p>${esc(o.blurb)}</p>
                </a>`; }).join('')}
            </div>
        </section>

        <section class="craft wrap">
            <div class="section-head">
                <div><p class="eyebrow" data-reveal>The Handwork</p><h2 class="title" data-reveal>Every stitch, <em>by hand.</em></h2></div>
                <p class="lede" data-reveal>Up close, the work speaks for itself. Each technique is placed by skilled hands in our boutique.</p>
            </div>
            <div class="craft__grid">
                ${handwork.map(([id, img, title, text], i) => `
                <a class="craft__item" href="#/piece/${id}" data-reveal style="--d:${i * 0.08}s">
                    <div class="frame"><img src="images/web/${img}.jpg?v=2" alt="${title.replace('&amp;', 'and')} close-up" loading="lazy" decoding="async"></div>
                    <span class="craft__n">${['i', 'ii', 'iii', 'iv'][i]}.</span>
                    <h3>${title}</h3>
                    <p>${text}</p>
                </a>`).join('')}
            </div>
        </section>

        <section class="note">
            <div class="note__inner wrap">
                <div class="note__img" data-reveal><div class="frame"><img src="images/web/hoop.jpg?v=2" alt="Embroidery worked by hand on a hoop" loading="lazy" decoding="async"></div></div>
                <figure class="note__body" data-reveal style="--d:.1s">
                    <p class="eyebrow">A note from the boutique</p>
                    <div class="note__mark">${LOTUS}</div>
                    <blockquote>${esc(ATELIER_NOTE.quote)}</blockquote>
                    <figcaption><span class="note__sign">${esc(ATELIER_NOTE.name)}</span><span>${esc(ATELIER_NOTE.role)}</span></figcaption>
                </figure>
            </div>
        </section>

        <section class="process wrap">
            <div class="section-head">
                <div><p class="eyebrow" data-reveal>How it works</p><h2 class="title" data-reveal>From conversation <em>to heirloom.</em></h2></div>
                <a class="text-link" href="#/contact" data-reveal>Book a viewing →</a>
            </div>
            <ol class="process__steps">
                ${PROCESS.map(([title, text], i) => `
                <li data-reveal style="--d:${i * 0.08}s"><span class="process__n">${String(i + 1).padStart(2, '0')}</span><h3>${title}</h3><p>${text}</p></li>`).join('')}
            </ol>
            <div class="faq">
                <h3 class="faq__title" data-reveal>Questions, answered</h3>
                <div class="faq__list" data-reveal>
                    ${FAQ.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}
                </div>
            </div>
        </section>
${CLIENT_STORIES.length ? `
        <section class="stories wrap">
            <div class="section-head"><div><p class="eyebrow" data-reveal>Client stories</p><h2 class="title" data-reveal>Worn, <em>and remembered.</em></h2></div></div>
            <div class="stories__grid">
                ${CLIENT_STORIES.map((c, i) => { const p = byId(c.piece); return `
                <figure class="story-card" data-reveal style="--d:${i * 0.08}s">
                    ${p ? `<a class="frame" href="#/piece/${p.id}"><img src="${p.image}" alt="${esc(p.name)}" loading="lazy"></a>` : ''}
                    <blockquote>${esc(c.quote)}</blockquote>
                    <figcaption>${esc(c.name)}${c.occasion ? ` · ${esc(c.occasion)}` : ''}</figcaption>
                </figure>`; }).join('')}
            </div>
        </section>` : ''}

        <section class="band">
            <div class="band__bg"><img src="${small('images/web/loom.jpg?v=2')}" alt="" loading="lazy" decoding="async"></div>
            <div class="band__inner wrap">
                <div>
                    <p class="eyebrow" data-reveal>The Boutique</p>
                    <h2 class="title" data-reveal>Made slowly,<br><em>in Coimbatore.</em></h2>
                    <p class="lede" data-reveal>From quiet loom rooms in Coimbatore to curated designs for modern celebration, we honour the slow craft of embroidery and the soulful values of homegrown creativity.</p>
                    <a class="btn btn--light" href="#/story" data-reveal>Our story</a>
                </div>
                <div class="band__img" data-reveal><div class="frame"><img src="images/web/needle.jpg?v=2" alt="An artisan's hands embroidering white thread work" loading="lazy" decoding="async"></div></div>
            </div>
        </section>

        <section class="insta wrap">
            <div class="section-head">
                <div><p class="eyebrow" data-reveal>On Instagram</p><h2 class="title" data-reveal><a class="insta__handle" href="${INSTAGRAM.url}" target="_blank" rel="noreferrer">@${INSTAGRAM.handle}</a></h2></div>
                <a class="text-link" href="${INSTAGRAM.url}" target="_blank" rel="noreferrer" data-reveal>Follow the boutique →</a>
            </div>
            <div class="insta__row">
                ${wall.map((p, i) => `<a href="${INSTAGRAM.url}" target="_blank" rel="noreferrer" data-reveal style="--d:${i * 0.06}s" aria-label="Instagram"><div class="frame"><img src="${p.image}" alt="${esc(p.name)}" loading="lazy" decoding="async"></div><span class="insta__icon" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg></span></a>`).join('')}
            </div>
        </section>

        <section class="invite wrap">
            <div class="invite__card paper" data-reveal>
                <div class="invite__mark">${LOTUS}</div>
                <p class="eyebrow">By appointment</p>
                <h2 class="title">A private <em>viewing.</em></h2>
                <p class="lede">Tell us about your occasion and we will arrange a personal consultation with the boutique.</p>
                <a class="btn" href="#/contact">Book a viewing</a>
            </div>
        </section>`;
    }

    /* The lookbook: crossfading full-screen looks with a timed progress line. */
    let stage = null;
    function bindHome() {
        // the campaign photograph comes alive once it has loaded: a quiet five-second loop
        const video = $('.campaign__video');
        const saveData = navigator.connection && navigator.connection.saveData;
        if (video && !reduceMotion && !saveData) {
            const tall = window.matchMedia('(max-aspect-ratio: 3/4)').matches;
            video.src = `media/hero-${tall ? 'tall' : 'wide'}.mp4?v=1`;
            video.addEventListener('playing', () => video.classList.add('is-playing'), { once: true });
            video.play().catch(() => {});
        }

        const el = $('#stage');
        if (!el) return;
        const slides = $$('.slide', el);
        const dots = $$('.stage__dots button', el);
        const bar = $('.stage__progress i', el);
        const cur = $('#stage-cur', el);
        const DURATION = 5000;
        let index = 0, timer = 0;
        const load = (k) => {
            $$('img[data-src]', slides[(k + slides.length) % slides.length]).forEach((im) => {
                if (im.dataset.srcset) im.srcset = im.dataset.srcset;
                im.src = im.dataset.src;
                im.removeAttribute('data-src');
            });
        };

        const run = () => {
            clearTimeout(timer);
            bar.classList.remove('is-run');
            void bar.offsetWidth;                                   // restart the progress line
            if (!document.body.classList.contains('is-entered') || document.hidden || reduceMotion) return;
            bar.style.setProperty('--dur', `${DURATION}ms`);
            bar.classList.add('is-run');
            timer = setTimeout(() => show(index + 1), DURATION);
        };
        const show = (n) => {
            slides[index].classList.remove('is-active');
            dots[index].classList.remove('is-active');
            index = (n + slides.length) % slides.length;
            load(index); load(index + 1); load(index - 1);
            slides[index].classList.add('is-active');
            dots[index].classList.add('is-active');
            if (!reduceMotion) {
                const frame = $('.slide__frame', slides[index]);
                frame.classList.remove('is-blooming');
                void frame.offsetWidth;                         // replay the lotus window
                frame.classList.add('is-blooming');
            }
            cur.textContent = String(index + 1).padStart(2, '0');
            run();
        };

        $$('[data-step]', el).forEach((b) => b.addEventListener('click', () => show(index + Number(b.dataset.step))));
        dots.forEach((d, i) => d.addEventListener('click', () => show(i)));
        let touchX = null;
        el.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
        el.addEventListener('touchend', (e) => {
            if (touchX === null) return;
            const dx = e.changedTouches[0].clientX - touchX;
            if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
            touchX = null;
        });
        const onKey = (e) => {
            if (window.scrollY > window.innerHeight * 0.6) return;
            if (e.key === 'ArrowRight') show(index + 1);
            if (e.key === 'ArrowLeft') show(index - 1);
        };
        const onVisibility = () => run();
        document.addEventListener('keydown', onKey);
        document.addEventListener('visibilitychange', onVisibility);
        window.addEventListener('td:entered', run);
        run();
        // once the first look is on screen, quietly fetch the next one
        if (document.readyState === 'complete') setTimeout(() => load(1), 600);
        else window.addEventListener('load', () => setTimeout(() => load(1), 600), { once: true });

        stage = {
            stop() {
                clearTimeout(timer);
                document.removeEventListener('keydown', onKey);
                document.removeEventListener('visibilitychange', onVisibility);
                window.removeEventListener('td:entered', run);
            }
        };
    }

    function collectionView() {
        const counts = Object.fromEntries(FILTERS.map(([key]) =>
            [key, key === 'all' ? PIECES.length : PIECES.filter((p) => p.occasion === key).length]));
        return `
        <section class="page-head wrap">
            <p class="eyebrow" data-reveal>The Collection</p>
            <h1 class="display" data-reveal>Each piece, <em>made once.</em></h1>
            <p class="lede" data-reveal>Browse the collection and choose a piece to begin a private conversation with the boutique.</p>
        </section>
        <section class="wrap collection-grid">
            <div class="filters" role="group" aria-label="Filter pieces">
                ${FILTERS.filter(([key]) => counts[key] > 0).map(([key, label]) =>
                    `<button class="chip" type="button" data-filter="${key}">${label} <sup>${counts[key]}</sup></button>`).join('')}
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
                    <div class="frame piece__frame" id="piece-frame">
                        <div class="piece__track">${photos(p).map((src, k) => `<figure class="piece__slide"><img src="${src}" sizes="(max-width: 960px) 100vw, 50vw" alt="${esc(p.name)}${k ? ' — worn' : ''}"${k ? ' loading="lazy"' : ''}></figure>`).join('')}</div>
                    </div>
                    ${p.more ? `<div class="piece__thumbs" role="tablist" aria-label="Photographs">${photos(p).map((src, k) => `<button type="button" role="tab" class="${k ? '' : 'is-active'}" aria-selected="${!k}" aria-label="Photograph ${k + 1}"><img src="${src}" sizes="80px" alt=""></button>`).join('')}</div>` : ''}
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
            <img src="images/web/loom.jpg?v=2" sizes="100vw" alt="Looms in warm afternoon light">
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
            <div class="frame" data-reveal><img src="images/web/needle.jpg?v=2" alt="White thread embroidery worked by hand" loading="lazy"></div>
            <div class="frame" data-reveal style="--d:.12s"><img src="images/web/hoop.jpg?v=2" alt="Crewel embroidery on a hoop" loading="lazy"></div>
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
            <p class="lede" data-reveal>Share a few details and your request opens in WhatsApp, ready to send to the boutique. We reply to every enquiry personally.</p>
        </section>
        <section class="wrap contact">
            <form class="form paper" id="contact-form" data-reveal>
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
                    <p class="form__note">Sent only to the boutique, through WhatsApp.</p>
                    <button class="btn" type="submit">Send request</button>
                </div>
            </form>
            <aside data-reveal style="--d:.1s">
                <dl class="info">
                    <div><dt>Visit</dt><dd>4, Cherama, 332/3, Thirumurugan Nagar Road, Saravanampatti, Coimbatore 641014</dd></div>
                    <div><dt>Phone · Thamarai Selvi</dt><dd><a href="tel:+919047474752">+91 90474 74752</a></dd></div>
                    <div><dt>WhatsApp</dt><dd><a href="https://wa.me/${WHATSAPP}" target="_blank" rel="noreferrer">Message the boutique →</a></dd></div>
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
    function bindCollection(initial) {
        const grid = $('#collection');
        let filter = FILTERS.some(([key]) => key === initial) ? initial : 'all';
        const draw = () => {
            const items = PIECES.filter((p) => filter === 'all' || p.occasion === filter);
            grid.innerHTML = responsive(items.map(tile).join(''));
            $$('[data-filter]').forEach((b) => b.classList.toggle('is-active', b.dataset.filter === filter));
            observeReveals(grid);
        };
        $$('[data-filter]').forEach((b) => b.addEventListener('click', () => { filter = b.dataset.filter; draw(); }));
        draw();
    }

    function bindPiece() {
        const frame = $('#piece-frame');
        if (!frame) return;
        const track = $('.piece__track', frame);
        const thumbs = $$('.piece__thumbs button');
        // thumbnails and swiping move between the photographs
        const current = () => Math.round(track.scrollLeft / track.clientWidth);
        thumbs.forEach((b, k) => b.addEventListener('click', () =>
            track.scrollTo({ left: k * track.clientWidth, behavior: reduceMotion ? 'auto' : 'smooth' })));
        track.addEventListener('scroll', () => {
            const k = current();
            thumbs.forEach((b, j) => { b.classList.toggle('is-active', j === k); b.setAttribute('aria-selected', String(j === k)); });
        }, { passive: true });
        if (!finePointer) return;
        frame.addEventListener('mouseenter', () => frame.classList.add('is-zoom'));
        frame.addEventListener('mouseleave', () => frame.classList.remove('is-zoom'));
        frame.addEventListener('mousemove', (e) => {
            const r = frame.getBoundingClientRect();
            const img = $$('.piece__slide img', frame)[current()];
            if (img) img.style.transformOrigin = `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`;
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
            const url = waLink(lines.join('\n'));
            window.open(url, '_blank', 'noopener');
            openBooked(url);
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
                return { route, html: collectionView(), title: `Collection — ${base}`, bind: () => bindCollection(param) };
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
                return { route: 'home', html: homeView(), title: `${base} — One of One`, bind: bindHome, dark: true };
        }
    }

    function render() {
        if (stage) { stage.stop(); stage = null; }
        const view = resolve();
        app.innerHTML = responsive(view.html);
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

    const scrollLotus = $('#scroll-lotus');
    function onScroll() {
        const y = window.scrollY;
        const scrolled = y > 40;
        header.classList.toggle('is-scrolled', scrolled);
        header.classList.toggle('is-dark', darkHeader && !scrolled);

        // the corner lotus opens as the page is read; it waits until the lookbook has scrolled away
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
        scrollLotus.style.setProperty('--p', progress.toFixed(3));
        // and steps aside while the lookbook's arrows pass beneath it
        const bar = $('.stage__bar', app)?.getBoundingClientRect();
        const overBar = bar && bar.top < window.innerHeight - 10 && bar.bottom > window.innerHeight - 80;
        scrollLotus.classList.toggle('is-visible', y > 240 && !overBar);
    }
    scrollLotus.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

    // a lotus window opens fully, then steps aside so the photo is never clipped
    document.addEventListener('animationend', (e) => {
        if (e.animationName !== 'lotusMask') return;
        if (e.target.classList.contains('is-blooming')) e.target.classList.remove('is-blooming');
        else e.target.classList.add('is-bloomed');
    });

    /* ----------------------------------------------------------------------
       Booking bloom
       ---------------------------------------------------------------------- */
    const booked = $('#booked');
    function openBooked(url) {
        $('#booked-wa').href = url;
        $('.booked__petals', booked).innerHTML = Array.from({ length: 18 }, () =>
            `<i style="--x:${(Math.random() * 100).toFixed(1)}%;--d:${(0.3 + Math.random() * 1.6).toFixed(2)}s;--t:${(5 + Math.random() * 3).toFixed(1)}s;--r:${Math.round(Math.random() * 360)}deg;--s:${(0.6 + Math.random() * 0.7).toFixed(2)}"></i>`).join('');
        booked.classList.remove('is-open');
        void booked.offsetWidth;
        booked.classList.add('is-open');
        booked.setAttribute('aria-hidden', 'false');
        setTimeout(() => $('#booked-close').focus({ preventScroll: true }), 300);
    }
    function closeBooked() {
        booked.classList.remove('is-open');
        booked.setAttribute('aria-hidden', 'true');
    }
    $('#booked-close').addEventListener('click', closeBooked);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && booked.classList.contains('is-open')) closeBooked(); });

    /* ----------------------------------------------------------------------
       Lotus pond — line-drawn lotuses drifting on the footer's dark water;
       the pointer leaves ripples behind it.
       ---------------------------------------------------------------------- */
    function initPond() {
        const canvas = $('#pond');
        if (!canvas || !canvas.getContext) return;
        const ctx = canvas.getContext('2d');
        const footer = canvas.parentElement;
        const shapes = ['M50 14 C60 30 60 52 50 68 C40 52 40 30 50 14 Z', 'M50 68 C38 61 29 47 31 30 C42 36 49 50 50 68',
            'M50 68 C62 61 71 47 69 30 C58 36 51 50 50 68', 'M50 68 C34 69 19 60 12 45 C27 44 41 54 50 68',
            'M50 68 C66 69 81 60 88 45 C73 44 59 54 50 68'].map((d) => new Path2D(d));
        const lotuses = [];
        const ripples = [];
        let w = 0, h = 0, dpr = 1, raf = 0, visible = false, lastRipple = 0;

        const seed = () => {
            lotuses.length = 0;
            const n = Math.max(4, Math.round(w / 230));
            for (let i = 0; i < n; i++) {
                lotuses.push({
                    x: ((i + 0.5) / n) * w + (Math.random() - 0.5) * 80,
                    y: h * (0.18 + Math.random() * 0.7),
                    s: 0.35 + Math.random() * 0.5,
                    phase: Math.random() * Math.PI * 2,
                    drift: 6 + Math.random() * 10
                });
            }
        };
        const resize = () => {
            dpr = Math.min(2, window.devicePixelRatio || 1);
            w = footer.clientWidth; h = footer.clientHeight;
            canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
            seed();
            draw(performance.now());
        };
        const addRipple = (x, y, strength = 1) => ripples.push({ x, y, born: performance.now(), strength });

        const draw = (t) => {
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, w, h);
            for (let i = ripples.length - 1; i >= 0; i--) {
                const r = ripples[i];
                const age = (t - r.born) / 2600;
                if (age >= 1) { ripples.splice(i, 1); continue; }
                for (let k = 0; k < 2; k++) {
                    const a = age - k * 0.12;
                    if (a <= 0) continue;
                    ctx.beginPath();
                    ctx.ellipse(r.x, r.y, 10 + a * 130 * r.strength, (10 + a * 130 * r.strength) * 0.32, 0, 0, Math.PI * 2);
                    ctx.strokeStyle = `rgba(247, 194, 142, ${(1 - a) * 0.3})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
            lotuses.forEach((l) => {
                ctx.save();
                ctx.translate(l.x + Math.sin(t / 5200 + l.phase) * l.drift, l.y + Math.sin(t / 1700 + l.phase) * 4);
                ctx.rotate(Math.sin(t / 3100 + l.phase) * 0.05);
                ctx.scale(l.s, l.s);
                ctx.translate(-50, -68);
                ctx.lineWidth = 1 / l.s;
                ctx.strokeStyle = 'rgba(166, 124, 82, 0.32)';
                shapes.forEach((p) => ctx.stroke(p));
                ctx.beginPath();
                ctx.ellipse(50, 70, 34, 6, 0, 0, Math.PI * 2);   // the lotus's reflection ring on the water
                ctx.strokeStyle = 'rgba(166, 124, 82, 0.14)';
                ctx.stroke();
                ctx.restore();
            });
        };
        const loop = (t) => {
            if (!visible) { raf = 0; return; }
            if (t - lastRipple > 3200 && lotuses.length) {        // the water stirs on its own now and then
                const l = lotuses[Math.floor(Math.random() * lotuses.length)];
                addRipple(l.x, l.y + 4, 0.7);
                lastRipple = t;
            }
            draw(t);
            raf = requestAnimationFrame(loop);
        };

        footer.addEventListener('pointermove', (e) => {
            const now = performance.now();
            if (now - (footer._last || 0) < 110) return;
            footer._last = now;
            const r = footer.getBoundingClientRect();
            addRipple(e.clientX - r.left, e.clientY - r.top);
        });
        footer.addEventListener('pointerdown', (e) => {
            const r = footer.getBoundingClientRect();
            addRipple(e.clientX - r.left, e.clientY - r.top, 1.5);
        });
        window.addEventListener('resize', resize);
        resize();
        if (reduceMotion || !('IntersectionObserver' in window)) return;
        new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            if (visible && !raf) raf = requestAnimationFrame(loop);
        }).observe(footer);
        new ResizeObserver(() => { if (footer.clientHeight !== h || footer.clientWidth !== w) resize(); }).observe(footer);
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
            window.dispatchEvent(new Event('td:entered'));
            return;
        }
        gate.classList.add('is-opening');
        setTimeout(() => {
            document.body.classList.remove('is-gated');
            document.body.classList.add('is-entered');
            window.dispatchEvent(new Event('td:entered'));
        }, 400);
        setTimeout(() => gate.remove(), 1800);
        document.removeEventListener('keydown', onGateKey);
    }
    const onGateKey = () => openGate(false);

    render();
    initPond();
    if (document.documentElement.classList.contains('was-entered')) {
        openGate(true);
    } else {
        setTimeout(() => openGate(false), reduceMotion ? 600 : 3800);
        gate.addEventListener('click', () => openGate(false));
        document.addEventListener('keydown', onGateKey);
    }
})();
