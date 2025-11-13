import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8 px-4 md:py-12 bg-muted/30 border-t border-border/50 text-center">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-3 text-center">
          <div className="flex flex-wrap justify-center items-center gap-2 text-sm text-muted-foreground">
            <span>© 2025</span>
            <span className="font-bold text-accent">BlazeForge</span>
            <span>•</span>
            <span>Crafted with</span>
            <Heart className="h-4 w-4 text-accent fill-accent animate-pulse" />
            <span>by</span>
            <span className="font-semibold text-foreground">Prakhar Yadav</span>
          </div>

          <p className="text-xs text-muted-foreground text-center max-w-xs sm:max-w-none">
            All rights reserved. Designed and developed with passion.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
