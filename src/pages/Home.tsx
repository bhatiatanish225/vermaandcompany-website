import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
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
  Star,
  Award,
  Users,
  Clock,
  Zap,
  Heart,
  TrendingUp,
  Gift,
  Bath,
  Home as HomeIcon,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "swiper/css/effect-coverflow";

const API_BASE_URL = "https://sanitaryshop-backend-2.onrender.com";
const PUBLIC_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMsImVtYWlsIjoidGVzdDFAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjEwNTY0MjIsImV4cCI6MTc2MTY2MTIyMn0.P5cwWg3WA7kxgVoo3t7aUXsE22CcnNjq3rSKyuMyQt0";

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

// Enhanced hero slides with more engaging content
const heroSlides = [
  {
    image: "images/5th.jpg",
    alt: "Premium sanitary ware collection",
    title: "Premium Collection",
    subtitle: "Luxury meets functionality"
  },
  {
    image: "images/ddd.jpg",
    alt: "Elegant bathroom fixtures",
    title: "Elegant Fixtures",
    subtitle: "Transform your space"
  },
  {
    image: "images/fouth.jpg",
    alt: "Modern solutions",
    title: "Modern Solutions",
    subtitle: "Innovation at its finest"
  },
  {
    image: "images/second.jpg",
    alt: "Quality sanitary goods",
    title: "Quality Assured",
    subtitle: "Trusted by thousands"
  },
];

// Sanitary products floating animation
const FloatingSanitaryProducts: React.FC = () => {
  const products = [
    { icon: Bath, size: "w-8 h-8", delay: 0 },
    { icon: Droplets, size: "w-6 h-6", delay: 0.05 },
    { icon: Pipe, size: "w-7 h-7", delay: 0.1 },
    { icon: Grid, size: "w-9 h-9", delay: 0.15 },
    { icon: Utensils, size: "w-6 h-6", delay: 0.2 },
    { icon: Wrench, size: "w-8 h-8", delay: 0.25 },
    { icon: Hammer, size: "w-7 h-7", delay: 0.3 },
    { icon: Truck, size: "w-6 h-6", delay: 0.35 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {products.map((product, i) => (
        <motion.div
          key={i}
          className={`absolute ${product.size} text-amber-300/40`}
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
            y: typeof window !== 'undefined' ? window.innerHeight + 100 : 800,
            rotate: 0,
            scale: 0,
          }}
          animate={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            rotate: 360,
            scale: [0, 1, 0.8, 1],
          }}
          transition={{
            duration: 1.5 + Math.random() * 1, // Super fast - 1.5-2.5 seconds
            delay: product.delay * 0.1, // Minimal delay between products
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <product.icon className="w-full h-full" />
        </motion.div>
      ))}
    </div>
  );
};

// Typewriter effect component
const TypewriterText: React.FC<{
  text: string;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}> = ({ text, delay = 0, className = "", onComplete }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      } else if (onComplete) {
        onComplete();
      }
    }, delay + currentIndex * 30); // Super fast typing - 30ms per character

    return () => clearTimeout(timer);
  }, [currentIndex, text, delay, onComplete]);

  return (
    <span className={className}>
      {displayText}
      <motion.span
        className="inline-block w-1 h-8 md:h-16 bg-amber-400 ml-1"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.3, repeat: Infinity }}
      />
    </span>
  );
};

// Enhanced entrance animation component
const EntranceAnimation: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);

  useEffect(() => {
    // Show typewriter almost immediately
    const timer1 = setTimeout(() => setShowTypewriter(true), 200);
    // Show subtitle very quickly after company name
    const timer2 = setTimeout(() => setShowSubtitle(true), 800);
    // Complete entrance animation in 2 seconds
    const timer3 = setTimeout(() => onComplete(), 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      {/* Floating Sanitary Products */}
      <FloatingSanitaryProducts />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Company Logo/Icon */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 300 }}
        >
          <div className="bg-white/20 backdrop-blur-md p-10 md:p-12 rounded-full inline-block border-4 border-white/30 shadow-2xl">
            <HomeIcon className="h-24 w-24 md:h-32 md:w-32 lg:h-40 lg:w-40 text-white" />
          </div>
        </motion.div>

        {/* Company Name with Typewriter */}
        {showTypewriter && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6"
          >
            <h1 className="text-4xl md:text-8xl font-black text-white leading-tight">
              <TypewriterText
                text="VERMA & COMPANY"
                delay={0}
                className="bg-gradient-to-r from-white via-amber-100 to-amber-200 bg-clip-text text-transparent drop-shadow-2xl"
                onComplete={() => { }}
              />
            </h1>
          </motion.div>
        )}

        {/* Subtitle */}
        {showSubtitle && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-xl md:text-3xl text-amber-100 font-light">
              <TypewriterText
                text="Premium Sanitary Solutions Since 1957"
                delay={0}
                className="text-amber-100"
              />
            </p>
          </motion.div>
        )}

        {/* Loading Animation */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <div className="flex justify-center space-x-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-amber-400 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            ))}
          </div>
          <p className="text-amber-200 mt-2 text-sm">Crafting Excellence...</p>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-amber-400/20 to-amber-600/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-amber-300/15 to-amber-500/15 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0]
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />
    </motion.div>
  );
};

