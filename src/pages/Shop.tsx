import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Search, Grid, List, ShoppingCart, X, SlidersHorizontal, Tag, DollarSign, ChevronRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import Slider from 'rc-slider';

const API_BASE_URL = "https://sanitaryshop-backend-2.onrender.com";
const PUBLIC_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImVtYWlsIjoidGJoYXRpYTEyMzQ1NkBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTc1NzkyMjE2MiwiZXhwIjoxNzU4NTI2OTYyfQ.2j3UEdtmkU3fyN2KVeq0aIrAqFxrn8JKGOEB_BwZ8YY";

// --- Animation Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
  exit: { y: -20, opacity: 0 },
};

// --- NEW: Shop Header Component ---
const ShopHeader = () => (
    <div className="relative bg-gray-800 py-20 text-white rounded-b-3xl mb-12 overflow-hidden">
        <div className="absolute inset-0">
            <img src="https://images.pexels.com/photos/7018400/pexels-photo-7018400.jpeg?auto=compress&cs=tinysrgb&w=1920" alt="Shop Background" className="w-full h-full object-cover opacity-20"/>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        </div>
        <div className="relative z-10 text-center max-w-7xl mx-auto px-4">
            <motion.h1 className="text-5xl md:text-6xl font-extrabold" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
                Our Products
            </motion.h1>
            <motion.div className="flex items-center justify-center space-x-2 mt-4 text-gray-300" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight className="h-4 w-4"/>
                <span>Shop</span>
            </motion.div>
        </div>
    </div>
);

// --- Skeleton Component for Loading State ---
const ProductSkeletonCard: React.FC = () => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full">
    <div className="h-64 w-full bg-gray-200 animate-pulse" />
    <div className="p-4 flex flex-col flex-grow">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
      <div className="h-4 bg-gray-200 rounded w-full mt-1 mb-4 animate-pulse" />
      <div className="flex items-center justify-between mt-auto">
        <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse" />
        <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse" />
      </div>
    </div>
  </div>
);

