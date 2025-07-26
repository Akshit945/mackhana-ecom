import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Gift } from "lucide-react";

const Newsletter = () => {
  return (
    <section className="py-16 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-6">
            {/* Icon */}
            <div className="mx-auto w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <Gift className="h-8 w-8 text-primary-foreground" />
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
              Get Exclusive Offers & Fresh Updates
            </h2>
            
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              Join thousands of food lovers and get 15% off your first order plus early access to new products and seasonal discounts.
            </p>

            {/* Newsletter Form */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto pt-4">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Enter your email address"
                  className="pl-10 bg-background/95 border-background/20 focus:ring-primary-foreground"
                />
              </div>
              <Button variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                Subscribe
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 text-sm text-primary-foreground/80">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                <span>No spam, unsubscribe anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                <span>10,000+ subscribers trust us</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;