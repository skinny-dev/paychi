// Services shown on the site. Keep descriptions factual: no prices, fees,
// processing times, or promises that a request will be possible.

export const categories = [
  { id: 'subscriptions', name: 'Subscriptions', blurb: 'Music, AI tools, and developer software.' },
  { id: 'gift-cards', name: 'Gift cards', blurb: 'Digital gift cards for stores and platforms.' },
  { id: 'in-game', name: 'In-game purchases', blurb: 'Currency, items, and passes inside games.' },
];

const SUBSCRIPTION_STEPS = [
  'The link to the plan or checkout page',
  'Which plan you want and for how long',
  'Anything about your account we should know, such as the region it’s set to',
];

export const services = [
  {
    slug: 'spotify', name: 'Spotify Premium', mono: 'S', category: 'subscriptions',
    tagline: 'Music and podcast streaming.',
    about: 'Spotify Premium removes ads and adds offline listening. Send us the plan you want and we’ll review whether we can pay for it for your account.',
    send: [...SUBSCRIPTION_STEPS.slice(0, 2), 'Which plan type: Individual, Duo, Family, or Student'],
    receive: 'Payment for the plan you chose, plus the confirmation we receive. Your quote explains how the payment is applied to your account.',
  },
  {
    slug: 'apple-music', name: 'Apple Music', mono: 'A', category: 'subscriptions',
    tagline: 'Music streaming from Apple.',
    about: 'Apple Music subscriptions are tied to an Apple Account and its region. Tell us the plan you need and we’ll check what’s possible.',
    send: SUBSCRIPTION_STEPS,
    receive: 'Payment for the plan you chose, plus the confirmation we receive. Your quote explains how the payment is applied to your account.',
  },
  {
    slug: 'chatgpt', name: 'ChatGPT', mono: 'C', category: 'subscriptions',
    tagline: 'AI assistant subscription plans.',
    about: 'Paid ChatGPT plans are billed to your OpenAI account. Send the upgrade or checkout link and the plan you want.',
    send: SUBSCRIPTION_STEPS,
    receive: 'Payment for the plan you chose, plus the confirmation we receive. Your quote explains how the payment is applied to your account.',
  },
  {
    slug: 'claude', name: 'Claude & Claude Code', mono: 'C', category: 'subscriptions',
    tagline: 'AI assistant and coding tool plans.',
    about: 'Paid Claude plans include access to Claude Code. Send the upgrade or checkout link and the plan you want.',
    send: SUBSCRIPTION_STEPS,
    receive: 'Payment for the plan you chose, plus the confirmation we receive. Your quote explains how the payment is applied to your account.',
  },
  {
    slug: 'cursor', name: 'Cursor', mono: 'C', category: 'subscriptions',
    tagline: 'AI code editor subscriptions.',
    about: 'Cursor’s paid plans are billed per account. Send the checkout link or tell us the plan and billing period.',
    send: SUBSCRIPTION_STEPS,
    receive: 'Payment for the plan you chose, plus the confirmation we receive. Your quote explains how the payment is applied to your account.',
  },
  {
    slug: 'google', name: 'Google', mono: 'G', category: 'subscriptions',
    tagline: 'Google subscriptions and purchases.',
    about: 'For example Google One storage or purchases on Google Play. Send the link to what you want and the Google account details we need.',
    send: ['The link to the plan, product, or checkout page', 'Which plan or item you want', 'The region your Google account is set to, if you know it'],
    receive: 'Payment for what you chose, plus the confirmation we receive. Your quote explains how the payment is applied to your account.',
  },
  {
    slug: 'steam', name: 'Steam gift cards', mono: 'S', category: 'gift-cards',
    tagline: 'Wallet credit for Steam.',
    about: 'Steam gift cards add funds to a Steam Wallet. Card regions and currencies matter, so tell us where your Steam account is registered.',
    send: ['The amount you want', 'The region and currency of your Steam account', 'A link to the card or game, if you have one'],
    receive: 'The gift card or code we purchase, with instructions for redeeming it.',
  },
  {
    slug: 'gift-cards', name: 'Other gift cards', mono: '+', category: 'gift-cards',
    tagline: 'Gift cards for other stores and platforms.',
    about: 'Need a gift card that isn’t listed? Send us a link to it and we’ll review whether we can buy it.',
    send: ['A link to the gift card', 'The amount and currency', 'The region it needs to work in'],
    receive: 'The gift card or code we purchase, with instructions for redeeming it.',
  },
  {
    slug: 'in-game', name: 'In-game purchases', mono: '+', category: 'in-game',
    tagline: 'Currency, items, and passes inside games.',
    about: 'Send us the store page or checkout for the item, and tell us the game, platform, and account region.',
    send: ['A link to the item or checkout page', 'The game and platform', 'Your account region and any player ID needed'],
    receive: 'The item or currency paid for as described in your quote, plus the confirmation we receive.',
  },
];

export const faq = [
  {
    group: 'General',
    items: [
      ['What does Paychi do?', 'You send us a payment link, invoice, or purchase link. We review it, send you a quote, and if you accept and pay, we complete the payment on your behalf.'],
      ['Who reviews my request?', 'A person on our team. Requests aren’t paid automatically, and we may ask you questions before quoting.'],
      ['Can you pay for any service from any country?', 'No. Availability depends on your location, the service, and applicable requirements. We confirm during review whether we can help, and we decline requests we’re unable to complete.'],
    ],
  },
  {
    group: 'Requests',
    items: [
      ['What should I include in my request?', 'The payment link, invoice, or purchase link, plus anything that helps us complete it correctly: the plan, amount, region, or account details.'],
      ['My service isn’t listed. Can I still ask?', 'Yes. The services on this site are common examples. Send the link and we’ll tell you whether it’s something we can do.'],
      ['How do I check on my request?', 'Use the reference number you get after submitting on the Track a request page. We’ll also contact you if we need anything.'],
    ],
  },
  {
    group: 'Quotes and payment',
    items: [
      ['How much does it cost?', 'Each request gets its own quote, which you see before paying anything. If the quote doesn’t work for you, you can decline.'],
      ['Does submitting a request mean I have to pay?', 'No. You only pay if you accept the quote.'],
      ['How long does it take?', 'It depends on the service and the request. We’ll tell you what to expect when we send your quote.'],
    ],
  },
];
