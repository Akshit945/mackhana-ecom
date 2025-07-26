import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, ShoppingCart, Star, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { fetchProductById } from "@/apis/productsService";
import { log } from "console";


//   {
//     id: 1,
//     name: "Premium Roasted Makhana",
//     price: 299,
//     originalPrice: 399,
//     image: "/src/assets/spices-collection.jpg",
//     rating: 4.8,
//     reviews: 128,
//     description: "Premium quality roasted makhana with a perfect blend of spices. Rich in protein and low in calories. Our premium makhana is carefully sourced from the finest lotus farms and roasted to perfection using traditional methods. Each bite delivers a satisfying crunch with an aromatic blend of authentic spices.",
//     benefits: ["High Protein", "Low Calorie", "Rich in Antioxidants", "Gluten Free"],
//     weight: "250g",
//     nutritionFacts: {
//       calories: 347,
//       protein: "9.7g",
//       carbs: "76.9g",
//       fat: "0.1g",
//       fiber: "14.5g"
//     },
//     quantity: 100
//   },
//   {
//     id: 2,
//     name: "Himalayan Salt Makhana",
//     price: 249,
//     originalPrice: 329,
//     image: "/src/assets/grains-collection.jpg",
//     rating: 4.6,
//     reviews: 95,
//     description: "Crispy makhana seasoned with pure Himalayan pink salt. Perfect healthy snack for any time. Made with authentic Himalayan pink salt that adds natural minerals and a delicate flavor. This variety is perfect for those who prefer a subtle, natural taste.",
//     benefits: ["Natural Minerals", "Low Sodium", "Heart Healthy", "Vegan"],
//     weight: "200g",
//     nutritionFacts: {
//       calories: 347,
//       protein: "9.7g",
//       carbs: "76.9g",
//       fat: "0.1g",
//       fiber: "14.5g"
//     },
//     quantity: 100
//   },
//   {
//     id: 3,
//     name: "Cheese & Herbs Makhana",
//     price: 349,
//     originalPrice: 449,
//     image: "/src/assets/oils-collection.jpg",
//     rating: 4.9,
//     reviews: 156,
//     description: "Indulgent cheese and herb flavored makhana. A guilt-free alternative to regular snacks. Our signature blend combines real cheese powder with aromatic herbs for an irresistible flavor that satisfies your cravings without compromising on health.",
//     benefits: ["High Calcium", "Protein Rich", "No Artificial Colors", "Vegetarian"],
//     weight: "300g",
//     nutritionFacts: {
//       calories: 380,
//       protein: "12g",
//       carbs: "74g",
//       fat: "2.5g",
//       fiber: "14g"
//     },
//     quantity: 100
//   },
//   {
//     id: 4,
//     name: "Tandoori Masala Makhana",
//     price: 279,
//     originalPrice: 349,
//     image: "/src/assets/spices-collection.jpg",
//     rating: 4.7,
//     reviews: 89,
//     description: "Authentic tandoori masala flavored makhana with traditional Indian spices. Experience the rich flavors of the tandoor with every bite. Our special masala blend includes carefully selected spices that create an authentic Indian taste.",
//     benefits: ["Traditional Spices", "High Fiber", "No Preservatives", "Ayurvedic"],
//     weight: "250g",
//     nutritionFacts: {
//       calories: 352,
//       protein: "10g",
//       carbs: "75g",
//       fat: "0.8g",
//       fiber: "15g"
//     },
//     quantity: 100
//   },
//   {
//     id: 5,
//     name: "Peri Peri Makhana",
//     price: 329,
//     originalPrice: 429,
//     image: "/src/assets/grains-collection.jpg",
//     rating: 4.5,
//     reviews: 67,
//     description: "Spicy peri peri seasoned makhana for those who love a kick in their snacks. Our peri peri blend brings together African bird's eye chili with aromatic herbs for a fiery yet flavorful experience.",
//     benefits: ["Metabolism Boost", "Spicy Flavor", "Low Fat", "Natural Ingredients"],
//     weight: "225g",
//     nutritionFacts: {
//       calories: 355,
//       protein: "9.5g",
//       carbs: "77g",
//       fat: "0.3g",
//       fiber: "14.8g"
//     },
//     quantity: 100
//   },
//   {
//     id: 6,
//     name: "Plain Roasted Makhana",
//     price: 199,
//     originalPrice: 249,
//     image: "/src/assets/oils-collection.jpg",
//     rating: 4.4,
//     reviews: 143,
//     description: "Simple and healthy plain roasted makhana. Perfect base for your own seasonings. Our plain variety maintains the natural sweetness and nutritional value of makhana while providing the perfect canvas for your favorite flavors.",
//     benefits: ["Pure & Natural", "Versatile", "Low Calorie", "Gluten Free"],
//     weight: "300g",
//     nutritionFacts: {
//       calories: 347,
//       protein: "9.7g",
//       carbs: "76.9g",
//       fat: "0.1g",
//       fiber: "14.5g"
//     },
//     quantity: 100
//   }
// ];