// --- Reusable Product Card Components ---
const ProductCardGrid: React.FC<{ product: any; onAddToCart: (product: any) => void }> = ({ product, onAddToCart }) => (
    <motion.div variants={itemVariants} layout className="bg-white rounded-xl shadow-lg hover:shadow-2xl overflow-hidden group flex flex-col h-full transform transition-all duration-300">
      <Link to={`/product/${product.id}`} className="relative h-64 w-full overflow-hidden block">
        <img src={product.imageUrl || "https://via.placeholder.com/400"} alt={product.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"/>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent flex justify-end transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
            <motion.button 
              onClick={(e) => { e.preventDefault(); onAddToCart(product); }} 
              className="bg-white text-amber-800 p-3 rounded-full shadow-lg hover:bg-amber-800 hover:text-white transition-colors" 
              whileHover={{ scale: 1.1, rotate: 5 }} 
              whileTap={{ scale: 0.9 }}
              aria-label="Add to cart"
            >
                <ShoppingCart className="h-5 w-5" />
            </motion.button>
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-lg font-semibold text-gray-900 truncate">{product.name}</h2>
        <p className="text-gray-600 text-sm mt-1 mb-4 flex-grow">{product.description?.substring(0, 60)}...</p>
        <span className="text-amber-800 text-xl font-bold mt-auto">₹{product.price}</span>
      </div>
    </motion.div>
);
  
const ProductCardList: React.FC<{ product: any; onAddToCart: (product: any) => void }> = ({ product, onAddToCart }) => (
    <motion.div 
        className="bg-white rounded-xl shadow-lg hover:shadow-xl overflow-hidden flex flex-col sm:flex-row w-full transform transition-all duration-300"
        variants={itemVariants}
        layout
    >
        <Link to={`/product/${product.id}`} className="sm:w-1/3 h-48 sm:h-auto bg-gray-100 flex items-center justify-center overflow-hidden">
            <img src={product.imageUrl || "https://via.placeholder.com/400"} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
        </Link>
        <div className="p-6 flex flex-col flex-grow sm:w-2/3">
            <h2 className="text-xl font-bold text-gray-900">{product.name}</h2>
            <p className="text-gray-600 text-sm mt-2 mb-4 flex-grow">{product.description}</p>
            <div className="flex items-center justify-between mt-auto">
                <span className="text-amber-800 text-2xl font-extrabold">₹{product.price}</span>
                <motion.button onClick={() => onAddToCart(product)} className="bg-amber-800 text-white px-6 py-2 rounded-full hover:bg-amber-900 transition-colors flex items-center space-x-2" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <ShoppingCart className="h-5 w-5" />
                    <span>Add to Cart</span>
                </motion.button>
            </div>
        </div>
    </motion.div>
);

// --- Filter Sidebar Component ---
const FilterSidebar: React.FC<{
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  maxPrice: number;
}> = ({ categories, selectedCategory, setSelectedCategory, sortBy, setSortBy, searchTerm, setSearchTerm, priceRange, setPriceRange, maxPrice }) => (
  <div className="space-y-8">
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center"><Search className="h-5 w-5 mr-2 text-amber-800"/> Search</h3>
      <input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-4 pr-4 py-3 border border-gray-200 rounded-full focus:ring-2 focus:ring-amber-500 bg-white"/>
    </div>
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center"><Tag className="h-5 w-5 mr-2 text-amber-800"/> Categories</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => <motion.button key={c} onClick={() => setSelectedCategory(c)} className={`px-4 py-2 text-sm rounded-full border transition-colors ${selectedCategory === c ? 'bg-amber-800 text-white border-amber-800' : 'bg-white text-gray-700 border-gray-300 hover:border-amber-800'}`} whileTap={{ scale: 0.95 }}>{c}</motion.button>)}
      </div>
    </div>
    <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center"><DollarSign className="h-5 w-5 mr-2 text-amber-800"/> Price Range</h3>
        <div className="px-2">
            <Slider
                range
                min={0}
                max={maxPrice}
                defaultValue={[0, maxPrice]}
                value={priceRange}
                onChange={(value) => setPriceRange(value as [number, number])}
                trackStyle={[{ backgroundColor: '#92400e' }]}
                handleStyle={[{ borderColor: '#92400e', backgroundColor: 'white', borderWidth: 2 }, { borderColor: '#92400e', backgroundColor: 'white', borderWidth: 2 }]}
                railStyle={{ backgroundColor: '#e5e7eb', height: 6 }}
                dotStyle={{ display: 'none' }}
                activeDotStyle={{ display: 'none' }}
            />
        </div>
        <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>₹{priceRange[0]}</span>
            <span>₹{maxPrice}</span>
        </div>
    </div>
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Sort By</h3>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-full focus:ring-2 focus:ring-amber-500 bg-white">
        <option value="name">Name</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
      </select>
    </div>
  </div>
);

// --- Main Shop Component ---
const Shop: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
  const maxPrice = useMemo(() => Math.max(...products.map(p => p.price), 50000), [products]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);

  const { dispatch } = useCart();

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products`, { headers: { Authorization: `Bearer ${PUBLIC_TOKEN}` } })
      .then(res => res.json())
      .then(data => {
        const productData = data.products || data;
        const validProducts = Array.isArray(productData) ? productData : [];
        setProducts(validProducts);
        const prices = validProducts.map(p => p.price).filter(p => typeof p === 'number');
        const max = prices.length > 0 ? Math.ceil(Math.max(...prices) / 1000) * 1000 : 50000;
        setPriceRange([0, max]);
      })
      .catch(err => { console.error("Error fetching products:", err); setProducts([]); })
      .finally(() => setLoading(false));
  }, []);

  const handleAddToCart = (product: any) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
    toast.success(`${product.name} added to cart!`);
  };

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category?.name).filter(Boolean)))];

  const filteredProducts = products
    .filter(p => 
        p.name?.toLowerCase().includes(searchTerm.toLowerCase()) && 
        (selectedCategory === "All" || p.category?.name === selectedCategory) &&
        (p.price >= priceRange[0] && p.price <= priceRange[1])
    )
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return a.name?.localeCompare(b.name);
    });

  const clearFilters = () => {
      setSearchTerm("");
      setSelectedCategory("All");
      setPriceRange([0, maxPrice]);
  };

  if (loading) {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {Array.from({ length: 8 }).map((_, i) => <ProductSkeletonCard key={i} />)}
            </div>
        </div>
    );
  }
  
  return (
    <motion.div className="min-h-screen bg-gradient-to-b from-white to-amber-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Toaster position="bottom-right" />
      <ShopHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8 items-start">
          <motion.aside className="hidden lg:block lg:col-span-1 bg-white p-6 rounded-xl shadow-md border sticky top-24" initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <FilterSidebar {...{ categories, selectedCategory, setSelectedCategory, sortBy, setSortBy, searchTerm, setSearchTerm, priceRange, setPriceRange, maxPrice }} />
          </motion.aside>

          <main className="lg:col-span-3">
            <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-md p-4 mb-8 sticky top-24 z-30 border flex items-center justify-between">
                <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden flex items-center space-x-2 text-gray-700 font-semibold p-2 rounded-lg hover:bg-gray-100">
                    <SlidersHorizontal className="h-5 w-5 text-amber-800"/>
                    <span>Filter & Sort</span>
                </button>
                <span className="hidden lg:inline-block text-sm text-gray-600">
                    Showing <b>{filteredProducts.length}</b> products
                </span>
                <div className="flex bg-gray-100 border border-gray-200 rounded-full overflow-hidden">
                    <button onClick={() => setViewMode("grid")} className={`p-2 transition-colors ${viewMode === "grid" ? "bg-amber-800 text-white" : "text-gray-600 hover:bg-gray-200"}`}><Grid className="h-5 w-5" /></button>
                    <button onClick={() => setViewMode("list")} className={`p-2 transition-colors ${viewMode === "list" ? "bg-amber-800 text-white" : "text-gray-600 hover:bg-gray-200"}`}><List className="h-5 w-5" /></button>
                </div>
            </div>

            <AnimatePresence>
                {showFilters && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="lg:hidden bg-white p-6 rounded-xl shadow-md border mb-8 overflow-hidden">
                        <FilterSidebar {...{ categories, selectedCategory, setSelectedCategory, sortBy, setSortBy, searchTerm, setSearchTerm, priceRange, setPriceRange, maxPrice }} />
                    </motion.div>
                )}
            </AnimatePresence>
            
             <AnimatePresence>
                {(searchTerm || selectedCategory !== 'All' || priceRange[0] > 0 || priceRange[1] < maxPrice) && (
                    <motion.div className="flex items-center flex-wrap gap-2 mb-6" initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }}>
                        <h4 className="text-sm font-semibold mr-2">Active Filters:</h4>
                        {searchTerm && <span className="flex items-center gap-1 pl-3 pr-2 py-1 bg-gray-200 text-gray-800 text-sm rounded-full">"{searchTerm}" <button onClick={() => setSearchTerm('')} className="hover:text-red-500"><X className="h-4 w-4"/></button></span>}
                        {selectedCategory !== 'All' && <span className="flex items-center gap-1 pl-3 pr-2 py-1 bg-gray-200 text-gray-800 text-sm rounded-full">{selectedCategory} <button onClick={() => setSelectedCategory('All')} className="hover:text-red-500"><X className="h-4 w-4"/></button></span>}
                        {(priceRange[0] > 0 || priceRange[1] < maxPrice) && <span className="flex items-center gap-1 pl-3 pr-2 py-1 bg-gray-200 text-gray-800 text-sm rounded-full">₹{priceRange[0]} - ₹{priceRange[1]}<button onClick={() => setPriceRange([0, maxPrice])} className="hover:text-red-500"><X className="h-4 w-4"/></button></span>}
                        <button onClick={clearFilters} className="text-sm text-amber-800 hover:underline ml-auto">Clear All</button>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div layout variants={containerVariants} initial="hidden" animate="visible" className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
              <AnimatePresence>
                {filteredProducts.map((product) => viewMode === 'grid' ? <ProductCardGrid key={product.id} product={product} onAddToCart={handleAddToCart} /> : <ProductCardList key={product.id} product={product} onAddToCart={handleAddToCart} />)}
              </AnimatePresence>
            </motion.div>

            <AnimatePresence>
                {filteredProducts.length === 0 && !loading && (
                <motion.div className="text-center py-16 col-span-full" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                    <Search className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900">No products found</h3>
                    <p className="text-gray-600 mt-2">Try adjusting your search or filter criteria.</p>
                    <motion.button onClick={clearFilters} className="mt-6 px-5 py-2 bg-amber-800 text-white rounded-full hover:bg-amber-900 transition-colors flex items-center mx-auto space-x-2" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <X className="h-4 w-4" />
                        <span>Clear All Filters</span>
                    </motion.button>
                </motion.div>
                )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </motion.div>
  );
};

export default Shop;