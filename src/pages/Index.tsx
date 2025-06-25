import { useState } from "react";
import { ShoppingCart, Search, Menu, X, Heart, Star, Filter, ChevronDown, Mail, Phone, MapPin, Facebook, Twitter, Instagram, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

// Product data with comprehensive tech products
const products = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: 1199,
    originalPrice: 1299,
    image: "https://images.unsplash.com/photo-1678911820864-e2c567c655d7?w=500&h=500&fit=crop",
    category: "smartphones",
    brand: "Apple",
    rating: 4.8,
    reviews: 1234,
    description: "The ultimate iPhone with titanium design, A17 Pro chip, and advanced camera system.",
    features: ["A17 Pro Chip", "Titanium Design", "48MP Camera", "Action Button"],
    inStock: true
  },
  {
    id: 2,
    name: "MacBook Pro M3",
    price: 1999,
    originalPrice: 2199,
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&h=500&fit=crop",
    category: "laptops",
    brand: "Apple",
    rating: 4.9,
    reviews: 856,
    description: "Professional laptop with M3 chip for ultimate performance and battery life.",
    features: ["M3 Chip", "18hr Battery", "Liquid Retina XDR", "16GB RAM"],
    inStock: true
  },
  {
    id: 3,
    name: "Samsung Galaxy S24 Ultra",
    price: 1099,
    originalPrice: 1199,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&h=500&fit=crop",
    category: "smartphones",
    brand: "Samsung",
    rating: 4.7,
    reviews: 923,
    description: "Premium Android phone with S Pen, advanced AI features, and 200MP camera.",
    features: ["S Pen Included", "200MP Camera", "AI Features", "5000mAh Battery"],
    inStock: true
  },
  {
    id: 4,
    name: "Sony WH-1000XM5",
    price: 299,
    originalPrice: 399,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop",
    category: "audio",
    brand: "Sony",
    rating: 4.6,
    reviews: 567,
    description: "Industry-leading noise canceling headphones with premium sound quality.",
    features: ["Active Noise Canceling", "30hr Battery", "Touch Controls", "Quick Charge"],
    inStock: true
  },
  {
    id: 5,
    name: "Dell XPS 13",
    price: 1299,
    originalPrice: 1499,
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&h=500&fit=crop",
    category: "laptops",
    brand: "Dell",
    rating: 4.5,
    reviews: 445,
    description: "Ultra-portable laptop with stunning InfinityEdge display and premium build.",
    features: ["13.4\" InfinityEdge", "Intel i7", "16GB RAM", "Ultra-portable"],
    inStock: true
  },
  {
    id: 6,
    name: "iPad Pro M2",
    price: 899,
    originalPrice: 999,
    image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&h=500&fit=crop",
    category: "tablets",
    brand: "Apple",
    rating: 4.8,
    reviews: 678,
    description: "Most advanced iPad with M2 chip, perfect for creativity and productivity.",
    features: ["M2 Chip", "Liquid Retina Display", "Apple Pencil Ready", "All-day Battery"],
    inStock: true
  },
  {
    id: 7,
    name: "AirPods Pro 2",
    price: 199,
    originalPrice: 249,
    image: "https://images.unsplash.com/photo-1606220838315-056192d5e927?w=500&h=500&fit=crop",
    category: "audio",
    brand: "Apple",
    rating: 4.7,
    reviews: 1123,
    description: "Premium wireless earbuds with adaptive transparency and spatial audio.",
    features: ["Active Noise Canceling", "Spatial Audio", "6hr Battery", "Wireless Charging"],
    inStock: true
  },
  {
    id: 8,
    name: "Gaming Desktop RTX 4080",
    price: 2299,
    originalPrice: 2599,
    image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=500&h=500&fit=crop",
    category: "desktops",
    brand: "Custom",
    rating: 4.9,
    reviews: 234,
    description: "High-performance gaming desktop with RTX 4080 and latest Intel processor.",
    features: ["RTX 4080 GPU", "Intel i7-13700K", "32GB DDR5", "1TB NVMe SSD"],
    inStock: true
  },
  {
    id: 9,
    name: "Surface Pro 9",
    price: 1099,
    originalPrice: 1299,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&h=500&fit=crop",
    category: "tablets",
    brand: "Microsoft",
    rating: 4.4,
    reviews: 389,
    description: "2-in-1 laptop and tablet with Windows 11 and all-day battery life.",
    features: ["Windows 11", "12.3\" Touch Display", "Type Cover Ready", "All-day Battery"],
    inStock: true
  }
];

