import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Minus, Plus, ShoppingCart, Star, Search } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { fetchProducts } from "@/apis/productsService";

//   id: 1,
//   name: "Premium Roasted Makhana",
//   price: 299,
//   originalPrice: 399,
//   image: "/src/assets/spices-collection.jpg",
//   rating: 4.8,
//   reviews: 128,
//   description: "Premium quality roasted makhana with a perfect blend of spices. Rich in protein and low in calories.",
//   benefits: ["High Protein", "Low Calorie", "Rich in Antioxidants", "Gluten Free"],
//   weight: "250g",
//   quantity: 1,
// }, {
//   id: 2,
//   name: "Himalayan Salt Makhana",
//   price: 249,
//   originalPrice: 329,
//   image: "/src/assets/grains-collection.jpg",
//   rating: 4.6,
//   reviews: 95,
//   description: "Crispy makhana seasoned with pure Himalayan pink salt. Perfect healthy snack for any time.",
//   benefits: ["Natural Minerals", "Low Sodium", "Heart Healthy", "Vegan"],
//   weight: "200g",
//   quantity: 50,
// }, {
//   id: 3,
//   name: "Cheese & Herbs Makhana",
//   price: 349,
//   originalPrice: 449,
//   image: "/src/assets/oils-collection.jpg",
//   rating: 4.9,
//   reviews: 156,
//   description: "Indulgent cheese and herb flavored makhana. A guilt-free alternative to regular snacks.",
//   benefits: ["High Calcium", "Protein Rich", "No Artificial Colors", "Vegetarian"],
//   weight: "300g",
//   quantity: 50,
// }, {
//   id: 4,
//   name: "Tandoori Masala Makhana",
//   price: 279,
//   originalPrice: 349,
//   image: "/src/assets/spices-collection.jpg",
//   rating: 4.7,
//   reviews: 89,
//   description: "Authentic tandoori masala flavored makhana with traditional Indian spices.",
//   benefits: ["Traditional Spices", "High Fiber", "No Preservatives", "Ayurvedic"],
//   weight: "250g",
//   quantity: 10,
// }, {
//   id: 5,
//   name: "Peri Peri Makhana",
//   price: 329,
//   originalPrice: 429,
//   image: "/src/assets/grains-collection.jpg",
//   rating: 4.5,
//   reviews: 67,
//   description: "Spicy peri peri seasoned makhana for those who love a kick in their snacks.",
//   benefits: ["Metabolism Boost", "Spicy Flavor", "Low Fat", "Natural Ingredients"],
//   weight: "225g",
//   quantity: 15,
// }, {
//   id: 6,
//   name: "Plain Roasted Makhana",
//   price: 199,
//   originalPrice: 249,
//   image: "/src/assets/oils-collection.jpg",
//   rating: 4.4,
//   reviews: 143,
//   description: "Simple and healthy plain roasted makhana. Perfect base for your own seasonings.",
//   benefits: ["Pure & Natural", "Versatile", "Low Calorie", "Gluten Free"],
//   weight: "300g",
//   quantity: 20,
// }];
const Products = () => {
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchProducts().then(setProducts);
    setLoading(false);
  }, []);
  const [searchTerm, setSearchTerm] = useState("");
  const {
    addItem,
    items,
    updateQuantity: updateCartQuantity
  } = useCart();
  const {
    toast
  } = useToast();
  const getQuantity = (productId: number) => quantities[productId] || 1;
 
  const addToCart = (product: any) => {
    const quantity = getQuantity(product._id);
    addItem({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      weight: product.weight,
      quantity
    });
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`
    });
  };
  const isInCart = (productId: number) => {
    return items.some(item => item._id === productId);
  };
  const getCartQuantity = (productId: number) => {
    const item = items.find(item => item._id === productId);
    return item ? item.quantity : 0;
  };
  const updateCartItemQuantity = (productId: number, newQuantity: number) => {
    updateCartQuantity(productId, newQuantity);
  };

  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (loading) return <div>Loading...</div>;
  return <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Our Premium Makhana Collection</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover our range of healthy, delicious makhana snacks. Each variety is carefully crafted with natural ingredients and traditional flavors.
          </p>
          
          {/* Search Box */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => <Card key={product._id} className="group hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
                    {Math.round((product.originalPrice - product.price) / product.originalPrice * 100)}% OFF
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <CardTitle className="text-xl mb-2">{product.name}</CardTitle>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                  
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold text-primary">₹{product.price}</span>
                  <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice}</span>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    
                    <div className="flex items-center gap-2">
                      
                      
                      
                      
                      
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link to={`/product/${product._id}`} className="flex-1">
                      <Button variant="outline" className="w-full">View Details</Button>
                    </Link>
                    
                    {!isInCart(product._id) ? <Button onClick={() => addToCart(product)} className="flex-1">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button> : <div className="flex-1 flex items-center gap-2 bg-muted rounded-md p-2">
                        <Button variant="outline" size="icon" onClick={() => updateCartItemQuantity(product._id, getCartQuantity(product._id) - 1)} className="h-8 w-8">
                          <Minus className="h-3 w-3" />
                        </Button>
                        
                        <span className="flex-1 text-center font-medium">{getCartQuantity(product._id)}</span>
                        
                        <Button variant="outline" size="icon" onClick={() => updateCartItemQuantity(product._id, getCartQuantity(product._id) + 1)} className="h-8 w-8">
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>}
                  </div>
                </div>
              </CardContent>
            </Card>)}
        </div>
      </main>

      <Footer />
    </div>;
};
export default Products;