const ProductDetail = () => {
  const { id } = useParams();
  const { addItem, items, updateQuantity: updateCartQuantity } = useCart();
  const { toast } = useToast();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchProductById(id).then(setProduct);
    setLoading(false);
  }, [id]);

  const cartItem = items.find(item => String(item._id) === id);
  const cartQuantity = cartItem ? cartItem.quantity : 0;
  const [quantity, setQuantity] = useState(cartQuantity || 1);


  // if (!product) {
  //   return (
  //     <div className="min-h-screen bg-background">
  //       <Header />
  //       <main className="container mx-auto px-4 py-8">
  //         <div className="text-center py-16">
  //           <h1 className="text-3xl font-bold text-foreground mb-4">Product Not Found</h1>
  //           <Link to="/products">
  //             <Button>Back to Products</Button>
  //           </Link>
  //         </div>
  //       </main>
  //       <Footer />
  //     </div>
  //   );
  // }

  const handleAddToCart = () => {
    addItem({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      weight: product.weight,
      quantity: 1
    });
    
    toast({
      title: "Added to Cart",
      description: `${product.name} added to your cart.`,
    });
  };


  const decreaseQuantity = () => {
    if (cartQuantity > 0) {
      const newQuantity = cartQuantity - 1;
      if (newQuantity === 0) {
        updateCartQuantity(product._id, 0);
        setQuantity(1);
      } else {
        setQuantity(newQuantity);
        updateCartQuantity(product._id, newQuantity);
      }
    } else if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (cartQuantity > 0) {
      const newQuantity = cartQuantity + 1;
      setQuantity(newQuantity);
      updateCartQuantity(product._id, newQuantity);
    } else {
      setQuantity(quantity + 1);
    }
  };
  if (loading) return <div>Loading...</div>;  
  if (!product) return <div>Product not found</div>;
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Link to="/products" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-foreground mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{product.rating}</span>
              </div>
              {/* <span className="text-muted-foreground">({product.reviews} reviews)</span> */}
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-primary">₹{product.price}</span>
              <span className="text-xl text-muted-foreground line-through">₹{product.originalPrice}</span>
              <Badge className="text-sm">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </Badge>
            </div>

            <p className="text-muted-foreground mb-6">{product.description}</p>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Weight: {product.weight}</h3>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Health Benefits:</h3>
              <div className="flex flex-wrap gap-2">
                {product.benefits.map((benefit, index) => (
                  <Badge key={index} variant="secondary">{benefit}</Badge>
                ))}
              </div>
            </div>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Nutrition Facts (per 100g)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>Calories: {product.nutritionFacts.calories}</div>
                  <div>Protein: {product.nutritionFacts.protein}</div>
                  <div>Carbs: {product.nutritionFacts.carbs}</div>
                  <div>Fat: {product.nutritionFacts.fat}</div>
                  <div>Fiber: {product.nutritionFacts.fiber}</div>
                </div>
              </CardContent>
            </Card>

            {cartQuantity === 0 ? (
              <Button onClick={handleAddToCart} className="w-full mb-4" size="lg">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart - ₹{product.price}
              </Button>
            ) : (
              <div className="flex items-center gap-4 mb-6">
                <span className="font-medium">In Cart:</span>
                <div className="flex items-center gap-2 bg-muted rounded-md p-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={decreaseQuantity}
                    className="h-10 w-10"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  
                  <span className="w-12 text-center font-medium text-lg">{cartQuantity}</span>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={increaseQuantity}
                    className="h-10 w-10"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;