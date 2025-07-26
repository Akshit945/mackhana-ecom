import { Card, CardContent } from "@/components/ui/card";
import { Truck, Shield, Leaf, Clock, Award, Headphones } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Delivery",
    description: "Free shipping on orders above ₹999 across India"
  },
  {
    icon: Shield,
    title: "Quality Assured",
    description: "100% authentic products with quality guarantee"
  },
  {
    icon: Leaf,
    title: "Farm Fresh",
    description: "Directly sourced from certified organic farms"
  },
  {
    icon: Clock,
    title: "Quick Processing",
    description: "Same day processing for orders before 2 PM"
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Award-winning products with international standards"
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock customer service and assistance"
  }
];

const Features = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose <span className="text-primary">Mackhana</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're committed to bringing you the finest quality products with exceptional service
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-card transition-all duration-300 bg-gradient-card border-border/50">
              <CardContent className="p-6 text-center">
                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;