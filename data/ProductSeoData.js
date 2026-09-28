// Search-facing titles and meta descriptions for shop products, keyed by slug.
//
// Stripe product names are short ("Plug N' Dike"), which is fine on the page
// but leaves the <title> without the words people actually search for
// ("leak sealing putty", "catch basin", "hot tap kit"). These add them.
//
// Precedence in app/shop/[slug]/page.jsx: Stripe metadata `seoTitle` /
// `seoDescription` > this file > generated from name/description. So a new
// product works without an entry here, and copy can be tuned in Stripe
// without a deploy.
//
// Titles stay under ~60 characters before the " | NorthWest HazMat" suffix is
// added; descriptions stay under ~155 so Google does not truncate them.

export const productSeo = {
  "tank-truck-rollover-simulator": {
    title: "Tank Truck Rollover Simulator – Hazmat Training Prop",
    description:
      "Tanker rollover training prop with multiple breach points for fire departments and hazmat teams to practice patching, containment, and product transfer.",
  },
  "tank-truck-accessory-pack": {
    title: "Tank Truck Accessory Pack for Rollover Simulator",
    description:
      "Leak mitigation add-ons for the Tank Truck Rollover Simulator. Train responders on dome leaks, valve failures, and sidewall breaches. Ships nationwide.",
  },
  "basic-hot-tap-rollover-kit": {
    title: "Basic Hot Tap Kit – Tanker Rollover Training",
    description:
      "Hot tap training kit for practicing spark-free drilling and liquid offloading on overturned tankers. Built for hazmat teams and fire departments.",
  },
  "deluxe-hot-tap-rollover-kit": {
    title: "Deluxe Hot Tap Kit – Advanced Tanker Offload Training",
    description:
      "Advanced hot tap kit for complex product removal on overturned tank trucks. Spark-free drilling and liquid transfer training for hazmat responders.",
  },
  "pop-up-pool-catch-basin-100-gallon": {
    title: "100 Gallon Pop-Up Spill Pool – Portable Catch Basin",
    description:
      "Portable 100-gallon pop-up spill containment pool that deploys in seconds to catch leaking drums, tanks, and chemical spills. Ships nationwide via UPS.",
  },
  "storm-drain-filter": {
    title: "Storm Drain Filter – Spill & Runoff Protection",
    description:
      "Rapid-deploy storm drain filter that keeps fuel, chemicals, and contaminated runoff out of waterways. For spill kits, facilities, and responders.",
  },
  "spill-responder-kit-bags": {
    title: "Spill Response Kit Bags – High-Visibility Gear Bags",
    description:
      "Durable, high-visibility grab-and-go bags for spill response gear, absorbents, and leak mitigation tools. Keep your team's kit organized and ready.",
  },
  "plug-n-dike": {
    title: "Plug N' Dike Leak Sealing Putty for Tanks & Drums",
    description:
      "Plug N' Dike emergency leak sealing putty plugs punctures in fuel tanks, drums, and pipes, even on wet or greasy surfaces. Ships nationwide.",
  },
  "5-gallon-spill-kit-bucket": {
    title: "5 Gallon Spill Kit Bucket – Fuel & Chemical Spills",
    description:
      "Grab-and-go 5 gallon spill kit with absorbents for fuel and chemical spills. Sized for trucks, shops, and industrial sites. Ships nationwide via UPS.",
  },
  "lid-tight-dome-clamp": {
    title: "Lid Tight Dome Clamp – Tanker Dome Lid Leak Control",
    description:
      "Heavy-duty dome clamp that seals leaking dome lids on overturned tank trucks. For hazmat teams and fire departments, in real response or training.",
  },
};
