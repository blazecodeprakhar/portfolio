import * as React from "react";
import { useState } from "react";
import { ArrowRight, Star } from "lucide-react";
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
          "group relative flex flex-col overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl",
          className
        )}
        {...props}
      >
        {/* Image */}
        <div className="aspect-video overflow-hidden relative bg-muted/20">
          {badge && (
            <div className="absolute top-3 right-3 z-10 rounded-full bg-yellow-500/90 backdrop-blur-sm px-3 py-1 text-xs font-bold text-white shadow-lg flex items-center gap-1.5 border border-yellow-400/50">
              <Star className="w-3.5 h-3.5 fill-current" />
              {badge}
            </div>
          )}
          <img
            src={imgSrc}
            alt={title}
            className={cn(
              "h-full w-full object-cover transition-all duration-700 group-hover:scale-110",
              isLoaded ? "opacity-100 blur-0" : "opacity-0 blur-sm"
            )}
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
          />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
            {title}
          </h3>

          <p className="mt-3 flex-1 text-muted-foreground">
            {description}
          </p>

          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="group/button mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            {linkText}
            <ArrowRight className="h-4 w-4 transition-transform group-hover/button:translate-x-1" />
          </a>
        </div>
      </div>
    );
  }
);

ProjectCard.displayName = "ProjectCard";
export { ProjectCard };
