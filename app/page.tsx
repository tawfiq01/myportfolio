import Nav from "@/components/Nav";
import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, SOCIAL } from "@/lib/site";

// Structured data so Google shows rich "Person" results for your name.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  email: `mailto:${SOCIAL.email}`,
  jobTitle: "Project Manager",
  sameAs: [SOCIAL.github, SOCIAL.linkedin],
  knowsAbout: [
    "Project Management",
    "Agile",
    "Scrum",
    "FinTech",
    "Banking Software Delivery",
    "Stakeholder Management",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Preloader />
      <Nav />
      <main>
        <Hero />
        <About />
        {/* Light "work" zone — dark hero/about curve into it, contact curves out. */}
        <div className="bg-paper text-paper-fg">
          <div aria-hidden className="-ml-[10%] h-16 w-[120%] rounded-b-[100%] bg-background sm:h-24" />
          <Experience />
          <Skills />
          <Projects />
          <Certifications />
        </div>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
