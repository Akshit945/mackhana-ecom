import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
const Header = () => {
  const {
    uniqueItems
  } = useCart();
  return <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to={'/'}>
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold text-primary">Makhana Hub</h1>
        </div></Link>
        

        {/* Navigation - Hidden on mobile */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-foreground hover:text-primary transition-colors">Home</Link>
          <Link to="/products" className="text-foreground hover:text-primary transition-colors">Products</Link>
          <Link to="/contact" className="text-foreground hover:text-primary transition-colors">Contact</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              {uniqueItems > 0 && <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs p-0">
                  {uniqueItems}
                </Badge>}
            </Button>
          </Link>
          {/* <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button> */}
        </div>
      </div>
    </header>;
};
export default Header;