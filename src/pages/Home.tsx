import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import {
  ArrowRight,
  Wrench,
  Hammer,
  Grid,
  Utensils,
  Droplets,
  Pipette as Pipe,
  ShieldCheck,
  Sparkles,
  Truck,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const API_BASE_URL = "https://sanitaryshop-backend-2.onrender.com";
const PUBLIC_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImVtYWlsIjoidGJoYXRpYTEyMzQ1NkBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTc1NzkyMjE2MiwiZXhwIjoxNzU4NTI2OTYyfQ.2j3UEdtmkU3fyN2KVeq0aIrAqFxrn8JKGOEB_BwZ8YY";

// --- Data & Mappings ---

const categoryIcons = {
  "Pipes & Fittings": Pipe,
  "Bathroom Accessories": Droplets,
  "Tiles": Grid,
  "Water Tanks": Droplets,
  "Tools": Hammer,
  "Kitchen": Utensils,
};

const categoryDataWithImages = [
    { name: "Pipes & Fittings", description: "Durable pipes and reliable fittings for all plumbing needs.", image: "https://images.pexels.com/photos/808925/pexels-photo-808925.jpeg?auto=compress&cs=tinysrgb&w=1260" },
    { name: "Bathroom Accessories", description: "Elegant and functional accessories to complete your bathroom.", image: "https://images.pexels.com/photos/6489099/pexels-photo-6489099.jpeg?auto=compress&cs=tinysrgb&w=1260" },
    { name: "Tiles", description: "A wide range of stylish and durable tiles for floors and walls.", image: "https://images.pexels.com/photos/17693451/pexels-photo-17693451/free-photo-of-modern-bright-bathroom-interior.jpeg?auto=compress&cs=tinysrgb&w=1260" },
    { name: "Water Tanks", description: "High-capacity, safe, and long-lasting water storage solutions.", image: "https://images.pexels.com/photos/847402/pexels-photo-847402.jpeg?auto=compress&cs=tinysrgb&w=1260" },
    { name: "Tools", description: "Professional-grade tools for plumbing and installation tasks.", image: "https://images.pexels.com/photos/175039/pexels-photo-175039.jpeg?auto=compress&cs=tinysrgb&w=1260" },
    { name: "Kitchen", description: "Modern sinks, faucets, and essentials for your kitchen.", image: "https://images.pexels.com/photos/7018400/pexels-photo-7018400.jpeg?auto=compress&cs=tinysrgb&w=1260" },
];


const heroSlides = [
  { image: "https://images.pexels.com/photos/6585627/pexels-photo-6585627.jpeg?auto=compress&cs=tinysrgb&w=1920", alt: "Close-up of a minimalist stainless steel faucet." },
  { image: "https://images.pexels.com/photos/7238202/pexels-photo-7238202.jpeg?auto=compress&cs=tinysrgb&w=1920", alt: "A sleek, modern white ceramic washbasin with a chrome faucet." },
  { image: "https://images.pexels.com/photos/7192461/pexels-photo-7192461.jpeg?auto=compress&cs=tinysrgb&w=1920", alt: "A wall-mounted, contemporary toilet in a brightly lit bathroom." },
  { image: "https://images.pexels.com/photos/8134913/pexels-photo-8134913.jpeg?auto=compress&cs=tinysrgb&w=1920", alt: "Luxurious chrome shower head with water flowing in a modern shower." },
];

// --- Category Card Component ---
const CategoryCard: React.FC<{ category: any; index: number }> = ({ category, index }) => {
  const navigate = useNavigate();
  const IconComponent = categoryIcons[category.name as keyof typeof categoryIcons] || Wrench;
  return (
    <motion.div
      onClick={() => navigate(`/categories`)}
      className="relative rounded-xl p-6 cursor-pointer h-64 flex flex-col justify-end text-white overflow-hidden shadow-lg group"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 300 } }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${category.image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="relative z-10">
        <div className="bg-amber-500/20 backdrop-blur-sm p-3 rounded-full inline-block mb-3 border border-white/20">
          <IconComponent className="h-7 w-7 text-white" />
        </div>
        <h3 className="text-2xl font-bold mb-1">{category.name}</h3>
        <p className="text-sm text-gray-200">{category.description}</p>
      </div>
    </motion.div>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
  }),
};

const childVariants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      damping: 12,
      stiffness: 100,
    },
  },
  hidden: {
    opacity: 0,
    y: 20,
    transition: {
      damping: 12,
      stiffness: 100,
    },
  },
};

const ProductCard: React.FC<{ product: any; index: number }> = ({ product, index }) => (
    <motion.div
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl overflow-hidden group flex flex-col h-full transform hover:-translate-y-2 transition-all duration-300 relative"
      variants={childVariants}
    >
        <div className="relative h-64 w-full overflow-hidden">
        <img
            src={product.imageUrl || "https://via.placeholder.com/400"}
            alt={product.name}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Link to={`/product/${product.id}`} className="bg-white text-amber-800 py-3 px-6 rounded-full flex items-center space-x-2 text-lg font-semibold transform hover:scale-105 transition-all shadow-md">
                <Eye className="h-5 w-5" />
                <span>View Details</span>
            </Link>
        </div>
        </div>
        <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-xl font-semibold text-gray-900 truncate mb-1">{product.name}</h2>
        <p className="text-gray-600 text-sm flex-grow mb-3">{product.description.substring(0, 70)}...</p>
        <span className="text-amber-800 text-2xl font-bold mt-auto">₹{product.price}</span>
        </div>
    </motion.div>
);

