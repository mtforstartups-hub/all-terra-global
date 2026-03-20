// app/(main)/layout.tsx
// Adds Header, Footer, ScrollToTop for all public-facing pages.
// The dashboard route lives outside this group and gets none of these.
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ScrollToTop />
      <Header />
      {children}
      <Footer />
    </>
  );
}
