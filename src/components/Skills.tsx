import { useEffect, useRef, useState } from "react";
import { Code2, Server, Palette, Lightbulb, Video, ImageIcon } from "lucide-react";

interface Skill {
  name: string;
  percentage: number;
  icon: any;
}

const skills: Skill[] = [
  { name: "Web Development", percentage: 60, icon: Code2 },
  { name: "Server Management", percentage: 50, icon: Server },
  { name: "UI/UX Design", percentage: 60, icon: Palette },
  { name: "Problem Solving", percentage: 60, icon: Lightbulb },
  { name: "Video Editing (Premiere Pro)", percentage: 85, icon: Video },
  { name: "Photo Editing (Photoshop)", percentage: 90, icon: ImageIcon },
];

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);
  const [skillValues, setSkillValues] = useState<number[]>(skills.map(() => 0));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated) {
            setAnimated(true);
            
            // Animate each skill
            skills.forEach((skill, index) => {
              let currentValue = 0;
              const increment = skill.percentage / 60; // 60 frames for ~1 second at 60fps
              
              const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= skill.percentage) {
                  currentValue = skill.percentage;
                  clearInterval(timer);
                }
                
                setSkillValues((prev) => {
                  const newValues = [...prev];
                  newValues[index] = Math.round(currentValue);
                  return newValues;
                });
              }, 25);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [animated]);

  return (
    <section id="skills" className="py-20 md:py-32 bg-muted/20">
      <div className="container mx-auto px-4 md:px-6">
        <div ref={sectionRef}>
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Skills</h2>
          
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div key={skill.name} className="glass rounded-2xl p-6 hover:scale-[1.02] transition-transform">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Icon className="h-6 w-6 text-accent" />
                    </div>
                    <span className="text-lg font-semibold text-foreground flex-1">{skill.name}</span>
                    <span className="text-2xl font-bold text-accent">{skillValues[index]}%</span>
                  </div>
                  <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-accent to-accent/70 rounded-full transition-all duration-1000 ease-out shadow-lg"
                      style={{ width: `${skillValues[index]}%` }}
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
