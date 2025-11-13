import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div ref={sectionRef} className="max-w-5xl mx-auto opacity-0">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
            About Me
          </h2>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
            {/* --- Profile Image Section --- */}
            <div className="flex-shrink-0">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl bg-gradient-to-br from-accent via-accent/80 to-accent/60 p-1 animate-float shadow-2xl">
                <img
                  src="/assets/dp.jpeg"
                  alt="Prakhar Yadav"
                  className="w-full h-full rounded-2xl object-cover"
                />
              </div>
            </div>

            {/* --- About Text Section --- */}
            <div className="flex-1 space-y-6 text-center md:text-left">
              <div className="space-y-5 text-lg md:text-xl text-muted-foreground leading-relaxed">
                <p>
                  Hi, I'm{" "}
                  <span className="text-accent font-bold text-xl md:text-2xl">
                    Prakhar Yadav
                  </span>{" "}
                  – a developer who loves turning ideas into digital reality.
                </p>
                <p>
                  My focus is on creating{" "}
                  <span className="text-foreground font-semibold">
                    fast, secure, and aesthetic
                  </span>{" "}
                  web experiences powered by modern technologies. As a{" "}
                  <span className="text-foreground font-semibold">
                    Computer Science Engineering student
                  </span>{" "}
                  with a passion for cybersecurity and ethical hacking, I'm
                  constantly exploring new tech horizons.
                </p>
                <p>
                  Beyond code, my{" "}
                  <span className="text-foreground font-semibold">
                    photography
                  </span>{" "}
                  inspires me to design with emotion and creativity.
                </p>
              </div>

              <div className="pt-4">
                <a
                  href="#contact"
                  className="inline-flex items-center space-x-2 px-6 py-3 glass rounded-lg font-semibold hover:bg-accent/10 transition-all border border-accent/30"
                >
                  <span>Download Resume</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
