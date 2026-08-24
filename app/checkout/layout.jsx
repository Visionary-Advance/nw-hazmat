// Checkout is a client component and cannot export metadata itself, so the
// noindex lives here (punch list #11). robots.txt already disallows /checkout,
// but a disallowed URL can still be indexed without being crawled — the meta
// tag is what actually keeps it out of the index.
export const metadata = {
  title: "Checkout | NorthWest HazMat",
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
    },
  },
};

export default function CheckoutLayout({ children }) {
  return children;
}