// Stats counter component
const StatsCounter: React.FC<{ end: number; label: string; icon: React.ElementType }> = ({ end, label, icon: Icon }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prev => {
        if (prev < end) {
          return prev + Math.ceil(end / 100);
        }
        return end;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <motion.div
      className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Icon className="h-8 w-8 text-amber-300 mx-auto mb-2" />
      <div className="text-3xl font-bold text-white">{count.toLocaleString()}+</div>
      <div className="text-amber-100 text-sm">{label}</div>
    </motion.div>
  );
};

// Enhanced Category Card Component with 3D effects
const CategoryCard: React.FC<{ category: any; index: number }> = ({ category, index }) => {
  const navigate = useNavigate();
  const IconComponent = categoryIcons[category.name as keyof typeof categoryIcons] || Wrench;

  return (
    <motion.div
      onClick={() => navigate(`/categories`)}
      className="relative rounded-2xl p-6 cursor-pointer h-80 flex flex-col justify-end text-white overflow-hidden shadow-2xl group perspective-1000"
      initial={{ opacity: 0, y: 50, rotateX: 45 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        transition: { type: "spring", stiffness: 300 }
      }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      viewport={{ once: true }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${category.image})` }}
        whileHover={{ scale: 1.15 }}
        transition={{ duration: 0.6 }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

      {/* Glassmorphism Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent backdrop-blur-[1px]" />

      {/* Content */}
      <div className="relative z-10 transform group-hover:translate-z-20">
        <motion.div
          className="bg-gradient-to-r from-amber-500/30 to-amber-600/30 backdrop-blur-md p-4 rounded-2xl inline-block mb-4 border border-white/30 shadow-lg"
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
        >
          <IconComponent className="h-8 w-8 text-white drop-shadow-lg" />
        </motion.div>
        <h3 className="text-2xl font-bold mb-2 drop-shadow-lg">{category.name}</h3>
        <p className="text-sm text-gray-200 leading-relaxed">{category.description}</p>

        {/* Hover Arrow */}
        <motion.div
          className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100"
          initial={{ x: -20 }}
          whileHover={{ x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowRight className="h-6 w-6 text-amber-300" />
        </motion.div>
      </div>

      {/* Shine Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-full group-hover:-translate-x-full transition-transform duration-1000" />
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

// Enhanced Product Card with premium design
const ProductCard: React.FC<{ product: any; index: number }> = ({ product, index }) => (
  <motion.div
    className="bg-white rounded-2xl shadow-xl hover:shadow-2xl overflow-hidden group flex flex-col h-full relative border border-gray-100"
    variants={childVariants}
    whileHover={{ y: -8, rotateY: 2 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    {/* Product Badge */}
    <div className="absolute top-4 left-4 z-20">
      <motion.div
        className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: index * 0.1 }}
      >
        <Star className="h-3 w-3 inline mr-1" />
        PREMIUM
      </motion.div>
    </div>

    {/* Image Container */}
    <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      <motion.img
        src={product.imageUrl || "https://via.placeholder.com/400"}
        alt={product.name}
        className="w-full h-full object-cover"
        whileHover={{ scale: 1.15 }}
        transition={{ duration: 0.6 }}
      />

      {/* Overlay with Actions */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-center p-6 opacity-0 group-hover:opacity-100"
        transition={{ duration: 0.3 }}
      >
        <Link to={`/product/${product.id}`}>
          <motion.button
            className="bg-white/90 backdrop-blur-sm text-amber-800 py-3 px-6 rounded-full flex items-center space-x-2 text-sm font-bold shadow-xl border border-white/20"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Eye className="h-4 w-4" />
            <span>Quick View</span>
          </motion.button>
        </Link>
      </motion.div>

      {/* Floating Heart Icon */}
      <motion.div
        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100"
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.2 }}
      >
        <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg cursor-pointer">
          <Heart className="h-4 w-4 text-gray-600 hover:text-red-500 transition-colors" />
        </div>
      </motion.div>
    </div>

    {/* Content */}
    <div className="p-6 flex flex-col flex-grow bg-gradient-to-b from-white to-gray-50/50">
      <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-amber-800 transition-colors">
        {product.name}
      </h2>
      <p className="text-gray-600 text-sm flex-grow mb-4 line-clamp-3 leading-relaxed">
        {product.description}
      </p>

      {/* Price and Rating */}
      <div className="flex items-center justify-between mt-auto">
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-amber-800">₹{Math.round(product.price / 1.18)}</span>
          <div className="flex items-center space-x-1 mt-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-xs text-gray-500 ml-1">(4.8)</span>
          </div>
        </div>

        <motion.button
          className="bg-amber-800 text-white p-2 rounded-full shadow-lg hover:bg-amber-900 transition-colors"
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowRight className="h-4 w-4" />
        </motion.button>
      </div>
    </div>

    {/* Shine Effect */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-full group-hover:-translate-x-full transition-transform duration-1000" />
    </div>
  </motion.div>
);

// --- Page Component ---
const Home: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showEntrance, setShowEntrance] = useState(true);
  const [showMainContent, setShowMainContent] = useState(false);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);

  // Enhanced hero section title with dynamic effects
  const heroSubtitle = "Where Quality Meets Elegance - Your Trusted Partner Since 1957";

  // Handle entrance animation completion
  const handleEntranceComplete = () => {
    setShowEntrance(false);
    setShowMainContent(true); // Show immediately
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryRes, productRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/categories`),
          fetch(`${API_BASE_URL}/api/products`, {
            headers: { Authorization: `Bearer ${PUBLIC_TOKEN}` },
          }),
        ]);
        await categoryRes.json();

        const productData = await productRes.json();

        const productsArray = productData.products || productData;
        setProducts(Array.isArray(productsArray) ? productsArray.slice(0, 8) : []);

      } catch (error) {
        console.error("Error fetching data:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Auto-change hero slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Show entrance animation first
  if (showEntrance) {
    return <EntranceAnimation onComplete={handleEntranceComplete} />;
  }

  // Show loading only if we haven't shown main content yet and still loading
  if (loading && !showMainContent) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-amber-50 to-white">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-amber-800 border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.p
            className="text-xl font-semibold text-amber-800"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Crafting Excellence...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      {showMainContent && (
        <motion.div
          className="bg-white overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Enhanced Hero Section */}
          <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
            {/* Background Slides with Parallax */}
            <motion.div
              className="absolute inset-0 w-full h-full"
              style={{ y: y1 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${heroSlides[currentSlide].image})` }}
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 1.5 }}
                />
              </AnimatePresence>
            </motion.div>

            {/* Floating Sanitary Products */}
            <FloatingSanitaryProducts />

            {/* Dynamic Gradient Overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-amber-900/60"
              animate={{
                background: [
                  "linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 50%, rgba(146,64,14,0.6) 100%)",
                  "linear-gradient(135deg, rgba(146,64,14,0.6) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.7) 100%)"
                ]
              }}
              transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
            />

            {/* Main Content */}
            <motion.div
              className="relative z-10 max-w-6xl mx-auto px-4 text-center"
              style={{ y: y2 }}
            >
              {/* Company Branding */}
              <motion.div className="mb-8">
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <div className="bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-full inline-block border-2 border-white/30 shadow-2xl mb-4">
                    <HomeIcon className="h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 text-amber-300" />
                  </div>
                </motion.div>

                <motion.h1
                  className="text-4xl md:text-7xl font-black text-white mb-2 leading-tight"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-white bg-clip-text text-transparent drop-shadow-2xl">
                    VERMA & COMPANY
                  </span>
                </motion.h1>

                <motion.div
                  className="text-2xl md:text-4xl font-bold text-amber-200 mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  <TypewriterText
                    text="A house of sanitary products"
                    delay={50}
                    className="text-amber-200"
                  />
                </motion.div>

                {/* Enhanced Subtitle */}
                <motion.p
                  className="text-lg md:text-xl text-amber-100 mb-8 max-w-4xl mx-auto font-light leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 2 }}
                >
                  {heroSubtitle}
                </motion.p>
              </motion.div>

              {/* Stats Section */}
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <StatsCounter end={5000} label="Happy Customers" icon={Users} />
                <StatsCounter end={25} label="Years Experience" icon={Award} />
                <StatsCounter end={10000} label="Products Sold" icon={TrendingUp} />
                <StatsCounter end={24} label="Hour Support" icon={Clock} />
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
              >
                <Link to="/shop">
                  <motion.button
                    className="group bg-gradient-to-r from-amber-500 to-amber-600 text-white px-12 py-5 rounded-full text-xl font-bold shadow-2xl border-2 border-amber-400 relative overflow-hidden"
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10 flex items-center space-x-3">
                      <Sparkles className="h-6 w-6" />
                      <span>Explore Collection</span>
                      <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                  </motion.button>
                </Link>

                <Link to="/contact">
                  <motion.button
                    className="bg-white/10 backdrop-blur-md text-white px-10 py-5 rounded-full text-xl font-semibold border-2 border-white/30 hover:bg-white/20 transition-all duration-300 flex items-center space-x-3"
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Gift className="h-6 w-6" />
                    <span>Get Quote</span>
                  </motion.button>
                </Link>
              </motion.div>

              {/* Slide Indicators */}
              <motion.div
                className="flex justify-center space-x-3 mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
              >
                {heroSlides.map((_, index) => (
                  <motion.button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-amber-400 scale-125' : 'bg-white/50'
                      }`}
                    onClick={() => setCurrentSlide(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                <motion.div
                  className="w-1 h-3 bg-white rounded-full mt-2"
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </section>

          {/* Enhanced Categories Section */}
          <section className="py-32 bg-gradient-to-br from-amber-50 via-white to-amber-50/30 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d97706' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }} />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              <motion.div
                className="text-center mb-20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="inline-block bg-gradient-to-r from-amber-100 to-amber-200 px-6 py-2 rounded-full mb-6"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <span className="text-amber-800 font-semibold text-sm uppercase tracking-wide">
                    Our Specialties
                  </span>
                </motion.div>

                <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
                  Discover Our <br />
                  <span className="bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
                    Premium Categories
                  </span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  From sophisticated fixtures to robust essentials, we provide complete solutions
                  that transform every space into a masterpiece of functionality and elegance.
                </p>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                initial="hidden"
                whileInView="visible"
                variants={containerVariants}
                viewport={{ once: true, amount: 0.2 }}
              >
                {categoryDataWithImages.map((category, index) => (
                  <CategoryCard key={index} category={category} index={index} />
                ))}
              </motion.div>

              {/* Decorative Elements */}
              <motion.div
                className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full opacity-20 blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 20, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-amber-300 to-amber-400 rounded-full opacity-15 blur-2xl"
                animate={{
                  scale: [1.2, 1, 1.2],
                  rotate: [360, 180, 0]
                }}
                transition={{ duration: 25, repeat: Infinity }}
              />
            </div>
          </section>

          {/* Enhanced Products Section */}
          <section className="py-32 bg-gradient-to-b from-white via-gray-50/30 to-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                className="text-center mb-20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="inline-flex items-center bg-gradient-to-r from-amber-100 to-amber-200 px-6 py-3 rounded-full mb-6"
                  initial={{ scale: 0, rotate: -10 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Zap className="h-5 w-5 text-amber-700 mr-2" />
                  <span className="text-amber-800 font-bold text-sm uppercase tracking-wide">
                    Bestsellers
                  </span>
                </motion.div>

                <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
                  Premium Products <br />
                  <span className="bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
                    Loved by Thousands
                  </span>
                </h2>
                <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  Discover our top-selling products, meticulously crafted for superior performance,
                  unmatched durability, and timeless elegance that transforms spaces.
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
                  modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
                  effect="coverflow"
                  coverflowEffect={{
                    rotate: 15,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                  }}
                  spaceBetween={30}
                  slidesPerView={1}
                  centeredSlides={true}
                  navigation={{
                    nextEl: '.swiper-button-next-custom',
                    prevEl: '.swiper-button-prev-custom',
                  }}
                  pagination={{
                    clickable: true,
                    el: '.swiper-pagination-custom',
                    dynamicBullets: true
                  }}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                  }}
                  breakpoints={{
                    640: { slidesPerView: 2, effect: 'slide' },
                    768: { slidesPerView: 3, effect: 'slide' },
                    1024: { slidesPerView: 4, effect: 'slide' },
                  }}
                  className="pb-20"
                >
                  {products.map((product, index) => (
                    <SwiperSlide key={product.id || index} className="h-full">
                      <ProductCard product={product} index={index} />
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Enhanced Navigation Buttons */}
                <motion.div
                  className="swiper-button-prev-custom absolute top-1/2 -translate-y-1/2 -left-6 md:-left-20 z-10 cursor-pointer group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-2xl rounded-full w-16 h-16 flex items-center justify-center hover:from-amber-700 hover:to-amber-800 transition-all duration-300 border-4 border-white">
                    <ChevronLeft className="h-8 w-8 group-hover:-translate-x-1 transition-transform" />
                  </div>
                </motion.div>

                <motion.div
                  className="swiper-button-next-custom absolute top-1/2 -translate-y-1/2 -right-6 md:-right-20 z-10 cursor-pointer group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-2xl rounded-full w-16 h-16 flex items-center justify-center hover:from-amber-700 hover:to-amber-800 transition-all duration-300 border-4 border-white">
                    <ChevronRight className="h-8 w-8 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>

                <div className="swiper-pagination-custom text-center mt-12"></div>
              </motion.div>

              <motion.div
                className="text-center mt-20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Link to="/shop">
                  <motion.button
                    className="group relative bg-gradient-to-r from-amber-700 to-amber-800 text-white px-12 py-5 rounded-full text-xl font-bold shadow-2xl border-2 border-amber-600 overflow-hidden"
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10 flex items-center space-x-3">
                      <Eye className="h-6 w-6" />
                      <span>Explore All Products</span>
                      <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-800 to-amber-900 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </section>

          {/* Enhanced Why Choose Us Section */}
          <section className="py-32 bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
              }} />
            </div>

            {/* Floating Orbs */}
            <motion.div
              className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-amber-400/20 to-amber-600/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                x: [0, 50, 0],
                y: [0, -30, 0]
              }}
              transition={{ duration: 15, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-20 right-20 w-60 h-60 bg-gradient-to-br from-amber-300/15 to-amber-500/15 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                x: [0, -40, 0],
                y: [0, 40, 0]
              }}
              transition={{ duration: 20, repeat: Infinity }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              <motion.div
                className="text-center mb-20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="inline-flex items-center bg-white/10 backdrop-blur-md px-6 py-3 rounded-full mb-6 border border-white/20"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Award className="h-5 w-5 text-amber-300 mr-2" />
                  <span className="text-amber-100 font-semibold text-sm uppercase tracking-wide">
                    Why Choose Us
                  </span>
                </motion.div>

                <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                  Experience the <br />
                  <span className="text-amber-300">Verma Difference</span>
                </h2>
                <p className="text-xl text-amber-100 max-w-4xl mx-auto leading-relaxed">
                  Our unwavering commitment to excellence ensures you receive nothing but the finest
                  in quality, innovative design, and exceptional service that exceeds expectations.
                </p>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
                initial="hidden"
                whileInView="visible"
                variants={containerVariants}
                viewport={{ once: true, amount: 0.3 }}
              >
                {[
                  {
                    icon: ShieldCheck,
                    title: "Unmatched Quality",
                    desc: "Every product undergoes rigorous testing and quality assurance to meet the highest standards of durability and performance.",
                    color: "from-green-400 to-green-600"
                  },
                  {
                    icon: Sparkles,
                    title: "Exquisite Design",
                    desc: "Our curated collections seamlessly blend contemporary aesthetics with timeless elegance for sophisticated spaces.",
                    color: "from-purple-400 to-purple-600"
                  },
                  {
                    icon: Truck,
                    title: "Seamless Service",
                    desc: "From expert consultations to prompt delivery and installation support, we ensure a completely hassle-free experience.",
                    color: "from-blue-400 to-blue-600"
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    className="group relative bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/20 hover:bg-white/15 transition-all duration-500 flex flex-col items-center text-center overflow-hidden"
                    variants={childVariants}
                    whileHover={{ y: -10, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {/* Icon with Gradient Background */}
                    <motion.div
                      className={`bg-gradient-to-br ${item.color} p-6 rounded-2xl inline-block mb-6 shadow-xl relative z-10`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <item.icon className="h-12 w-12 text-white" />
                    </motion.div>

                    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-amber-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-amber-100 text-base leading-relaxed">
                      {item.desc}
                    </p>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                    {/* Number Badge */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-amber-500/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-amber-400/30">
                      <span className="text-amber-300 font-bold text-sm">{index + 1}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Call to Action */}
              <motion.div
                className="text-center mt-20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <Link to="/about">
                  <motion.button
                    className="group bg-white text-amber-800 px-10 py-4 rounded-full text-lg font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 inline-flex items-center space-x-3 border-2 border-white/20 hover:border-white/40"
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Learn More About Us</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </section>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Home;