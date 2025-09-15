import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-amber-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="col-span-1"
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-white p-2 rounded-full">
                <Wrench className="h-6 w-6 text-amber-800" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Verma & Company</h3>
                <p className="text-sm text-amber-200">Sanitary Solutions</p>
              </div>
            </div>
            <p className="text-amber-200 text-sm">
              Your trusted partner for all sanitary and plumbing needs. Quality products, professional service.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-amber-200">
              <li><a href="/shop" className="hover:text-white transition-colors">Shop</a></li>
              <li><a href="/categories" className="hover:text-white transition-colors">Categories</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-amber-200">
              <li><a href="/categories" className="hover:text-white transition-colors">Pipes & Fittings</a></li>
              <li><a href="/categories" className="hover:text-white transition-colors">Bathroom Accessories</a></li>
              <li><a href="/categories" className="hover:text-white transition-colors">Tiles</a></li>
              <li><a href="/categories" className="hover:text-white transition-colors">Water Tanks</a></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3 text-amber-200">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+91 9872117945</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm">support@vermaandcompany18c.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Scf-9 Sector -18 C, Chandigarh</span>
              </div>
            </div>
            <div className="flex space-x-4 mt-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="text-amber-200 hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="text-amber-200 hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="text-amber-200 hover:text-white transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-amber-800 mt-8 pt-8 text-center text-amber-200"
        >
          <p>&copy; 2025 Verma & Company. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;