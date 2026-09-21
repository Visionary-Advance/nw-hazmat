# Northwest Hazmat Punch List — Phased Execution Plan

Source: `Northwest-Hazmat-website-punch-list (1).pdf` (Jon Penneman, 19 Aug 2026)
Constraint from client: **no redesign, no CMS change, no re-theme.** Working Next.js site only.

## Ground rules (apply to every phase)

- NAP never changes: **36 West Q Street, Springfield, OR 97477** · Office 541-988-9823 · 24-hr 1-800-597-1323
- One geo pin: **44.0489, -123.0225**. Purge `44.0521, -123.0868` everywhere.
- Never claim: SBA 8(a), WOSB, WBENC, OSRO class numbers, lab accreditation numbers.
- Never invent ETAs or dispatch times.
- Eugene may appear as a *city served*, never as our home city.

---

## Phase 0 — Infrastructure (not code) ✅ HANDLED BY OWNER

Punch items: **#11 (partial)**

Owner: whoever holds DNS + Vercel + Google accounts. Runs in parallel with Phase 1.

| Task | Where |
|---|---|
| Issue TLS cert on apex `northwesthazmat.com`; 301 all http/https/www variants → `https://nwhazmat.com` | Vercel domain settings + registrar DNS |
| 301 `northwesthazmat.visionaryadvance.com` → `https://nwhazmat.com`; remove staging from any sitemap | Vercel |
| Verify GSC property, paste real verification code (or DNS TXT) | Google Search Console |
| Confirm GA4 (`G-PSPS37JFES`) fires on `/shop`, PDPs, `/checkout` success | GA4 |
| Test a real kit order end-to-end on mobile (Stripe checkout, cart, confirmation email) | Live site |

**Done when:** `curl -I https://northwesthazmat.com` returns 301 → `https://nwhazmat.com` with a valid cert. Staging 301s. GSC verified.

**Status:** confirmed handled on the account side (2026-09-21). Nothing left in code
for #11 — `/checkout` already 301s to `/shop` and GA4 fires on the shop funnel.

---

## Phase 1 — Schema, geo, and identity truth pass ✅ COMPLETE

Punch items: **#4, #5, #6, #11 (code half), #12 (partial)**

**Status:** done and build-verified. Old Eugene coords appear 0 times in source and 0 times
in build output; `44.0489` appears in 96 built files. Verification placeholders gone.
`/checkout` renders `noindex, follow`. Footer license line renders in static HTML.
Remaining external blocker: real GSC verification code (Phase 0).

Highest ratio of SEO impact to regression risk. Almost entirely `app/layout.js` + `Components/Footer.jsx`.

