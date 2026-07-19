import Nav from "@/components/Nav";
import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import { getMenuItems, getSiteContent, getThemeSettings } from "@/lib/queries";

// Re-render at most once a minute so content edits in the database show up
// without a redeploy (admin saves also revalidate immediately).
export const revalidate = 60;

export default async function Home() {
  const [site, menuLinks, theme] = await Promise.all([
    getSiteContent(),
    getMenuItems(),
    getThemeSettings(),
  ]);

  // Structured data so Google shows rich "Person" results for your name.
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    email: `mailto:${site.email}`,
    jobTitle: "Project Manager",
    sameAs: [site.github, site.linkedin],
    knowsAbout: [
      "Project Management",
      "Agile",
      "Scrum",
      "FinTech",
      "Banking Software Delivery",
      "Stakeholder Management",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      {theme.themeToggle && (
        // Re-apply the visitor's saved theme before first paint (no flash).
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('theme')==='light')document.documentElement.dataset.theme='light'}catch(e){}",
          }}
        />
      )}
      <Preloader />
      <Nav
        links={menuLinks}
        socials={{ github: site.github, linkedin: site.linkedin, email: site.email }}
        showThemeToggle={theme.themeToggle}
      />
      <main>
        <Hero />
        <About />
        {/* Light "work" zone — dark hero/about curve into it, contact curves out. */}
        <div className="bg-paper text-paper-fg">
          {/* overflow-hidden: the 120%-wide curve must not widen the page layout */}
          <div aria-hidden className="overflow-hidden">
            <div className="-ml-[10%] h-16 w-[120%] rounded-b-[100%] bg-background sm:h-24" />
          </div>
          <Experience />
          <Skills />
          <Projects />
          <Gallery />
          <Certifications />
        </div>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
