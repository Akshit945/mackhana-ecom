import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import heroImage from "@/assets/hero-mackhana.jpg";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
        <div className="space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-full border border-border">
            <Star className="h-4 w-4 text-primary fill-primary" />
            <span className="text-sm font-medium">Premium Quality Guaranteed</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="text-foreground">Premium</span>
            <br />
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Makhana
            </span>
            <br />
            <span className="text-foreground">Fox Nuts & Lotus Seeds</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover the natural goodness of Makhana - also known as Fox Nuts, Gorgon Nuts, or Lotus Seeds. 
            Rich in protein, low in calories, and packed with nutrients for a healthy lifestyle.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button onClick={() => navigate("/products")} variant="hero" size="lg" className="group">
              Shop Makhana
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            {/* <Button onClick={() => navigate("/health_benifits")} variant="outline" size="lg">
              Health Benefits
            </Button> */}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-border/50">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">9.7g</div>
              <div className="text-sm text-muted-foreground">Protein per 100g</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">347</div>
              <div className="text-sm text-muted-foreground">Calories per 100g</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">0.1g</div>
              <div className="text-sm text-muted-foreground">Fat per 100g</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Natural & Pure</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;