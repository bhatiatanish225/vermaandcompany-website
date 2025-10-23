import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X } from 'lucide-react';
import logo from '../assets/vermalogo.jpg'; // Ensure this path is correct
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { state } = useCart();
  const location = useLocation();

  // Effect to handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Effect to close mobile menu on route change
  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [location.pathname]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Categories', path: '/categories' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const totalCartItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    // The main nav container is a transparent, full-width fixed element
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      {/* STYLE: This is the visible navbar. It becomes a floating pill on desktop. */}
      <div
        className={`
          flex items-center justify-between
          transition-all duration-300 ease-in-out
          w-full md:w-auto md:mx-auto
          ${scrolled 
            ? 'mt-0 md:mt-2 bg-white/95 shadow-lg md:rounded-full' 
            : 'mt-0 md:mt-4 bg-white/80 md:rounded-full shadow-md'
          }
          px-4 sm:px-6 py-3
          md:px-4 md:py-3
          backdrop-blur-lg border-b md:border border-gray-200/80
        `}
      >
        <Link to="/" className="flex items-center space-x-3 shrink-0">
          <motion.img 
            src={logo} 
            alt="Verma & Company Logo" 
            className="h-14 w-auto md:h-16 lg:h-18 rounded-lg shadow-md" 
            whileHover={{ rotate: 5, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <div className="hidden sm:block">
            <motion.div 
              className="text-amber-800 font-bold text-lg md:text-xl"
              whileHover={{ scale: 1.05 }}
            >
              VERMA & COMPANY
            </motion.div>
            <div className="text-amber-600 text-xs md:text-sm font-medium">
              Premium Sanitary Solutions
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`
                px-4 py-2 text-sm font-medium rounded-full
                transition-all duration-200
                relative
                ${location.pathname === item.path
                  ? 'text-amber-900'
                  : 'text-gray-600 hover:text-amber-800'
                }
              `}
            >
              {location.pathname === item.path && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-amber-100 rounded-full z-0"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.name}</span>
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <Link to="/cart">
            <motion.div
              className="relative p-2 text-gray-700 hover:text-amber-800"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart className="h-6 w-6" />
              <AnimatePresence>
                {totalCartItems > 0 && (
                  <motion.span
                    className="absolute -top-1 -right-1 bg-amber-800 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                    initial={{ scale: 0, y: -10 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  >
                    {totalCartItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </Link>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-700 hover:text-amber-800"
              whileTap={{ scale: 0.85 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                    key={isOpen ? 'x' : 'menu'}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden bg-white/95 backdrop-blur-lg shadow-lg border-t"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-2 pt-2 pb-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors
                    ${location.pathname === item.path
                      ? 'text-amber-800 bg-amber-100'
                      : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;