1. **One geo pin (#5)** — `app/layout.js`, `app/services/[id]/page.jsx`, `app/training/[id]/page.jsx`.
   Delete `44.0521 / -123.0868` from `ICBM`, `geo.position`, and `EmergencyService` schema. `addressLocality = Springfield` everywhere including ContactPage schema.
2. **Hours markup (#4)** — `app/layout.js`.
   Keep `openingHoursSpecification` Mo–Fr 08:00–17:00 for the office/lab. Add a `ContactPoint` with `contactType: "emergency"`, `telephone: +1-800-597-1323`, `hoursAvailable` 00:00–23:59 all 7 days. `EmergencyService` hours become 24/7 — not office hours. Nothing may mark the business closed Sat/Sun.
3. **Verification meta (#11)** — `app/layout.js:81-84`. Real Google code in; delete the Yahoo/Yandex placeholders.
4. **`/checkout` noindex (#11)** — add `robots: { index: false, follow: true }` to checkout metadata. Also review `/employment-application` (#16) — noindex is optional, confirm with Jon.
5. **Footer trust line (#6)** — `Components/Footer.jsx`, visible text (not just JSON-LD):
   `CCB #141189 · GSA MAS 47QRAA26D002R · Small Business · Female-owned · 36 West Q Street, Springfield, OR 97477`
   Link CCB search (`id=141189`) and GSA eLibrary `47QRAA26D002R`. Mirror two true sentences into visible About body.
6. **About counters (#12 partial)** — `Components/CountUp.jsx` usage in About renders empty "+ Years" / "k Clients". Remove them, or fill with numbers Jon approves. They cause layout shift.

**Done when:** grep of built HTML/JSON-LD finds `44.0489` and `Springfield`, and finds **zero** `44.0521`. Rich-results test shows 24/7 emergency + weekday office hours, no "Closed Saturday". License line readable in the footer without opening schema.

---

## Phase 2 — Titles, H1s, and the Oregon pivot ✅ COMPLETE

Punch items: **#1, #14 (partial), #15**

**Status:** done and build-verified. All six title/H1 pairs match the table below in
built HTML. "based in Eugene" appears 0 times in build output; the Eugene-lab claims
and the "2-minute dispatch" / per-area ETA block are gone. Homepage meta description
contains 24-hour, spill, Oregon, and the 800 number.
**Closed (#15):** Jon confirmed the lab is **AIHA accredited and proficiency tested**,
and asked that the accreditation number stay off the public site. `/services/lab-services`
now names the accreditation, states the number is available on request, and prints no number.

Copy-only. No new routes. Reviewable as a single diff.

1. **Title/H1 table (#1)** — apply exactly as specified:

   | URL | Title | H1 |
   |---|---|---|
   | `/` | 24-Hour Spill Response Oregon \| Hazmat Cleanup Statewide \| Northwest Hazmat | 24-Hour Spill Response and Hazmat Services Across Oregon |
   | `/services` | Hazmat, Spill Response, Waste & Lab Services in Oregon \| Northwest Hazmat | Hazmat and Environmental Services — Oregon Statewide |
   | `/services/hazmat-services` | 24/7 Hazmat & Spill Response Oregon \| Portland to Medford \| Northwest Hazmat | 24/7 Emergency Hazmat and Spill Response in Oregon |
   | `/contact` | Contact Northwest Hazmat \| 24/7 Spill Response Oregon \| 1-800-597-1323 | Get in Touch — 24-Hour Spill Line |
   | `/about` | About Northwest Hazmat \| Springfield, Oregon \| Statewide Spill Response Since 2000 | About Northwest Hazmat |
   | `/services/waste-management-consulting` | Hazardous Waste Disposal & Consulting Oregon \| Northwest Hazmat | keep, add Oregon |

   Service pages are driven by `data/ServicesData.js` — these are field edits in one file, plus `app/page.js`, `app/about/`, `app/contact/`, `app/services/page.jsx`.
2. **Homepage body (#1)** — `app/page.js:63`: replace "based in Eugene, Oregon" with Springfield yard + statewide Oregon response. Meta description must contain *24-hour*, *spill*, *Oregon*, and the 800 number. Keywords meta becomes spill-first, not mold-first.
3. **Lab page city (#15)** — `data/ServicesData.js` → `lab-services`: Eugene → Springfield (Q Street), serving Oregon. Keep the chain-of-custody link. **No "certified lab" claim** without a program name + number from Jon.
4. **Mold de-emphasis (#14 partial)** — soften the fake-precise ETAs ("Springfield 5 min", "downtown Eugene 12 min") on the emergency mold page now; the 301 lands in Phase 4.

**Done when:** view-source on those URLs shows the new titles/H1s, and "Eugene" reads as a city served rather than home base.

---

## Phase 3 — New spill pages + navigation ✅ COMPLETE

Punch items: **#2, #3, #7, #10 (partial)**

**Status:** done and verified against a running production build. Both new URLs
return 200; all four dead slugs return a true 301 (not 308) to the spill page;
header exposes `/services`, `/training`, and the spill URL; footer links the service
area; 5 product URLs link from the spill page (list asked for ≥3); spill page carries
EmergencyService + 24/7 hours + areaServed Oregon; service-area schema lists Oregon
plus 31 cities.
**Closed (#3):** asked whether we really roll that far, Jon answered **"All Oregon,
Washington, California."** Nothing was trimmed. Washington and California now appear as
states served in the page copy, in the page's `areaServed`, and in the `LocalBusiness`,
contact, service, and spill-page schema. No WA/CA city list ships — Jon named states,
not cities, and inventing city names would repeat the unverified-claim problem.

This is the #1 revenue item in the list — the spill URL simply does not exist today.

1. **`/24-hour-spill-response-oregon` (#2)** — new route.
   - H1: *24-Hour Spill Response Anywhere in Oregon*; 800 number first, click-to-call.
   - What we roll on: diesel, hydraulic, chemical, transport/tanker, unknown substance, storm-drain, facility. **No invented ETAs.**
   - Yard: 36 West Q Street, Springfield; we respond statewide.
   - DEQ/OERS reporting note (800-452-0311) as public safety, then our 800 line for cleanup.
   - Schema: `EmergencyService` + `LocalBusiness`, 24/7 hours, `areaServed` Oregon.
   - Links out to ≥3 shop spill-kit products (satisfies half of #10).
2. **301 the four dead slugs (#2)** — `next.config.mjs` `redirects()`: `/spill-response-springfield`, `/emergency-spill-response`, `/diesel-spill`, `/services/spill-response` → the new page.
3. **`/oregon-spill-response-service-area` (#3)** — new route. Region/city list from section A of the punch list, short non-stuffed intro, JSON-LD `areaServed` = State of Oregon + cities. Footer link "Oregon service area".
   - *Question for Jon:* confirm we actually roll to the coast/east Oregon cities before publishing them.
4. **Header/nav (#7)** — `Components/Header.jsx` + `Components/MobileMenu.jsx`: link the `/services` hub (currently points at `/services/hazmat-services`), link the `/training` hub, and add a visible **"24-Hour Spill Response"** button to the new URL. Homepage stops leading with mold.
5. **Sitemap (#16 partial)** — `app/sitemap.js`: add both new URLs, homepage `changefreq` yearly → weekly.

**Done when:** both new URLs return 200, are in the sitemap, are linked from the header/footer, and the four old slugs 301.

---

## Phase 4 — Shop recovery ✅ COMPLETE

Punch items: **#9 (schema done, photo pending), #10 ✅, #12 ✅**

**Status:** done and build-verified, photography included.
Jon's four named files are now 201/205/304/213 KB; **no file in `public/img` is over
1 MB**. `alt="undefined Icon"` appears 0 times. OG image is a real 1200x630 file.
Shop FAQ renders with FAQPage schema. Product schema emits 0 `"image":null` and
carries US `shippingDetails`.

**Closed (#9):** the one missing SKU was `5-gallon-spill-kit-bucket`; Jon supplied a
generic bucket photo (`public/img/bucketspillkit2.webp`). Rather than require a Stripe
upload, `lib/productImageFallbacks.js` maps the slug to the local file and both product
fetchers apply it when Stripe returns no image — so uploading the real photo in Stripe
later silently takes over with no code change. Verified in the build: the PDP renders
the photo and `Product` schema emits
`"image":["https://nwhazmat.com/img/bucketspillkit2.webp"]`. The build logs a
`[shop] No image` warning for any SKU still in this state; there are none.

Priority 2 in the doc, and it was the direct revenue leak. The photo dependency is now closed.

1. **Product images + schema (#9)** — `/shop/5-gallon-spill-kit-bucket` shows "No image available" and `Product` schema `"image": null`. Every SKU needs a real photo (phone photo of the shelf item is fine). Product JSON-LD needs image, price, availability, US shipping. Alt text names the product.
   Order: 5-gallon kit → Plug N' Dike → storm drain filter → pop-up pool → spill bags.
   *Dependency:* closed — Jon supplied the bucket photo, the only SKU that was missing one.
2. **Shop copy (#10)** — keep "Nationwide Shipping" in title/meta. Add a paragraph: ships anywhere in the US; Oregon 24-hour spill customers can pick up at Q Street. Add `/shop` FAQ: shipping time, Springfield pickup, what's in the 5-gallon kit.
3. **Image weight (#12)** — `About_Header.jpg` 2.73 MB, `Trucks.jpg` 2.73 MB, `Areas_bg.png` 2.36 MB, `Need_Train.jpg` 2.27 MB. Convert to WebP / resized `next/image` sources under ~200 KB for heroes. Fix the 8 homepage icons with `alt="undefined Icon"`. Fix the OG image — it declares 1200×630 but points at a 31 KB file (`app/page.js:21`).

**Done when:** those PDPs show photos, schema image is a real URL, rich-results test sees `Product`, ≥3 product URLs link from the spill page, and the four heavy files are no longer 2 MB.

---

## Phase 5 — Cleanup and consolidation ✅ COMPLETE

Punch items: **#8, #13, #14, #16**

**Status:** done and verified against a running production build. `/services/dedication-services`
and `/emergency-mold-removal-eugene-oregon` both 301; the renamed service returns 200;
`sitemap.xml` returns 200. On the renamed page: ORSO appears 0 times, OSRO twice,
ceremonial/memorial 0 times, USCG 0 times. `PT40H` on the 40-hour course, `courseWorkload`
omitted on the other seven. All 8 course links present in served HTML.
**#8 closed:** asked for the USCG OSRO classification, Jon answered **"BOA from USA
Coastguard."** A Basic Ordering Agreement is a contracting vehicle, not an OSRO class,
so the oil-spill copy now names the USCG BOA and still makes no OSRO classification
claim. `ORSO-certified` was also removed from the spill-response training copy, whose
link still pointed at the old `dedication-services` slug.
**#13 partly closed:** Jon's answer was "it is in the name — 8-hour haz, 4-hour
refresher." Only two courses actually state their hours in our own copy: HAZWOPER
40-Hour (title) and General Site Worker (description says 40 hours twice). Those two now
emit `courseWorkload`. **The other six — Occasional Site Worker, Confined Space Entry,
Hazmat Technician, Spill Response Training, First Responder Awareness, First Responder
Operations — carry no hours anywhere on the site**, so they omit it. Decision
2026-09-21: leave all eight as they stand; a course gets a duration only when Jon names
that course's length specifically.
**#16 closed the other way:** Jon said **"No employment application online available at
this time."** The route and its form are deleted, the nav and footer links are gone, the
sitemap entry is removed, the privacy policy no longer references an application form,
and `/employment-application` 301s to `/contact` (the URL is indexed and job seekers
still hit it). The homepage `EmploymentSection`, already commented out, now points at
`/contact` if it is ever re-enabled.

1. **Dedication Services rename (#8)** — `data/ServicesData.js` → `dedication-services`. Real name: *Industrial demolition, site cleanup & oil-spill response*. New slug, 301 from `/services/dedication-services`. Fix the **ORSO → OSRO** misspelling (Oil Spill Removal Organization, spelled out once) including the `/img/Orso_Img.png` heading. Drop ceremonial/memorial copy unless we still sell it. **No USCG class number.**
2. **Training (#13)** — `Components/Header.jsx` Training menu must list the hub + all 8 courses (`data/TrainingData.js` already has all 8). Add to `/training` and each course: *"Scheduled for groups of 5+ at 36 West Q Street, Springfield; call 541-988-9823 for the next open date."* Fix `courseWorkload` `PT8H` → **`PT40H`** on the 40-hour course. Training titles may keep Eugene & Lane County.
3. **Mold canonical (#14)** — 301 `/emergency-mold-removal-eugene-oregon` → `/services/mold-remediation` (or noindex the panic page). Only one mold URL indexable.
4. **Sitemap hygiene (#16)** — `sitemap.xml` must return 200 consistently (one fetch returned 500 — investigate the flake, likely the Stripe fetch in `lib/getProducts.js` failing at request time). Refresh `lastmod`. Confirm new URLs listed. Submit in GSC once Phase 0 verification lands.

---

## Phase 6 — Off-site citations (not code) — JON IS HANDLING

Punch item: **#17**

**Status:** Jon is updating these four listings himself (confirmed 2026-09-21). No code work.

Four listings only — explicitly **no** 200-directory blast:

- **MapQuest** — still says SBA 8(a) and `http://www.nwhazmat.com`
- **LinkedIn** — website still `northwesthazmat.com`; founded 2002 (should be 2000); "1 employee" is false
- **GSA eLibrary** — web address is `http://nwhazmat.com`, upgrade to https if editable
- **Unilocal** — hours listed 8:30–5:30 all 7 days, wrong

All four → `https://nwhazmat.com`, Springfield NAP, Small Business (not 8(a)), hours matching Phase 1.

---

## Sequencing summary

```
Phase 0  Infra/DNS/GSC ──────────┐ (parallel, external owner)
Phase 1  Schema + geo + footer   │  ← start here in code
Phase 2  Titles/H1s/copy         │
Phase 3  Spill pages + nav       │  ← highest growth value
Phase 4  Shop recovery ──────────┤  ← photo dependency closed
Phase 5  Renames, training, mold │
Phase 6  Citations ──────────────┘  (after Phase 0 verifies)
```

The doc's own "this week" order is #11 → #1,#4,#5 → #2,#3,#7 → #6 → #9,#12 → #8,#13,#14. This plan matches it, with #6 (footer licenses) pulled forward into Phase 1 because it touches the same file as the schema work.

## Open questions for Jon

**Answered (applied in code):**

2. ~~Product photos~~ — generic bucket photo supplied; it was the only missing SKU. ✅
3. ~~About counter numbers~~ — "51k clients served is fine, just keep it." Counters stay. ✅
4. ~~Do we roll to coast / central / east Oregon?~~ — "All Oregon, Washington, California."
   Nothing trimmed; WA and CA added. ✅
5. ~~Lab accreditation~~ — AIHA accredited and tested; number stays off the public site. ✅
   (Also: USCG question answered — BOA from the U.S. Coast Guard, not an OSRO class.)
   (Also: no online employment application at this time — route removed, 301 to /contact.)

1. ~~GSC verification code / DNS TXT~~ — handled on the account side. ✅
8. ~~Course hours (#13)~~ — **decision: leave all courses as they are.** Only HAZWOPER
   40-Hour and General Site Worker state their hours in our own copy, so only those two
   emit `courseWorkload`. The other six — Occasional Site Worker, Confined Space Entry,
   Hazmat Technician, Spill Response Training, First Responder Awareness, First Responder
   Operations — carry no hours in their names or copy and stay that way **unless Jon
   states a specific length for a specific course**. Do not infer one from the "8-hour
   haz / 4-hour refresher" note; it does not map onto these course names. ✅

6. ~~Training class dates~~ — **decision 2026-09-21: ship the "call for next open date"
   line.** Already live on `/training` and all 8 course pages: "Scheduled for groups of 5
   or more at 36 West Q Street, Springfield. Call 541-988-9823 for the next open date."
   No fixed dates go on the site. ✅
7. ~~Slug for the renamed Dedication Services page~~ — **keep
   `/services/industrial-demolition-site-cleanup`**, with the 301 from
   `/services/dedication-services` in `next.config.mjs`. Settled; do not rename again. ✅

**Still open:**

9. **Stripe checkout** — Jon is testing in the office. Nothing to do until he reports back.

Everything else in the punch list is closed.
```
