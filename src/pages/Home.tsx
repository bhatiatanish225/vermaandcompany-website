import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ArrowRight, Star, Users, Award, Clock, Wrench, Hammer, Grid, Utensils, Droplets, Pipette as Pipe } from "lucide-react";
import { Link } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const API_BASE_URL = "https://sanitaryshop-backend-2.onrender.com";

// 🚀 Hardcoded bypass token
const PUBLIC_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImVtYWlsIjoidGJoYXRpYTEyMzQ1NkBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTc1NzkyMjE2MiwiZXhwIjoxNzU4NTI2OTYyfQ.2j3UEdtmkU3fyN2KVeq0aIrAqFxrn8JKGOEB_BwZ8YY";

const categoryIcons = {
  "Pipes & Fittings": Pipe,
  "Bathroom Accessories": Droplets,
  "Tiles": Grid,
  "Water Tanks": Droplets,
  "Tools": Hammer,
  "Kitchen": Utensils,
};

// Inline CategoryCard
const CategoryCard: React.FC<{
  title: string;
  description: string;
  icon: React.ElementType;
  image?: string;
  index: number;
  onClick?: () => void;
}> = ({ title, description, icon: Icon, image, index, onClick }) => (
  <motion.div
    className="bg-white rounded-lg shadow-md p-6 cursor-pointer flex flex-col items-center text-center"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    viewport={{ once: true }}
    onClick={onClick}
  >
    <div className="bg-amber-100 p-4 rounded-full mb-4">
      <Icon className="h-8 w-8 text-amber-800" />
    </div>
    <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
    {image && <img src={image} alt={title} className="mt-4 h-24 object-contain" />}
  </motion.div>
);

// Inline ProductCard
const ProductCard: React.FC<{ product: any; index: number }> = ({ product, index }) => (
  <motion.div
    className="bg-white rounded-lg shadow-md p-4 flex flex-col"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    viewport={{ once: true }}
  >
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
  </motion.div>
);

const Home: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoryRes = await fetch(`${API_BASE_URL}/api/categories`);
        const categoryData = await categoryRes.json();
        setCategories(Array.isArray(categoryData) ? categoryData.slice(0, 6) : []);

        // Fetch products with JWT
        const productRes = await fetch(`${API_BASE_URL}/api/products`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${PUBLIC_TOKEN}`,
          },
        });
        const productData = await productRes.json();
        setProducts(Array.isArray(productData.products) ? productData.products.slice(0, 6) : []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-white overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <img
            src="https://images.pexels.com/photos/6197114/pexels-photo-6197114.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="text-amber-800">Verma & Company</span>
              <br />
              <span className="text-3xl md:text-4xl text-gray-700">
                Your Sanitary Solutions Partner
              </span>
            </h1>
            <motion.p
              className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Quality plumbing supplies, bathroom accessories, and sanitary
              solutions for homes and businesses. Trusted by professionals for
              over two decades.
            </motion.p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link to="/shop">
              <motion.button
                className="bg-amber-800 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-amber-900 transition-colors flex items-center space-x-2"
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Shop Now</span>
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            </Link>
            <Link to="/categories">
              <motion.button
                className="border-2 border-amber-800 text-amber-800 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-amber-800 hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Browse Categories
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              { icon: Users, value: "5000+", label: "Happy Customers" },
              { icon: Award, value: "20+", label: "Years Experience" },
              { icon: Star, value: "4.9", label: "Customer Rating" },
              { icon: Clock, value: "24/7", label: "Support" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-lg shadow-md"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <stat.icon className="h-8 w-8 text-amber-800 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-amber-800">Categories</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our comprehensive range of sanitary and plumbing solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => {
              const IconComponent =
                categoryIcons[category.name as keyof typeof categoryIcons] || Wrench;
              return (
                <CategoryCard
                  key={category.id || index}
                  title={category.name}
                  description={category.description}
                  icon={IconComponent}
                  image={category.image_url}
                  index={index}
                  onClick={() => (window.location.href = "/categories")}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products Carousel */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured <span className="text-amber-800">Products</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our most popular and high-quality products
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              className="pb-12"
            >
              {products.map((product, index) => (
                <SwiperSlide key={product.id || product._id || index}>
                  <ProductCard product={product} index={index} />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link to="/shop">
              <motion.button
                className="bg-amber-800 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-amber-900 transition-colors inline-flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>View All Products</span>
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
