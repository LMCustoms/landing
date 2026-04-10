import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProjectsSection } from "@/components/ProjectsSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactFooter } from "@/components/ContactFooter";
import { SectionFadeIn } from "@/components/SectionFadeIn";
import { getProjects } from "@/data/projects";

export default async function Home() {
  const projects = await getProjects();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SectionFadeIn>
          <ProjectsSection projects={projects} />
        </SectionFadeIn>
        <SectionFadeIn>
          <AboutSection />
        </SectionFadeIn>
        <SectionFadeIn>
          <ContactFooter />
        </SectionFadeIn>
      </main>
    </>
  );
}
