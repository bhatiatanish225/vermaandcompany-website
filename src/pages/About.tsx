import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Clock, Star, Heart, Target } from 'lucide-react';

const About: React.FC = () => {
  const milestones = [
    { year: '2003', title: 'Company Founded', description: 'Started as a small family business' },
    { year: '2008', title: 'First Expansion', description: 'Opened second location and expanded product range' },
    { year: '2015', title: 'Digital Transformation', description: 'Launched online platform and e-commerce' },
    { year: '2020', title: 'Major Growth', description: 'Reached 5000+ satisfied customers milestone' },
    { year: '2024', title: 'Innovation Focus', description: 'Embracing smart home and eco-friendly solutions' }
  ];

  const values = [
    {
      icon: Star,
      title: 'Quality First',
      description: 'We never compromise on the quality of our products and services.'
    },
    {
      icon: Heart,
      title: 'Customer Care',
      description: 'Your satisfaction is our top priority in everything we do.'
    },
    {
      icon: Target,
      title: 'Innovation',
      description: 'Constantly evolving to bring you the latest solutions.'
    }
  ];

  return (
    <motion.div
      className="min-h-screen pt-24 pb-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-amber-800">Verma & Company</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              For over two decades, we've been the trusted partner for all sanitary and plumbing needs, 
              serving homes and businesses with quality products and exceptional service.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: Users, value: "5000+", label: "Happy Customers" },
              { icon: Award, value: "20+", label: "Years Experience" },
              { icon: Clock, value: "24/7", label: "Support Available" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center p-6 bg-white rounded-xl shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <stat.icon className="h-12 w-12 text-amber-800 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
   

      {/* Timeline */}
     

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="text-center p-8 bg-gradient-to-br from-amber-50 to-white rounded-xl shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <value.icon className="h-12 w-12 text-amber-800 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
  
    </motion.div>
  );
};

export default About;