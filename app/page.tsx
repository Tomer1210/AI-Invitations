import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { TemplateGallery } from "@/components/landing/template-gallery";
import { Features } from "@/components/landing/features";
import { EventCategories } from "@/components/landing/event-categories";
import { FAQ } from "@/components/landing/faq";
import { CtaBanner } from "@/components/landing/cta-banner";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TemplateGallery />
        <Features />
        <EventCategories />
        <FAQ />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
