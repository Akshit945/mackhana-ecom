import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, 
  Brain, 
  Scale, 
  Droplets, 
  Users, 
  Timer,
  Heart,
  Shield
} from "lucide-react";

const benefits = [
  {
    icon: Heart,
    title: "Cardiovascular Health",
    description: "Rich in magnesium and potassium, Makhana helps regulate blood pressure and supports heart health.",
    research: "Clinical studies show regular consumption may reduce bad cholesterol levels",
    badge: "Heart Healthy"
  },
  {
    icon: Scale,
    title: "Weight Management",
    description: "Low in calories but high in fiber and protein, making it perfect for weight loss and management.",
    research: "High protein content increases satiety and boosts metabolism",
    badge: "Low Calorie"
  },
  {
    icon: Activity,
    title: "Diabetes Control",
    description: "Low glycemic index helps maintain stable blood sugar levels and improves insulin sensitivity.",
    research: "Studies indicate improved glucose tolerance in regular consumers",
    badge: "Diabetic Friendly"
  },
  {
    icon: Brain,
    title: "Cognitive Function",
    description: "Contains thiamine which supports brain function, memory, and concentration.",
    research: "Thiamine deficiency linked to cognitive decline and memory issues",
    badge: "Brain Food"
  },
  {
    icon: Droplets,
    title: "Kidney Health",
    description: "Natural diuretic properties help flush toxins and support kidney function.",
    research: "Traditional Ayurvedic medicine recommends for kidney stone prevention",
    badge: "Detoxifying"
  },
  {
    icon: Users,
    title: "Reproductive Health",
    description: "Traditionally used as an aphrodisiac and to improve fertility in both men and women.",
    research: "Rich in zinc and other minerals essential for reproductive health",
    badge: "Fertility Boost"
  },
  {
    icon: Timer,
    title: "Anti-Aging Properties",
    description: "High antioxidant content fights free radicals and slows down the aging process.",
    research: "Flavonoids and other compounds protect against cellular damage",
    badge: "Anti-Aging"
  },
  {
    icon: Shield,
    title: "Immune Support",
    description: "Rich in antioxidants and minerals that strengthen the immune system naturally.",
    research: "Regular consumption associated with improved immune response",
    badge: "Immunity Booster"
  }
];

const HealthBenefits = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Proven <span className="text-primary">Health Benefits</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Backed by centuries of traditional use and modern scientific research, 
            Makhana offers numerous health benefits for overall wellness.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="group hover:shadow-card transition-all duration-300 bg-gradient-card border-border/50 h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <benefit.icon className="h-6 w-6" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {benefit.badge}
                  </Badge>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {benefit.description}
                  </p>
                  <p className="text-xs text-muted-foreground italic">
                    {benefit.research}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-card p-8 rounded-lg border border-border/50">
            <h3 className="text-2xl font-bold mb-4">
              Start Your <span className="text-primary">Healthy Journey</span>
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Incorporate the power of Makhana into your daily diet and experience these amazing health benefits. 
              Our premium quality fox nuts are carefully sourced and processed to retain maximum nutritional value.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge variant="outline">100% Natural</Badge>
              <Badge variant="outline">No Additives</Badge>
              <Badge variant="outline">Premium Quality</Badge>
              <Badge variant="outline">Scientifically Backed</Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthBenefits;