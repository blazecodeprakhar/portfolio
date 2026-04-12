import React from "react";
import { ArrowRight, MessageCircle, LucideIcon } from "lucide-react";

export interface PremiumButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  icon?: LucideIcon;
  href: string;
  variant?: "primary" | "secondary";
}

export const PremiumButton = ({ 
  children, 
  icon: Icon = ArrowRight, 
  href, 
  variant = "primary",
  className = "", 
  ...props 
}: PremiumButtonProps) => {
  // If variant is secondary, let's make the accent slightly more subtle, 
  // but keeping the exact same structure to unify the system.
  const isPrimary = variant === "primary";
  
  return (
    <a
      href={href}
      className={`group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white/[0.03] border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10 text-white font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] overflow-hidden w-full sm:w-auto ${className}`}
      {...props}
    >
      {/* Hover Shimmer Effect */}
      <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[100%] group-hover:animate-[shimmer_2s_infinite]" />
      
      {/* Title Text */}
      <span className="text-sm tracking-widest uppercase font-bold text-gray-300 group-hover:text-white transition-colors relative z-10 whitespace-nowrap">
        {children}
      </span>
      
      {/* Icon Circle */}
      <div 
        className={`w-8 h-8 rounded-full flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-300 flex-shrink-0
        ${isPrimary 
          ? "bg-purple-600 shadow-[0_0_15px_rgba(168,85,247,0.5)]" 
          : "bg-white/10 group-hover:bg-purple-600 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]"}`}
      >
        <Icon className={`h-4 w-4 ${isPrimary ? "text-white" : "text-gray-300 group-hover:text-white"} group-hover:translate-x-0.5 transition-all`} />
      </div>
    </a>
  );
};
