// Builds the static site into ./site from the templates below and src/data.mjs.
// Run: node build.mjs
import { mkdirSync, writeFileSync } from 'node:fs';
import { categories, services, faq } from './src/data.mjs';

// While no backend is connected, the site shows a demo notice and the request
// and tracking pages simulate responses. Set to false once they're wired up.
const DEMO = true;

const AVAILABILITY = 'Availability depends on your location, the service, and applicable requirements.';

/* ---------- icons ---------- */
const icon = {
  link: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 14a4 4 0 0 0 5.7 0l3.3-3.3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0L5 13.3A4 4 0 0 0 10.7 19l1-1" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  invoice: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h7l4 4v14H7z M14 3v4h4 M10 12h5 M10 16h5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"/></svg>',
  cart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h2l2 10h10l2-7H7.2 M10 19.5h.01 M17 19.5h.01" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  shield: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6z M9 12l2 2 4-4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"/></svg>',
  receipt: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h14v16l-3-2-2 2-2-2-2 2-2-2-3 2z M9 9h6 M9 13h4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"/></svg>',
  globe: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3 12h18 M12 3c2.5 2.7 3.6 5.7 3.6 9s-1.1 6.3-3.6 9c-2.5-2.7-3.6-5.7-3.6-9S9.5 5.7 12 3z" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
  info: '<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M10 9v5M10 6.2v.1" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  arrow: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M11 5.5 15.5 10 11 14.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
};
const brandMark = '<svg class="brand-mark" viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="9" fill="#2563EB"/><path d="M11 23V9h6.2a4.6 4.6 0 0 1 0 9.2H11" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

/* ---------- shared pieces ---------- */
const nav = [
  ['services.html', 'Services', 'services'],
  ['how-it-works.html', 'How it works', 'how'],
  ['faq.html', 'FAQ', 'faq'],
  ['track.html', 'Track a request', 'track'],
];

