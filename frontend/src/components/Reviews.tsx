import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Priya Sharma",
    rating: 5,
    comment: "Amazing quality makhana! My kids love the different flavors. Perfect healthy snacking option.",
    location: "Mumbai"
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    rating: 5,
    comment: "Best makhana I've ever tasted. The roasted variety is perfectly crispy and the spices are well balanced.",
    location: "Delhi"
  },
  {
    id: 3,
    name: "Anita Patel",
    rating: 4,
    comment: "Great for weight management. I snack on these instead of chips. Highly recommend the Himalayan salt flavor!",
    location: "Ahmedabad"
  },
  {
    id: 4,
    name: "Suresh Reddy",
    rating: 5,
    comment: "Authentic taste and premium quality. Perfect for our family's healthy lifestyle. Fast delivery too!",
    location: "Hyderabad"
  },
  {
    id: 5,
    name: "Kavitha Nair",
    rating: 5,
    comment: "My diabetic mother loves these. Perfect guilt-free snack with amazing nutritional benefits.",
    location: "Kerala"
  },
  {
    id: 6,
    name: "Amit Singh",
    rating: 4,
    comment: "Fresh and crunchy. The tandoori masala flavor is incredible. Will definitely order again!",
    location: "Lucknow"
  }
];

const Reviews = () => {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied customers who have made makhana their favorite healthy snack
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <Card key={review.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating 
                          ? "fill-yellow-400 text-yellow-400" 
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                
                <p className="text-muted-foreground mb-4 italic">
                  "{review.comment}"
                </p>
                
                <div>
                  <p className="font-semibold text-foreground">{review.name}</p>
                  <p className="text-sm text-muted-foreground">{review.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;