const categories = [
  { id: "all", name: "All Products", icon: "🛍️" },
  { id: "smartphones", name: "Smartphones", icon: "📱" },
  { id: "laptops", name: "Laptops", icon: "💻" },
  { id: "tablets", name: "Tablets", icon: "📲" },
  { id: "audio", name: "Audio", icon: "🎧" },
  { id: "desktops", name: "Desktops", icon: "🖥️" }
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [showFilters, setShowFilters] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  // Navigation handler
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  // Enhanced search functionality
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Scroll to products section when searching
      scrollToSection('products');
      toast({
        title: "Search Results",
        description: `Showing results for "${searchTerm}"`,
      });
    }
  };

  // Filter products based on category, search, and price
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = searchTerm === "" || 
                         product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesCategory && matchesSearch && matchesPrice;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low": return a.price - b.price;
      case "price-high": return b.price - a.price;
      case "rating": return b.rating - a.rating;
      case "name": return a.name.localeCompare(b.name);
      default: return b.rating - a.rating; // featured
    }
  });

  const addToCart = (product: any, quantity = 1) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
    toast({
      title: "Removed from Cart",
      description: "Item has been removed from your cart.",
    });
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart(cart.map(item => 
      item.id === productId 
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const toggleWishlist = (productId: number) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
      toast({
        title: "Removed from Wishlist",
        description: "Item has been removed from your wishlist.",
      });
    } else {
      setWishlist([...wishlist, productId]);
      toast({
        title: "Added to Wishlist",
        description: "Item has been added to your wishlist.",
      });
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Auth Modal Component
  const AuthModal = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      toast({
        title: authMode === "login" ? "Login Successful" : "Account Created",
        description: authMode === "login" ? "Welcome back!" : "Your account has been created successfully.",
      });
      setShowAuthModal(false);
    };

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-6 animate-scale-in">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{authMode === "login" ? "Login" : "Sign Up"}</h2>
            <Button variant="ghost" size="sm" onClick={() => setShowAuthModal(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {authMode === "signup" && (
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              {authMode === "login" ? "Login" : "Create Account"}
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <button
              onClick={() => setAuthMode(authMode === "login" ? "signup" : "login")}
              className="text-blue-600 hover:underline"
            >
              {authMode === "login" ? "Don't have an account? Sign up" : "Already have an account? Login"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Product Detail Modal
  const ProductDetailModal = ({ product, onClose }: { product: any, onClose: () => void }) => {
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    
    const images = [product.image, product.image, product.image]; // In real app, would have multiple images

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
          <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Product Images */}
              <div className="space-y-4">
                <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                  <img 
                    src={images[selectedImage]} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 ${
                        selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl font-bold text-blue-600">${product.price}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                </div>

                <p className="text-gray-600">{product.description}</p>

                <div>
                  <h4 className="font-semibold mb-3">Key Features:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {product.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-lg">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-x">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <Button 
                    onClick={() => addToCart(product, quantity)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl flex-1"
                  >
                    Add to Cart - ${(product.price * quantity).toLocaleString()}
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => toggleWishlist(product.id)}
                    className="p-3"
                  >
                    <Heart className={`h-5 w-5 ${wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Shopping Cart Sidebar
  const CartSidebar = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    return (
      <div className={`fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
        <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
          <div className="flex flex-col h-full">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Shopping Cart ({getTotalItems()})</h2>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center text-gray-500 mt-8">
                  <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 border rounded-xl">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-blue-600 font-semibold">${item.price}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded border flex items-center justify-center text-sm hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="text-sm">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded border flex items-center justify-center text-sm hover:bg-gray-100"
                          >
                            +
                          </button>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="ml-auto text-red-500 text-sm hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {cart.length > 0 && (
              <div className="p-6 border-t">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-xl font-bold text-blue-600">${getTotalPrice().toLocaleString()}</span>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl">
                  Proceed to Checkout
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Wishlist Modal
  const WishlistModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const wishlistProducts = products.filter(product => wishlist.includes(product.id));

    return (
      <div className={`fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
        <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
          <div className="flex flex-col h-full">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Wishlist ({wishlist.length})</h2>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              {wishlistProducts.length === 0 ? (
                <div className="text-center text-gray-500 mt-8">
                  <Heart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Your wishlist is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {wishlistProducts.map((product) => (
                    <div key={product.id} className="flex gap-4 p-4 border rounded-xl">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{product.name}</h4>
                        <p className="text-blue-600 font-semibold">${product.price}</p>
                        <div className="flex gap-2 mt-2">
                          <Button
                            size="sm"
                            onClick={() => addToCart(product)}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-xs"
                          >
                            Add to Cart
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleWishlist(product.id)}
                            className="text-xs"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="sticky top-0 bg-white/90 backdrop-blur-md border-b z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform cursor-pointer"
              >
                🛍️ TechStore
              </button>
              
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-6">
                <button 
                  onClick={() => scrollToSection('home')}
                  className={`text-gray-600 hover:text-blue-600 transition-colors ${activeSection === 'home' ? 'text-blue-600 font-semibold' : ''}`}
                >
                  Home
                </button>
                <button 
                  onClick={() => scrollToSection('products')}
                  className={`text-gray-600 hover:text-blue-600 transition-colors ${activeSection === 'products' ? 'text-blue-600 font-semibold' : ''}`}
                >
                  Products
                </button>
                <button 
                  onClick={() => scrollToSection('deals')}
                  className={`text-gray-600 hover:text-blue-600 transition-colors ${activeSection === 'deals' ? 'text-blue-600 font-semibold' : ''}`}
                >
                  Deals
                </button>
                <button 
                  onClick={() => scrollToSection('about')}
                  className={`text-gray-600 hover:text-blue-600 transition-colors ${activeSection === 'about' ? 'text-blue-600 font-semibold' : ''}`}
                >
                  About
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className={`text-gray-600 hover:text-blue-600 transition-colors ${activeSection === 'contact' ? 'text-blue-600 font-semibold' : ''}`}
                >
                  Contact
                </button>
              </nav>
            </div>

            {/* Enhanced Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch} className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search products, brands, categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-12 rounded-full border-gray-200 focus:border-blue-500"
                />
                <Button 
                  type="submit"
                  size="sm"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full bg-blue-600 hover:bg-blue-700 px-3"
                >
                  Search
                </Button>
              </form>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="hidden md:flex"
                onClick={() => {
                  setAuthMode("login");
                  setShowAuthModal(true);
                }}
              >
                <LogIn className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="hidden md:flex"
                onClick={() => {
                  setAuthMode("signup");
                  setShowAuthModal(true);
                }}
              >
                <UserPlus className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedProduct("wishlist")}
              >
                <Heart className="h-5 w-5" />
                {wishlist.length > 0 && (
                  <Badge className="ml-1 bg-red-500">{wishlist.length}</Badge>
                )}
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setSelectedProduct("cart")}
              >
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <Badge className="ml-1 bg-blue-600">{getTotalItems()}</Badge>
                )}
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Enhanced Mobile Search */}
          <div className="md:hidden mt-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products, brands, categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-20 rounded-full"
              />
              <Button 
                type="submit"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full bg-blue-600 hover:bg-blue-700 text-xs px-3"
              >
                Search
              </Button>
            </form>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t pt-4 animate-fade-in">
              <nav className="flex flex-col gap-2">
                <button onClick={() => scrollToSection('home')} className="py-2 text-left text-gray-600 hover:text-blue-600">Home</button>
                <button onClick={() => scrollToSection('products')} className="py-2 text-left text-gray-600 hover:text-blue-600">Products</button>
                <button onClick={() => scrollToSection('deals')} className="py-2 text-left text-gray-600 hover:text-blue-600">Deals</button>
                <button onClick={() => scrollToSection('about')} className="py-2 text-left text-gray-600 hover:text-blue-600">About</button>
                <button onClick={() => scrollToSection('contact')} className="py-2 text-left text-gray-600 hover:text-blue-600">Contact</button>
                <div className="flex gap-2 mt-2">
                  <Button 
                    size="sm" 
                    onClick={() => {
                      setAuthMode("login");
                      setShowAuthModal(true);
                    }}
                  >
                    Login
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setAuthMode("signup");
                      setShowAuthModal(true);
                    }}
                  >
                    Sign Up
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-fade-in">
              Welcome to TechStore
            </h2>
            <p className="text-xl text-gray-600 mb-8 animate-fade-in">
              Discover the latest technology products with unbeatable prices and premium quality. 
              Your one-stop destination for all tech needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl text-lg"
                onClick={() => scrollToSection('products')}
              >
                Shop Now
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-xl text-lg"
                onClick={() => scrollToSection('about')}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`rounded-full px-6 py-2 ${
                  selectedCategory === category.id 
                    ? 'bg-blue-600 text-white' 
                    : 'hover:bg-blue-50'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16">
        <div className="container mx-auto px-4">
          {/* Section Header with Search Results */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h3 className="text-3xl font-bold mb-2">
                {searchTerm ? `Search Results for "${searchTerm}" (${sortedProducts.length})` : `Featured Products (${sortedProducts.length})`}
              </h3>
              <p className="text-gray-600">
                {searchTerm ? `Found ${sortedProducts.length} products matching your search` : 'Discover our handpicked selection of premium tech products'}
              </p>
              {searchTerm && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchTerm("")}
                  className="mt-2"
                >
                  Clear Search
                </Button>
              )}
            </div>
            
            {/* Filters and Sort */}
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:border-blue-500"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name A-Z</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <Card className="mb-8 animate-fade-in">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Price Range</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="3000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Brands</h4>
                    <div className="space-y-2">
                      {['Apple', 'Samsung', 'Sony', 'Dell'].map(brand => (
                        <label key={brand} className="flex items-center gap-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">{brand}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Rating</h4>
                    <div className="space-y-2">
                      {[4, 3, 2, 1].map(rating => (
                        <label key={rating} className="flex items-center gap-2">
                          <input type="checkbox" className="rounded" />
                          <div className="flex items-center gap-1">
                            {[...Array(rating)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            ))}
                            <span className="text-sm">& up</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-0">
                  <div 
                    className="relative overflow-hidden rounded-t-lg cursor-pointer"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 right-3">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(product.id);
                        }}
                        className="p-2 bg-white/80 backdrop-blur-sm hover:bg-white"
                      >
                        <Heart className={`h-4 w-4 ${wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                      </Button>
                    </div>
                    {product.originalPrice > product.price && (
                      <Badge className="absolute top-3 left-3 bg-red-500 text-white">
                        Sale
                      </Badge>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="text-xs text-gray-600 ml-1">({product.reviews})</span>
                    </div>
                    
                    <h4 className="font-semibold mb-2 line-clamp-2">{product.name}</h4>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-blue-600">${product.price}</span>
                        {product.originalPrice > product.price && (
                          <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                        )}
                      </div>
                      <Badge variant="secondary" className="text-xs">{product.brand}</Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        onClick={() => setSelectedProduct(product)}
                        variant="outline"
                        size="sm"
                        className="text-xs"
                      >
                        View Details
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {sortedProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                {searchTerm ? `No products found for "${searchTerm}"` : 'No products found matching your criteria.'}
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setPriceRange([0, 3000]);
                }}
                className="mt-4"
              >
                {searchTerm ? 'Clear Search' : 'Clear Filters'}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Deals Section */}
      <section id="deals" className="py-16 bg-gradient-to-r from-red-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">🔥 Hot Deals</h3>
            <p className="text-gray-600">Limited time offers on your favorite products</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.filter(p => p.originalPrice > p.price).slice(0, 6).map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-4" onClick={() => setSelectedProduct(product)}>
                  <div className="relative mb-4">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </Badge>
                  </div>
                  <h4 className="font-semibold mb-2">{product.name}</h4>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-bold text-red-600">${product.price}</span>
                    <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                  </div>
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                  >
                    Grab Deal
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-6">Why Choose TechStore?</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🚚</span>
              </div>
              <h4 className="text-xl font-semibold">Free Shipping</h4>
              <p className="text-blue-100">Free shipping on all orders over $99 with fast delivery to your doorstep.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🛡️</span>
              </div>
              <h4 className="text-xl font-semibold">Quality Guarantee</h4>
              <p className="text-blue-100">All products come with manufacturer warranty and our quality assurance.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">💬</span>
              </div>
              <h4 className="text-xl font-semibold">24/7 Support</h4>
              <p className="text-blue-100">Our expert team is always ready to help you with any questions or issues.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Get In Touch</h3>
            <p className="text-gray-600">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div>
              <form className="space-y-6" onSubmit={(e) => {
                e.preventDefault();
                toast({
                  title: "Message Sent!",
                  description: "Thank you for contacting us. We'll get back to you soon.",
                });
              }}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <Input placeholder="Enter your first name" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <Input placeholder="Enter your last name" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input type="email" placeholder="Enter your email" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <Input placeholder="What's this about?" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={6}
                    placeholder="Tell us how we can help you..."
                    required
                  ></textarea>
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h4 className="text-xl font-semibold mb-6">Contact Information</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Mail className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-gray-600">support@techstore.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Phone className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-gray-600">1-800-TECH-STORE</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-gray-600">123 Tech Street, Digital City, DC 12345</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
                <div className="flex gap-4">
                  <Button variant="outline" size="sm" className="p-2">
                    <Facebook className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="sm" className="p-2">
                    <Twitter className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="sm" className="p-2">
                    <Instagram className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold mb-2">Business Hours</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>Monday - Friday: 9:00 AM - 8:00 PM</p>
                  <p>Saturday: 10:00 AM - 6:00 PM</p>
                  <p>Sunday: 12:00 PM - 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <button 
                onClick={() => scrollToSection('home')}
                className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent hover:scale-105 transition-transform cursor-pointer"
              >
                🛍️ TechStore
              </button>
              <p className="text-gray-400 mb-4">
                Your trusted partner for all technology needs. Quality products, competitive prices, and exceptional service.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => scrollToSection('home')} className="hover:text-white transition-colors">Home</button></li>
                <li><button onClick={() => scrollToSection('products')} className="hover:text-white transition-colors">Products</button></li>
                <li><button onClick={() => scrollToSection('deals')} className="hover:text-white transition-colors">Deals</button></li>
                <li><button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors">About</button></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Categories</h5>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => {setSelectedCategory('smartphones'); scrollToSection('products');}} className="hover:text-white transition-colors">Smartphones</button></li>
                <li><button onClick={() => {setSelectedCategory('laptops'); scrollToSection('products');}} className="hover:text-white transition-colors">Laptops</button></li>
                <li><button onClick={() => {setSelectedCategory('audio'); scrollToSection('products');}} className="hover:text-white transition-colors">Audio</button></li>
                <li><button onClick={() => {setSelectedCategory('tablets'); scrollToSection('products');}} className="hover:text-white transition-colors">Tablets</button></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Contact</h5>
              <ul className="space-y-2 text-gray-400">
                <li>📧 support@techstore.com</li>
                <li>📞 1-800-TECH-STORE</li>
                <li>📍 123 Tech Street, Digital City</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TechStore. All rights reserved. Built with modern web technologies for optimal performance.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showAuthModal && <AuthModal />}

      {selectedProduct && selectedProduct !== "cart" && selectedProduct !== "wishlist" && (
        <ProductDetailModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}

      {selectedProduct === "cart" && (
        <CartSidebar 
          isOpen={true} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}

      {selectedProduct === "wishlist" && (
        <WishlistModal 
          isOpen={true} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
};

export default Index;
