import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface CategoryCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
  index?: number;
  onClick?: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  image, 
  index = 0,
  onClick 
}) => {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ scale: 1.05, y: -5 }}
      viewport={{ once: true }}
      onClick={onClick}
    >
      <div className="relative h-64 overflow-hidden">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 0.9 }}
          transition={{ duration: 0.3 }}
        />
      </div>
      
      <motion.div
        className="absolute inset-0 flex flex-col justify-end p-6 text-white"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
      >
        <motion.div
          className="flex items-center space-x-3 mb-2"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div className="bg-amber-600 p-2 rounded-full">
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="text-xl font-bold">{title}</h3>
        </motion.div>
        
        <motion.p
          className="text-gray-200 text-sm opacity-90 group-hover:opacity-100 transition-opacity"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
        >
          {description}
        </motion.p>
        
        <motion.div
          className="mt-3 flex items-center text-amber-300 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        >
          <span>Explore Products →</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default CategoryCard;