// --- Page Component ---
const Home: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const heroTitle = "Verma & Company: Precision, Style, Durability".split(" ");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryRes, productRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/categories`),
          fetch(`${API_BASE_URL}/api/products`, {
            headers: { Authorization: `Bearer ${PUBLIC_TOKEN}` },
          }),
        ]);
        const categoryData = await categoryRes.json();
        setCategories(Array.isArray(categoryData) ? categoryData.slice(0, 6) : []);
        
        const productData = await productRes.json();
        
        const productsArray = productData.products || productData;
        setProducts(Array.isArray(productsArray) ? productsArray.slice(0, 8) : []);

      } catch (error) {
        console.error("Error fetching data:", error);
        setProducts([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl font-semibold text-amber-800 animate-pulse">
        Loading...
      </div>
    );
  }

  return (
    <motion.div
      className="bg-white"
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
    >
      <section className="relative h-screen flex items-center justify-center text-white">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop={true}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          speed={1000}
          className="absolute inset-0 w-full h-full"
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="absolute inset-0 bg-black/60"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.h1
            className="text-4xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg flex flex-wrap justify-center items-center gap-x-2 md:gap-x-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {heroTitle.map((word, index) => (
              <motion.span
                key={index}
                variants={childVariants}
                className={`inline-block ${index < 2 ? 'text-amber-300' : ''}`}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-100 mb-10 max-w-3xl mx-auto drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Elevating your spaces with exquisitely designed sanitaryware and plumbing essentials since 2000.
          </motion.p>
          {/* FIX: Added 'items-center' to ensure the button is centered on all screen sizes */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Link to="/shop">
              <motion.button
                className="bg-amber-600 text-white px-10 py-4 rounded-full text-xl font-bold hover:bg-amber-700 transition-all duration-300 w-full sm:w-auto flex items-center justify-center space-x-3 shadow-xl hover:shadow-2xl"
                whileHover={{ scale: 1.08, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Discover Our Collection</span>
                <ArrowRight className="h-6 w-6" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
      
      <section className="py-24 bg-amber-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Explore Our <span className="text-amber-800">Expertise</span>
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              From sophisticated fixtures to robust essentials, we provide complete solutions for every space.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryDataWithImages.map((category, index) => (
              <CategoryCard key={index} category={category} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Our <span className="text-amber-800">Popular Products</span>
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Discover our top-selling products, crafted for superior performance and elegance.
            </p>
          </motion.div>

          <motion.div
            className="relative"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, amount: 0.2 }}
          >
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation={{
                nextEl: '.swiper-button-next-custom',
                prevEl: '.swiper-button-prev-custom',
              }}
              pagination={{ clickable: true, el: '.swiper-pagination-custom' }}
              autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              className="pb-16"
            >
              {products.map((product, index) => (
                <SwiperSlide key={product.id || index} className="h-full">
                  <ProductCard product={product} index={index} />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="swiper-button-prev-custom absolute top-1/2 -translate-y-1/2 -left-4 md:-left-16 z-10 cursor-pointer bg-amber-800 text-white shadow-xl rounded-full w-14 h-14 flex items-center justify-center hover:bg-amber-900 transition-all duration-300 transform hover:scale-110">
                <ChevronLeft className="h-7 w-7" />
            </div>
            <div className="swiper-button-next-custom absolute top-1/2 -translate-y-1/2 -right-4 md:-right-16 z-10 cursor-pointer bg-amber-800 text-white shadow-xl rounded-full w-14 h-14 flex items-center justify-center hover:bg-amber-900 transition-all duration-300 transform hover:scale-110">
                <ChevronRight className="h-7 w-7" />
            </div>
            <div className="swiper-pagination-custom text-center mt-8 relative bottom-0"></div>
          </motion.div>

          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link to="/shop">
              <motion.button
                className="bg-amber-800 text-white px-10 py-4 rounded-full text-xl font-semibold hover:bg-amber-900 transition-colors inline-flex items-center space-x-3 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>View All Products</span>
                <ArrowRight className="h-6 w-6" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-amber-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
                Why Choose <span className="text-amber-300">Verma & Company?</span>
              </h2>
              <p className="text-lg text-amber-100 max-w-3xl mx-auto">
                Our commitment ensures you receive nothing but the best in quality, design, and service.
              </p>
            </motion.div>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center"
              initial="hidden"
              whileInView="visible"
              variants={containerVariants}
              viewport={{ once: true, amount: 0.3 }}
            >
              {[
                { icon: ShieldCheck, title: "Unmatched Quality", desc: "Our products undergo rigorous testing to meet the highest standards of durability." },
                { icon: Sparkles, title: "Exquisite Design", desc: "Our collections blend contemporary aesthetics with timeless elegance." },
                { icon: Truck, title: "Seamless Service", desc: "From expert consultations to prompt delivery, we ensure a hassle-free experience." },
              ].map((item) => (
                <motion.div 
                  key={item.title}
                  className="bg-white/10 p-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-3 transition-all duration-300 flex flex-col items-center"
                  variants={childVariants}
                >
                  <div className="bg-amber-600 p-5 rounded-full inline-block mb-6 shadow-md">
                    <item.icon className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-amber-100 text-base">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;