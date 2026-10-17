# Paychi web

Static landing page for Paychi: users submit a payment link, invoice, or purchase link; Paychi reviews it, sends a quote, and pays on their behalf once accepted.

- `index.html` — page content
- `styles.css` — styles; colors are limited to the tokens at the top of the file

Open `index.html` in a browser to view. No build step.

## Request form

The form posts to the URL in `data-endpoint` on `#request-form`. It's empty for now, so submitting shows a "not connected yet" message instead of pretending to send.

## Content rules

- No invented fees, processing times, testimonials, licenses, partnerships, or customer counts.
- Always state that availability depends on location, service, and applicable requirements.
- Don't promise sanctions bypass or universal availability.
