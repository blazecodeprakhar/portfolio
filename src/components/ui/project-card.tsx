import * as React from "react";
import { useState } from "react";
import { ArrowRight, Star, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProjectCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
  badge?: string;
  title: string;
  description: string;
  link: string;
  linkText?: string;
}

const ProjectCard = React.forwardRef<HTMLDivElement, ProjectCardProps>(
  (
    { className, imgSrc, badge, title, description, link, linkText = "View Project", ...props },
    ref
  ) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
      <div
        ref={ref}
        className={cn(
          "group relative flex flex-col overflow-hidden rounded-[2rem] border border-white/[0.08] bg-gradient-to-b from-white/[0.02] to-[#07070d] shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_60px_-15px_rgba(189,79,244,0.3)] hover:border-[#BD4FF4]/40 cursor-pointer",
          className
        )}
        onClick={() => {
          if (link !== "#" && link) {
            window.open(link, "_blank", "noopener,noreferrer");
          }
        }}
        {...props}
      >
        {/* Top Image Container */}
        <div className="aspect-[16/10] overflow-hidden relative bg-[#07070d]">
          {/* Badge */}
          {badge && (
            <div className="absolute top-4 right-4 z-20 rounded-full bg-[#BD4FF4] px-3.5 py-1.5 text-[10px] uppercase tracking-widest font-black text-white shadow-lg flex items-center gap-1.5">
              <Star className="w-3 h-3 fill-white" />
              {badge}
            </div>
          )}

          {/* Image */}
          <img
            src={imgSrc}
            alt={title}
            className={cn(
              "h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]",
              isLoaded ? "opacity-100 blur-0" : "opacity-0 blur-sm"
            )}
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
          />

          {/* Hover Overlay Reveal */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a10] via-[#0a0a10]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-center justify-center">
             <span className="translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-semibold shadow-[0_0_30px_rgba(189,79,244,0.4)] flex items-center gap-2">
                {linkText === "SOON" ? "Coming Soon" : "View Live Project"}
                {linkText !== "SOON" && <ExternalLink className="w-4 h-4" />}
             </span>
          </div>
        </div>

        {/* Content Container */}
        <div className="flex flex-1 flex-col p-6 sm:p-8 relative z-20">
          
          <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#BD4FF4] transition-colors duration-300 mb-3 line-clamp-1 drop-shadow-sm">
            {title}
          </h3>

          <p className="flex-1 text-gray-400 font-light leading-relaxed line-clamp-3 text-sm sm:text-base">
            {description}
          </p>

          <div className="mt-6 pt-6 border-t border-white/[0.05] flex items-center justify-between">
              <span className="text-[#BD4FF4] text-xs sm:text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300">
                  {linkText}
              </span>
              <div className="w-8 h-8 rounded-full bg-white/[0.02] border border-white/10 flex items-center justify-center group-hover:bg-[#BD4FF4]/10 group-hover:border-[#BD4FF4]/30 transition-all duration-300">
                <ArrowRight className="h-4 w-4 text-gray-500 group-hover:text-[#BD4FF4] transition-transform duration-300 group-hover:translate-x-0.5" />
              </div>
          </div>
        </div>
      </div>
    );
  }
);

ProjectCard.displayName = "ProjectCard";
export { ProjectCard };
