import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CategoryCard from "../components/CategoryCard";
import { Pipette as Pipe, Droplets, Grid, Hammer, Utensils, Wrench } from "lucide-react";

const API_BASE_URL = "https://sanitaryshop-backend-2.onrender.com";

const categoryIcons = {
  "Pipes & Fittings": Pipe,
  "Bathroom Accessories": Droplets,
  "Tiles": Grid,
  "Water Tanks": Droplets,
  "Tools": Hammer,
  "Kitchen": Utensils,
};

const Categories: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setLoading(false);
      });
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    navigate("/shop", { state: { selectedCategory: categoryName } });
  };

  if (loading) {
    return <div className="text-center mt-20">Loading categories...</div>;
  }

  return (
    <motion.div
      className="min-h-screen pt-24 pb-12 bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Product <span className="text-amber-800">Categories</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive range of sanitary and plumbing solutions,
            organized by category for easy browsing
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const IconComponent =
              categoryIcons[category.name as keyof typeof categoryIcons] || Wrench;
            return (
              <CategoryCard
                key={category.id}
                title={category.name} // backend sends "name"
                description={category.description}
                icon={IconComponent}
                image={category.image_url} // backend sends "image_url"
                index={index}
                onClick={() => handleCategoryClick(category.name)}
              />
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          className="bg-gradient-to-r from-amber-800 to-amber-900 rounded-2xl p-8 md:p-12 text-center text-white mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">
            Need Help Finding the Right Product?
          </h2>
          <p className="text-amber-100 mb-6 max-w-2xl mx-auto">
            Our expert team is here to help you choose the perfect products for your
            project. Get professional advice and recommendations.
          </p>
          <motion.button
            onClick={() => navigate("/contact")}
            className="bg-white text-amber-800 px-8 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Our Experts
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Categories;
