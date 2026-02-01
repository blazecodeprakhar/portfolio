"use client";

import { useEffect, useRef, useState } from "react";
import { Code2, Server, Palette, Database, Sparkles, Wrench, Video, ImageIcon } from "lucide-react";

interface Skill {
  name: string;
  percentage: number;
  icon: any;
}

const skills: Skill[] = [
  { name: "Full-Stack Web Development", percentage: 80, icon: Code2 },
  { name: "Backend & Server Architecture", percentage: 75, icon: Server },
  { name: "Database Engineering", percentage: 70, icon: Database },
  { name: "UI / UX Engineering", percentage: 75, icon: Palette },
  { name: "AI-Assisted Development", percentage: 65, icon: Sparkles },
  { name: "Modern Tooling & Workflow", percentage: 70, icon: Wrench },
  { name: "Video Editing (Premiere Pro)", percentage: 85, icon: Video },
  { name: "Photo Editing (Photoshop)", percentage: 90, icon: ImageIcon },
];

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);
  const [values, setValues] = useState<number[]>(skills.map(() => 0));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animated) {
          setAnimated(true);

          skills.forEach((skill, i) => {
            let current = 0;
            const step = skill.percentage / 50;

            const timer = setInterval(() => {
              current += step;
              if (current >= skill.percentage) {
                current = skill.percentage;
                clearInterval(timer);
              }

              setValues((prev) => {
                const copy = [...prev];
                copy[i] = Math.round(current);
                return copy;
              });
            }, 20);
          });
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [animated]);

  return (
    <section
      id="skills"
      className="pt-20 md:pt-18 pb-14 md:pb-18 bg-gradient-to-b from-background to-muted/30"
    >

      <div className="container mx-auto px-4 md:px-6">
        <div ref={sectionRef}>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Skills
          </h2>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skill, index) => {
              const Icon = skill.icon;

              return (
                <div
                  key={skill.name}
                  className="
                    relative rounded-2xl p-6
                    bg-white/5 backdrop-blur-xl
                    border border-white/10
                    shadow-[0_0_40px_rgba(0,0,0,0.3)]
                    hover:scale-[1.02]
                    transition-all duration-300
                  "
                >
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-purple-500/10">
                      <Icon className="w-6 h-6 text-purple-400" />
                    </div>

                    <h3 className="text-lg font-semibold flex-1">
                      {skill.name}
                    </h3>

                    <span className="text-xl font-bold text-purple-400">
                      {values[index]}%
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="
                        h-full rounded-full
                        bg-gradient-to-r from-purple-500 to-purple-400
                        transition-all duration-700 ease-out
                      "
                      style={{ width: `${values[index]}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
