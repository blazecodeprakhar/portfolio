import { ThemeProvider } from "next-themes";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import BlazeCodeStudioSection from "@/components/BlazeCodeStudioSection";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "Prakhar Yadav | blazecodeprakhar - Full-Stack Developer & Cybersecurity Specialist";
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute("href", "https://prakharcodes.netlify.app/");
    }
  }, []);

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location]);
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Gallery />
          <Contact />
          <BlazeCodeStudioSection />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