function layout({ title, description, active = '', base = '', body, pageClass = '' }) {
  const links = nav.map(([href, label, key]) =>
    `<a href="${base}${href}"${key === active ? ' aria-current="page"' : ''}>${label}</a>`).join('');
  const footerServices = services.map(s => `<a href="${base}services/${s.slug}.html">${s.name}</a>`).join('');
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${base}assets/styles.css">
</head>
<body class="${pageClass}">
  <a class="skip-link" href="#main">Skip to content</a>
  ${DEMO ? `<div class="demo-bar">Demo site: requests and tracking aren’t connected yet, so nothing you enter is sent.</div>` : ''}
  <header class="site-header">
    <div class="container header-inner">
      <a class="brand" href="${base}index.html" aria-label="Paychi home">${brandMark}<span>Paychi</span></a>
      <nav class="nav" id="site-nav" aria-label="Main">${links}
        <a class="btn btn-primary btn-sm nav-cta-mobile" href="${base}request.html">Submit a request</a>
      </nav>
      <a class="btn btn-primary btn-sm nav-cta" href="${base}request.html">Submit a request</a>
      <button class="menu-btn" type="button" aria-controls="site-nav" aria-expanded="false" aria-label="Menu">${icon.menu}</button>
    </div>
  </header>

  <main id="main">
${body}
  </main>

  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <a class="brand" href="${base}index.html" aria-label="Paychi home">${brandMark}<span>Paychi</span></a>
        <p>We review payment links, invoices, and purchase links and pay them on your behalf.</p>
        <a class="btn btn-primary btn-sm" href="${base}request.html">Submit a request</a>
      </div>
      <nav class="footer-col" aria-label="Services">
        <h2>Services</h2>
        ${footerServices}
      </nav>
      <nav class="footer-col" aria-label="Paychi">
        <h2>Paychi</h2>
        <a href="${base}how-it-works.html">How it works</a>
        <a href="${base}faq.html">FAQ</a>
        <a href="${base}track.html">Track a request</a>
        <a href="${base}request.html">Submit a request</a>
      </nav>
    </div>
    <div class="container footer-legal">
      <p>${AVAILABILITY} Service names are trademarks of their respective owners. Paychi is not affiliated with or endorsed by them.</p>
      <p>© <span data-year></span> Paychi</p>
    </div>
  </footer>
  <script>window.PAYCHI = { demo: ${DEMO}, services: ${JSON.stringify(services.map(s => ({ slug: s.slug, name: s.name })))} };</script>
  <script src="${base}assets/app.js"></script>
</body>
</html>
`;
}

const mono = (s, size = '') => `<span class="mono ${size}" aria-hidden="true">${s.mono}</span>`;

function serviceCard(s, base = '') {
  const cat = categories.find(c => c.id === s.category);
  return `<a class="card service-card" href="${base}services/${s.slug}.html" data-category="${s.category}">
          <div class="service-card-top">${mono(s, 'mono-lg')}<span class="tag">${cat.name}</span></div>
          <h3>${s.name}</h3>
          <p>${s.tagline}</p>
          <span class="card-link">View details ${icon.arrow}</span>
        </a>`;
}

const steps = [
  ['Request', 'Send us a payment link, an invoice, or a link to the item you want, with any details we need.'],
  ['Review', 'Our team checks the request and whether we’re able to complete it for your location and the service.'],
  ['Quote', 'We send you a quote for that specific request. Nothing is charged, and you can decline.'],
  ['Payment', 'If you accept, you pay the quoted amount and we complete the payment with the service on your behalf.'],
];
const stepsList = () => `<ol class="steps">
          ${steps.map(([t, d], i) => `<li class="card step"><span class="step-num">${i + 1}</span><h3>${t}</h3><p>${d}</p></li>`).join('\n          ')}
        </ol>`;

const ctaBand = (base = '') => `
    <section class="section">
      <div class="container">
        <div class="cta-band">
          <div>
            <h2>Have a link you need paid?</h2>
            <p>Send it to us for review. Submitting a request doesn’t commit you to paying.</p>
          </div>
          <div class="cta-actions">
            <a class="btn btn-primary" href="${base}request.html">Submit a request</a>
            <a class="btn btn-secondary" href="${base}how-it-works.html">How it works</a>
          </div>
        </div>
      </div>
    </section>`;

const faqItem = ([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`;

/* ---------- pages ---------- */
const pages = {};

pages['index.html'] = layout({
  title: 'Paychi — We review and pay international links for you',
  description: `Send Paychi a payment link, invoice, or purchase link. We review it, send you a quote, and pay on your behalf once you accept. ${AVAILABILITY}`,
  body: `
    <section class="hero">
      <div class="container hero-grid">
        <div class="hero-copy">
          <p class="eyebrow">Assisted international payments</p>
          <h1>Send us the link. We review it, quote it, and pay it for you.</h1>
          <p class="lead">If paying international services is difficult where you live, submit a payment link, invoice, or purchase link. A person on our team checks it, sends you a quote, and completes the payment once you accept.</p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="request.html">Submit a request</a>
            <a class="btn btn-secondary" href="how-it-works.html">See how it works</a>
          </div>
          <p class="note">${icon.info}${AVAILABILITY}</p>
        </div>
        <div class="hero-art" aria-hidden="true">
          <div class="request-card">
            <div class="rc-head"><span class="rc-title">Your request</span><span class="badge badge-blue">Quote ready</span></div>
            <div class="rc-field">${icon.link}<span>https://store.example.com/checkout/…</span></div>
            <ol class="rc-steps">
              <li class="done"><span class="dot"></span>Request received</li>
              <li class="done"><span class="dot"></span>Reviewed by our team</li>
              <li class="current"><span class="dot"></span>Quote sent to you</li>
              <li><span class="dot"></span>Payment completed</li>
            </ol>
            <div class="rc-quote">
              <div><span class="rc-label">Quote</span><span class="rc-value">Shown before you pay</span></div>
              <span class="btn btn-primary btn-sm rc-btn">Review quote</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <p class="eyebrow">How it works</p>
          <h2>Request, review, quote, payment</h2>
          <p class="section-lead">Every request is checked by a person before anything is paid. You decide whether to go ahead after you see the quote.</p>
        </div>
        ${stepsList()}
        <p class="center-link"><a class="text-link" href="how-it-works.html">Read the full process ${icon.arrow}</a></p>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        <div class="section-head">
          <p class="eyebrow">Services</p>
          <h2>Common requests</h2>
          <p class="section-lead">Examples of what people ask us to pay for. Whether a specific request is possible is confirmed during review.</p>
        </div>
        <div class="service-grid">
          ${services.slice(0, 6).map(s => serviceCard(s)).join('\n          ')}
        </div>
        <p class="center-link"><a class="btn btn-secondary" href="services.html">See all services</a></p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <p class="eyebrow">What to send</p>
          <h2>Three kinds of requests</h2>
        </div>
        <div class="grid-3">
          <article class="card feature"><span class="icon-tile">${icon.link}</span><h3>Payment link</h3><p>A checkout or payment page generated by the service you want to pay.</p></article>
          <article class="card feature"><span class="icon-tile">${icon.invoice}</span><h3>Invoice</h3><p>An invoice issued to you that needs to be paid internationally.</p></article>
          <article class="card feature"><span class="icon-tile">${icon.cart}</span><h3>Purchase link</h3><p>A link to a product, plan, gift card, or in-game item you want bought for you.</p></article>
        </div>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container narrow">
        <div class="section-head">
          <p class="eyebrow">FAQ</p>
          <h2>Common questions</h2>
        </div>
        <div class="faq">
          ${[faq[2].items[0], faq[2].items[1], faq[0].items[2]].map(faqItem).join('\n          ')}
        </div>
        <p class="center-link"><a class="text-link" href="faq.html">All questions ${icon.arrow}</a></p>
      </div>
    </section>
${ctaBand()}`,
});

pages['services.html'] = layout({
  title: 'Services — Paychi',
  description: 'Subscriptions, gift cards, and in-game purchases people ask Paychi to pay for.',
  active: 'services',
  body: `
    <section class="page-hero">
      <div class="container">
        <p class="eyebrow">Services</p>
        <h1>What people ask us to pay for</h1>
        <p class="lead">These are common examples. Whether we can complete a specific request depends on your location, the service, and applicable requirements, and is confirmed during review.</p>
      </div>
    </section>
    <section class="section section-tight">
      <div class="container">
        <div class="filters" role="group" aria-label="Filter services">
          <button type="button" class="filter is-active" data-filter="all" aria-pressed="true">All</button>
          ${categories.map(c => `<button type="button" class="filter" data-filter="${c.id}" aria-pressed="false">${c.name}</button>`).join('\n          ')}
        </div>
        <div class="service-grid" id="service-grid">
          ${services.map(s => serviceCard(s)).join('\n          ')}
        </div>
        <div class="card not-listed">
          <span class="icon-tile">${icon.link}</span>
          <div>
            <h3>Don’t see what you need?</h3>
            <p>Send us the link anyway. We’ll review it and tell you whether it’s something we can do.</p>
          </div>
          <a class="btn btn-primary" href="request.html">Submit a request</a>
        </div>
        <p class="fine">Service names are trademarks of their respective owners. Paychi is not affiliated with or endorsed by these companies.</p>
      </div>
    </section>`,
});

for (const s of services) {
  const cat = categories.find(c => c.id === s.category);
  const related = services.filter(o => o.category === s.category && o.slug !== s.slug).slice(0, 3);
  const others = related.length ? related : services.filter(o => o.slug !== s.slug).slice(0, 3);
  pages[`services/${s.slug}.html`] = layout({
    title: `${s.name} — Paychi`,
    description: `Ask Paychi to review and pay for ${s.name}. ${AVAILABILITY}`,
    active: 'services',
    base: '../',
    body: `
    <section class="page-hero">
      <div class="container">
        <nav class="breadcrumb" aria-label="Breadcrumb"><a href="../services.html">Services</a><span aria-hidden="true">/</span><span>${s.name}</span></nav>
        <div class="detail-head">
          ${mono(s, 'mono-xl')}
          <div>
            <span class="tag">${cat.name}</span>
            <h1>${s.name}</h1>
            <p class="lead">${s.tagline}</p>
          </div>
        </div>
      </div>
    </section>
    <section class="section section-tight">
      <div class="container detail-grid">
        <div class="detail-main">
          <p class="detail-about">${s.about}</p>

          <div class="card detail-block">
            <h2>What to send us</h2>
            <ul class="check-list">
              ${s.send.map(x => `<li>${icon.check}<span>${x}</span></li>`).join('\n              ')}
            </ul>
          </div>

          <div class="card detail-block">
            <h2>What you get</h2>
            <p>${s.receive}</p>
          </div>

          <div class="detail-block plain">
            <h2>How this request works</h2>
            <ol class="mini-steps">
              ${steps.map(([t, d], i) => `<li><span class="step-num sm">${i + 1}</span><div><h3>${t}</h3><p>${d}</p></div></li>`).join('\n              ')}
            </ol>
          </div>
        </div>

        <aside class="detail-side">
          <div class="card side-card">
            <h2>Request ${s.name}</h2>
            <p>We’ll review it and reply with a quote. You only pay if you accept.</p>
            <a class="btn btn-primary btn-block" href="../request.html#${s.slug}">Start a request</a>
            <p class="note">${icon.info}${AVAILABILITY}</p>
          </div>
        </aside>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        <div class="section-head left"><h2>${related.length ? `More ${cat.name.toLowerCase()}` : 'Other services'}</h2></div>
        <div class="service-grid">
          ${others.map(o => serviceCard(o, '../')).join('\n          ')}
        </div>
      </div>
    </section>`,
  });
}

pages['how-it-works.html'] = layout({
  title: 'How it works — Paychi',
  description: 'How a Paychi request works: request, review, quote, payment.',
  active: 'how',
  body: `
    <section class="page-hero">
      <div class="container">
        <p class="eyebrow">How it works</p>
        <h1>From link to completed payment</h1>
        <p class="lead">Every request goes through the same four steps. A person reviews it, you see a quote, and nothing is paid until you accept.</p>
      </div>
    </section>
    <section class="section section-tight">
      <div class="container narrow">
        <ol class="process">
          ${[
            ['Request', 'You send us what you want paid.', ['A payment link, invoice, or purchase link', 'Details like the plan, amount, region, or account', 'How we can contact you'], ['Receives the request and gives it a reference number']],
            ['Review', 'We check the request before anything else happens.', ['Answer any questions we send you'], ['Checks the link, item, and price shown by the service', 'Checks whether we can complete it for your location and the service', 'Asks you if anything is unclear']],
            ['Quote', 'You see what this request will cost before paying.', ['Read the quote', 'Accept it, or decline with no charge'], ['Sends a quote specific to your request']],
            ['Payment', 'Once you pay, we complete the purchase.', ['Pay the quoted amount using an option we offer you'], ['Confirms your payment', 'Pays the service on your behalf', 'Sends you the confirmation, code, or instructions']],
          ].map(([t, lede, you, us], i) => `<li class="process-step">
            <span class="step-num">${i + 1}</span>
            <div class="process-body">
              <h2>${t}</h2>
              <p class="process-lede">${lede}</p>
              <div class="process-sides">
                <div><h3>You</h3><ul>${you.map(x => `<li>${x}</li>`).join('')}</ul></div>
                <div class="us"><h3>Paychi</h3><ul>${us.map(x => `<li>${x}</li>`).join('')}</ul></div>
              </div>
            </div>
          </li>`).join('\n          ')}
        </ol>
      </div>
    </section>
    <section class="section section-alt">
      <div class="container">
        <div class="section-head">
          <p class="eyebrow">Good to know</p>
          <h2>What to expect</h2>
        </div>
        <div class="grid-3">
          <article class="card feature"><span class="icon-tile">${icon.shield}</span><h3>A person reviews each request</h3><p>Requests aren’t paid automatically. We check each one first and may ask you questions.</p></article>
          <article class="card feature"><span class="icon-tile">${icon.receipt}</span><h3>You see the quote first</h3><p>Each quote is specific to your request. If you decline it, the request closes and you aren’t charged.</p></article>
          <article class="card feature"><span class="icon-tile">${icon.globe}</span><h3>Not every request is possible</h3><p>${AVAILABILITY} If we can’t help, we’ll tell you instead of sending a quote.</p></article>
        </div>
      </div>
    </section>
${ctaBand()}`,
});

pages['faq.html'] = layout({
  title: 'FAQ — Paychi',
  description: 'Answers to common questions about Paychi requests, quotes, and availability.',
  active: 'faq',
  body: `
    <section class="page-hero">
      <div class="container">
        <p class="eyebrow">FAQ</p>
        <h1>Questions and answers</h1>
        <p class="lead">If your question isn’t here, add it as a note when you submit a request and we’ll reply.</p>
      </div>
    </section>
    <section class="section section-tight">
      <div class="container narrow faq-groups">
        ${faq.map(g => `<div class="faq-group">
          <h2>${g.group}</h2>
          <div class="faq">${g.items.map(faqItem).join('')}</div>
        </div>`).join('\n        ')}
      </div>
    </section>
${ctaBand()}`,
});

const serviceOptions = services.map(s => `<option value="${s.slug}">${s.name}</option>`).join('');

pages['request.html'] = layout({
  title: 'Submit a request — Paychi',
  description: 'Send Paychi a payment link, invoice, or purchase link for review.',
  pageClass: 'page-request',
  body: `
    <section class="page-hero">
      <div class="container narrow">
        <p class="eyebrow">Submit a request</p>
        <h1>Tell us what you need paid</h1>
        <p class="lead">We’ll review it and reply with a quote. Submitting a request doesn’t commit you to paying.</p>
      </div>
    </section>
    <section class="section section-tight">
      <div class="container narrow">
        <div class="card wizard" id="wizard">
          <ol class="wizard-steps" aria-label="Progress">
            <li class="is-current" data-step-label="1"><span>1</span>Details</li>
            <li data-step-label="2"><span>2</span>Contact</li>
            <li data-step-label="3"><span>3</span>Review</li>
          </ol>

          <form id="request-form" novalidate>
            <fieldset class="wizard-panel" data-step="1">
              <legend class="sr-only">Request details</legend>
              <div class="field">
                <label for="r-service">Service</label>
                <select id="r-service" name="service">
                  <option value="">Choose a service</option>
                  ${serviceOptions}
                  <option value="other">Something else</option>
                </select>
              </div>
              <div class="field">
                <label for="r-type">What are you sending?</label>
                <div class="seg" role="radiogroup" id="r-type">
                  <label><input type="radio" name="type" value="Payment link" checked><span>Payment link</span></label>
                  <label><input type="radio" name="type" value="Invoice"><span>Invoice</span></label>
                  <label><input type="radio" name="type" value="Purchase link"><span>Purchase link</span></label>
                </div>
              </div>
              <div class="field">
                <label for="r-link">Link</label>
                <input id="r-link" name="link" type="url" placeholder="https://" required>
                <p class="field-error" data-error-for="r-link">Enter a link starting with https://</p>
              </div>
              <div class="field">
                <label for="r-details">What should we pay for?</label>
                <textarea id="r-details" name="details" rows="4" placeholder="e.g. Spotify Premium Individual, 1 month" required></textarea>
                <p class="hint">Include the plan, amount, region, or anything else we need to know.</p>
                <p class="field-error" data-error-for="r-details">Tell us what you want paid.</p>
              </div>
            </fieldset>

            <fieldset class="wizard-panel" data-step="2" hidden>
              <legend class="sr-only">Contact</legend>
              <div class="field">
                <label for="r-method">How should we contact you?</label>
                <select id="r-method" name="method">
                  <option>Email</option>
                  <option>Telegram</option>
                  <option>WhatsApp</option>
                </select>
              </div>
              <div class="field">
                <label for="r-contact" id="r-contact-label">Email address</label>
                <input id="r-contact" name="contact" type="text" placeholder="you@example.com" required>
                <p class="field-error" data-error-for="r-contact">Enter how we can reach you.</p>
              </div>
              <div class="field">
                <label for="r-name">Your name <span class="optional">(optional)</span></label>
                <input id="r-name" name="name" type="text">
              </div>
            </fieldset>

            <fieldset class="wizard-panel" data-step="3" hidden>
              <legend class="sr-only">Review</legend>
              <dl class="summary" id="summary"></dl>
              <label class="check">
                <input type="checkbox" id="r-agree" required>
                <span>I understand that Paychi will review this request first, that I only pay if I accept the quote, and that availability depends on location, service, and applicable requirements.</span>
              </label>
              <p class="field-error" data-error-for="r-agree">Please confirm to continue.</p>
            </fieldset>

            <div class="wizard-nav">
              <button type="button" class="btn btn-secondary" id="w-back" hidden>Back</button>
              <button type="button" class="btn btn-primary" id="w-next">Continue</button>
              <button type="submit" class="btn btn-primary" id="w-submit" hidden>Send request for review</button>
            </div>
          </form>

          <div class="wizard-done" id="w-done" hidden>
            <span class="icon-tile lg">${icon.check}</span>
            <h2>Request received</h2>
            <p>Your reference is <strong class="ref" id="w-ref"></strong>. Keep it to check on your request.</p>
            <ol class="next-list">
              <li>Our team reviews your request.</li>
              <li>We contact you if we have questions.</li>
              <li>We send you a quote. You decide whether to go ahead.</li>
            </ol>
            <div class="cta-actions">
              <a class="btn btn-primary" id="w-track" href="track.html">Track this request</a>
              <a class="btn btn-secondary" href="request.html" data-reset>Submit another</a>
            </div>
          </div>
        </div>
      </div>
    </section>`,
});

pages['track.html'] = layout({
  title: 'Track a request — Paychi',
  description: 'Check the status of your Paychi request with its reference number.',
  active: 'track',
  pageClass: 'page-track',
  body: `
    <section class="page-hero">
      <div class="container narrow">
        <p class="eyebrow">Track a request</p>
        <h1>Check on your request</h1>
        <p class="lead">Enter the reference you received after submitting.</p>
      </div>
    </section>
    <section class="section section-tight">
      <div class="container narrow">
        <form class="card track-form" id="track-form" novalidate>
          <div class="field">
            <label for="t-ref">Reference</label>
            <div class="inline-field">
              <input id="t-ref" name="ref" type="text" placeholder="PC-1234" autocomplete="off" required>
              <button class="btn btn-primary" type="submit">Check status</button>
            </div>
            <p class="field-error" data-error-for="t-ref">Enter a reference like PC-1234.</p>
          </div>
        </form>

        <div class="card track-result" id="track-result" hidden>
          <div class="row">
            <div><span class="muted">Reference</span><h2 class="ref" id="t-out-ref"></h2></div>
            <span class="badge badge-blue" id="t-badge">In review</span>
          </div>
          <p class="muted" id="t-out-what"></p>
          <ol class="rc-steps track-steps">
            <li class="done"><span class="dot"></span><div><strong>Request received</strong><span>We have your request.</span></div></li>
            <li class="current"><span class="dot"></span><div><strong>In review</strong><span>Our team is checking it. We’ll contact you if we have questions.</span></div></li>
            <li><span class="dot"></span><div><strong>Quote sent</strong><span>You’ll see the amount before paying and can decline.</span></div></li>
            <li><span class="dot"></span><div><strong>Payment completed</strong><span>We pay the service and send you the confirmation.</span></div></li>
          </ol>
          ${DEMO ? '<p class="fine">Demo: this is an example status. Tracking isn’t connected yet.</p>' : ''}
        </div>

        <div class="status-guide">
          <h2>What each status means</h2>
          <dl>
            <div><dt>Received</dt><dd>We have your request and it’s waiting for review.</dd></div>
            <div><dt>In review</dt><dd>Our team is checking the request and whether we can complete it.</dd></div>
            <div><dt>Needs info</dt><dd>We’ve asked you a question. Reply so we can continue.</dd></div>
            <div><dt>Quote sent</dt><dd>Your quote is ready. Accept it to pay, or decline with no charge.</dd></div>
            <div><dt>Completed</dt><dd>We’ve paid the service and sent you the confirmation.</dd></div>
            <div><dt>Closed</dt><dd>The quote was declined, or we weren’t able to complete the request. You weren’t charged.</dd></div>
          </dl>
        </div>
      </div>
    </section>`,
});

/* ---------- write ---------- */
mkdirSync('site/services', { recursive: true });
for (const [path, html] of Object.entries(pages)) writeFileSync(`site/${path}`, html);
console.log(`Built ${Object.keys(pages).length} pages into site/`);
