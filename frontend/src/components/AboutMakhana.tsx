import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Heart, Shield, Zap } from "lucide-react";

const AboutMakhana = () => {
  const benefits = [
    {
      icon: Heart,
      title: "Heart Healthy",
      description: "Low in cholesterol and sodium, rich in magnesium for cardiovascular health"
    },
    {
      icon: Zap,
      title: "High Protein",
      description: "Contains 9.7g protein per 100g, perfect for muscle building and repair"
    },
    {
      icon: Shield,
      title: "Antioxidant Rich",
      description: "Packed with flavonoids that help fight free radicals and aging"
    },
    {
      icon: Leaf,
      title: "Gluten Free",
      description: "Naturally gluten-free and suitable for various dietary requirements"
    }
  ];

  return (
    <section className="py-16 bg-gradient-feature">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About <span className="text-primary">Makhana</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Makhana, also known as Fox Nuts, Gorgon Nuts, or Lotus Seeds, are aquatic crop seeds harvested 
            from the Euryale Fox plant. These nutritious seeds have been a staple in Indian cuisine and 
            Ayurvedic medicine for centuries.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center group hover:shadow-card transition-all duration-300 bg-gradient-card border-border/50">
              <CardContent className="p-6">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <benefit.icon className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Information */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Nutritional Powerhouse</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-card rounded-lg">
                <span className="font-medium">Protein</span>
                <span className="text-primary font-bold">9.7g per 100g</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-card rounded-lg">
                <span className="font-medium">Calories</span>
                <span className="text-primary font-bold">347 kcal per 100g</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-card rounded-lg">
                <span className="font-medium">Carbohydrates</span>
                <span className="text-primary font-bold">76.9g per 100g</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-card rounded-lg">
                <span className="font-medium">Fat</span>
                <span className="text-primary font-bold">0.1g per 100g</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Traditional Uses</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                In Indian culture, Makhana is traditionally consumed during fasting periods as it's 
                considered a "sattvic" food that promotes mental clarity and spiritual well-being.
              </p>
              <p>
                Ayurveda recognizes Makhana as a natural aphrodisiac and recommends it for improving 
                kidney function, reducing inflammation, and promoting overall vitality.
              </p>
              <p>
                Modern research supports many of these traditional uses, confirming Makhana's role 
                in managing diabetes, supporting weight loss, and promoting heart health.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMakhana;