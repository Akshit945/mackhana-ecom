import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Star } from "lucide-react";
import spicesImage from "@/assets/spices-collection.jpg";
import grainsImage from "@/assets/grains-collection.jpg";
import oilsImage from "@/assets/oils-collection.jpg";

const products = [
  {
    id: 1,
    name: "Premium Spice Collection",
    description: "Handpicked aromatic spices from the finest regions",
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    reviews: 124,
    image: spicesImage,
    badge: "Best Seller",
    badgeVariant: "default" as const
  },
  {
    id: 2,
    name: "Organic Grains & Lentils",
    description: "Farm-fresh organic pulses and ancient grains",
    price: 249,
    originalPrice: 319,
    rating: 4.9,
    reviews: 89,
    image: grainsImage,
    badge: "Organic",
    badgeVariant: "secondary" as const
  },
  {
    id: 3,
    name: "Artisan Cooking Oils",
    description: "Cold-pressed oils and gourmet condiments",
    price: 449,
    originalPrice: 599,
    rating: 4.7,
    reviews: 156,
    image: oilsImage,
    badge: "Premium",
    badgeVariant: "outline" as const
  }
];

const FeaturedProducts = () => {
  return (
    <section className="py-16 bg-gradient-feature">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="text-primary">Products</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular items, carefully curated for exceptional quality and taste
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-card transition-all duration-300 overflow-hidden bg-gradient-card border-border/50">
              <div className="relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant={product.badgeVariant}>{product.badge}</Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Button variant="ghost" size="icon" className="bg-background/80 backdrop-blur-sm hover:bg-background">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {product.description}
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-primary fill-primary' : 'text-muted-foreground'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-primary">₹{product.price}</span>
                    <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice}</span>
                    <Badge variant="secondary" className="ml-auto">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </Badge>
                  </div>

                  {/* Add to Cart Button */}
                  <Button className="w-full group" variant="cta">
                    <ShoppingCart className="h-4 w-4 transition-transform group-hover:scale-110" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;