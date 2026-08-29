# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences arrive in roughly equal numbers, and the site has to serve both at once:

- **Returning locals**, on a phone, checking one thing fast — is it open, what's on the menu, what's the number. They already know the shop; they want an answer in seconds, not a pitch.
- **First-timers deciding where to go tonight**, usually arriving from Google or Instagram while comparing dessert spots. They need to be convinced, and reviews and photography carry that weight.

Neither audience is secondary. A change that speeds up the lookup at the cost of the persuasion, or vice versa, is a regression.

## Product Purpose

Frosty Haven is a dessert shop at 202A Featherston Street, Palmerston North Central, Palmerston North 4410, New Zealand. The site exists so that someone nearby can find out what Frosty Haven serves, when it's open, and how to get there — and so that someone who has never been decides to go.

Success is a visit to the shop. The site is not a storefront; it is what happens before someone walks in.

## Positioning

Small-batch and made in-house. Every batch is churned on site in small runs rather than bought in or scaled, which is what the menu's range of loaded and over-the-top creations depends on — loaded cups, frosty nachos, loaded cookies and brownies, açaí bowls, custom Flurrs. Reviewers consistently name two things a competitor could not copy by matching the menu: how the desserts look, and the owner and staff.

Real pricing sits below comparable dessert spots in the area; multiple unprompted reviews say so.

## Operating Context

- **In-shop first.** Almost all business is walk-in and pickup at the single Palmerston North location. There is no delivery and no second site.
- **Phone-dominant browsing.** The lookup audience is on a phone, often standing up, often deciding within a minute.
- **Discovery runs through Google and Instagram.** Google reviews and the Instagram/TikTok accounts (`@frostyhaven.nz` on both) are where first-timers meet the shop; the site is the second step, not the first.
- **Irregular hours are a real fact of the business.** Closed Mondays, and Friday is split into two blocks (11:00 am–12:30 pm, then 1:30 pm–9:30 pm). Both are load-bearing and must never be smoothed into a tidy uniform week.
- Busiest around 2pm; a typical visit runs about 15 minutes.

## Capabilities and Constraints

- **Two pages:** a home page and a menu page. Static HTML, CSS and vanilla JS, no build step, deployed on Vercel with `cleanUrls`.
- **Menu:** 9 categories, 18 products — loaded cups, cakes, ice cream, bowls, shakes, loaded treats, specials, protein shakes, drinks. Products carry variant buttons (sizes, or flavours like Pistachio / Biscoff / Nutella / Bueno / Chocolate).
- **Ordering is a stand-in.** The cart assembles an order and hands it off as a pre-filled WhatsApp message to +64 21 152 3246. This is a placeholder for real online ordering with payment, which is the intended destination. Future work should not treat WhatsApp handoff as the permanent design, and should not build on it in ways that would be expensive to unwind.
- **Known gap in that stand-in:** only Thick Milkshakes carries a price (`data-price="9"`). Every other product's variant buttons have no price, so the cart totals them at $0.00 and the WhatsApp message understates the order. Pricing data does not exist in the codebase for the other 17 products.
- Phone (`tel:0211523246`) is a live, working order path alongside WhatsApp.
- Opening hours are hard-coded in markup with a JS open/closed indicator over them; there is no hours API or CMS.
- No backend, no accounts, no payment processing, no analytics.

## Brand Commitments

- **Name:** Frosty Haven. Logo at `images/logo.png`.
- **Halal:** Frosty Haven is halal. This is true and remains usable as a fact. It previously appeared as a footer tagline and was deliberately removed for layout reasons — do not reinstate it in the footer, but it is available for future work to place properly rather than something to avoid claiming.
- **Voice:** warm, plain and unpretentious. Short declaratives ("Delicious desserts, made with care."), light emoji use in headings, no marketing throat-clearing.
- **Handles:** `@frostyhaven.nz` on Instagram and TikTok.

## Evidence on Hand

- **49 real Google and Facebook reviews** in `js/reviews.js`, supplied by the shop owner with real names and dates. Text is verbatim; truncated source reviews keep their trailing ellipsis. These are not to be edited, paraphrased, or extended.
- **Ratings:** 4.8/5 from 62 Google reviews; 5.0/5 from 2 Facebook votes.
- **~31 real product and shop photographs** in `images/` — the actual desserts and the actual interior, not stock.
- **Real address, phone number, hours and map embed.**
- **Absences future work must not fill by invention:** no press coverage, no case studies, no awards, no customer counts, no founding date, no staff names or bios, no supplier or sourcing detail beyond "real fruit, real cream, real cocoa", no nutritional or allergen data, and no prices for 17 of the 18 products.

## Product Principles

1. **Serve the lookup and the pitch in the same breath.** Hours, address and phone stay reachable within seconds on a phone; that speed is never traded for atmosphere, and atmosphere is never cut to save a scroll.
2. **The desserts and the reviews are the argument.** Real photography and real customer words persuade here. Copy supports them; it does not substitute for them.
3. **Don't overstate.** The evidence on hand is genuinely strong. Inventing proof — testimonials, accolades, numbers, sourcing claims — is the one thing that would cheapen it.
4. **Awkward truths stay visible.** Closed Mondays, the split Friday, and the fact that ordering ends in a message rather than a checkout are real. Design around them honestly rather than hiding them.
5. **Nothing that assumes a backend.** Every addition has to survive as static files on Vercel with no server, no database and no accounts.

## Accessibility & Inclusion

No formal standard has been set for this project. The working floor observed so far is WCAG AA contrast (4.5:1 for body text, 3:1 for large text), which recent work has measured rather than assumed — worth keeping, given that a large share of visits happen on a phone, outdoors, in variable light.
