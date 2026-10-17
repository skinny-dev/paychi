# Paychi web

Static website for Paychi: users submit a payment link, invoice, or purchase link; Paychi reviews it, sends a quote, and pays on their behalf once accepted.

## Pages

| Page | File |
| --- | --- |
| Home | `site/index.html` |
| Services catalog (with category filter) | `site/services.html` |
| One page per service | `site/services/<slug>.html` |
| How it works | `site/how-it-works.html` |
| FAQ | `site/faq.html` |
| Submit a request (3-step form) | `site/request.html` |
| Track a request | `site/track.html` |

## Editing

Pages are generated. Don't edit the HTML in `site/` directly; edit the source and rebuild:

- `src/data.mjs` holds the services, categories, and FAQ
- `build.mjs` holds the shared layout and page templates
- `site/assets/styles.css` and `site/assets/app.js` are edited directly

```
npm run build   # or: node build.mjs
```

Then open `site/index.html` in a browser, or serve the `site/` folder with any static host.

## Demo mode

There's no backend yet. With `DEMO = true` in `build.mjs`, every page shows a demo notice, the request form makes up a reference number instead of sending anything, and the tracking page shows an example status. To go live, connect the submit handler and the tracking lookup in `site/assets/app.js` (marked `TODO`), then set `DEMO = false` and rebuild.

## Content rules

- No invented fees, processing times, testimonials, licenses, partnerships, or customer counts.
- Always state that availability depends on location, service, and applicable requirements.
- Don't promise sanctions bypass or universal availability.
- Service logos are shown as neutral letter tiles. Real logos can replace them on the same neutral surfaces.
