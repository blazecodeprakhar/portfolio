import * as React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProjectCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
  title: string;
  description: string;
  link: string;
  linkText?: string;
}

const ProjectCard = React.forwardRef<HTMLDivElement, ProjectCardProps>(
  (
    { className, imgSrc, title, description, link, linkText = "View Project", ...props },
    ref
  ) => {
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
        <div className="aspect-video overflow-hidden">
          <img
            src={imgSrc}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
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
