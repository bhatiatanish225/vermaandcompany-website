import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Grid, List } from "lucide-react";

const API_BASE_URL = "https://sanitaryshop-backend-2.onrender.com";

// 🚀 Hardcoded bypass token (replace with your valid JWT)
const PUBLIC_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImVtYWlsIjoidGJoYXRpYTEyMzQ1NkBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTc1NzkyMjE2MiwiZXhwIjoxNzU4NTI2OTYyfQ.2j3UEdtmkU3fyN2KVeq0aIrAqFxrn8JKGOEB_BwZ8YY";

const Shop: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${PUBLIC_TOKEN}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("Products API response:", data);
        if (Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          console.error("Unexpected API response:", data);
          setProducts([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setProducts([]);
        setLoading(false);
      });
  }, []);

  // Extract categories dynamically
  const categories = [
    "All",
    ...Array.from(
      new Set(
        products
          .map((product) => product.category?.name)
          .filter((name): name is string => Boolean(name))
      )
    ),
  ];

  // Filter + sort products
  const filteredProducts = products
    .filter(
      (product) =>
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === "All" ||
          product.category?.name === selectedCategory)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return (a.price || 0) - (b.price || 0);
        case "price-high":
          return (b.price || 0) - (a.price || 0);
        case "name":
        default:
          return a.name?.localeCompare(b.name) ?? 0;
      }
    });

  if (loading) {
    return <div className="text-center mt-20">Loading products...</div>;
  }

  // ✅ ProductCard component defined inside same file
  const ProductCard: React.FC<{ product: any }> = ({ product }) => {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col">
        <div className="h-48 w-full mb-4 bg-gray-100 flex items-center justify-center">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="max-h-full max-w-full object-contain"
            />
          ) : (
            <span className="text-gray-400">No Image</span>
          )}
        </div>
        <h2 className="text-lg font-semibold text-gray-900">{product.name}</h2>
        <p className="text-gray-600 text-sm flex-1">{product.description}</p>
        {product.price !== undefined && (
          <span className="text-amber-800 font-bold mt-2">₹{product.price}</span>
        )}
      </div>
    );
  };

  return (
    <motion.div
      className="min-h-screen pt-24 pb-12 bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-amber-800">Products</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our collection of high-quality sanitary and plumbing products
          </p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          className="bg-white rounded-lg shadow-sm p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>

              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${
                    viewMode === "grid"
                      ? "bg-amber-800 text-white"
                      : "bg-white text-gray-600"
                  }`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${
                    viewMode === "list"
                      ? "bg-amber-800 text-white"
                      : "bg-white text-gray-600"
                  }`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <span className="text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
            </span>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                {selectedCategory !== "All" && `Category: ${selectedCategory}`}
                {searchTerm && ` • Search: "${searchTerm}"`}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Products Grid/List */}
        <motion.div
          className={`grid gap-6 ${
            viewMode === "grid"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id || product._id || index} product={product} />
          ))}
        </motion.div>

        {/* No products found */}
        {filteredProducts.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or browse our categories
            </p>
            <motion.button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              className="mt-4 px-6 py-2 bg-amber-800 text-white rounded-lg hover:bg-amber-900 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Clear Filters
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Shop;
