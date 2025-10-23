import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  const { state, dispatch } = useCart();

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeItem = (id: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };
  
  // Total is already adjusted in CartContext
  const grandTotal = state.total;

  if (state.items.length === 0) {
    return (
      <motion.div
        className="min-h-screen pt-32 pb-12 bg-gray-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="text-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="mb-8"
          >
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
          </motion.div>
          <Link to="/shop">
            <motion.button
              className="bg-amber-800 text-white px-8 py-3 rounded-full font-semibold hover:bg-amber-900 transition-colors inline-flex items-center space-x-2 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Continue Shopping</span>
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-screen pt-32 pb-12 bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Shopping <span className="text-amber-800">Cart</span>
          </h1>
          <p className="text-lg text-gray-600">
            Review your items and proceed to checkout.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Cart Items */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md border">
            <AnimatePresence>
              {state.items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50, transition: { duration: 0.3 } }}
                  className="grid grid-cols-12 gap-4 items-center p-6 border-b last:border-b-0"
                >
                  <Link to={`/product/${item.id}`} className="col-span-2">
                    <img
                      src={item.image || item.imageUrl || "https://via.placeholder.com/400"}
                      alt={item.name}
                      className="w-full h-auto object-cover rounded-lg aspect-square"
                    />
                  </Link>
                  
                  <div className="col-span-10 sm:col-span-4">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      {typeof item.category === 'string' ? item.category : item.category?.name || 'General'}
                    </p>
                  </div>

                  <div className="col-span-6 sm:col-span-3 flex items-center justify-start sm:justify-center space-x-2">
                    <motion.button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                      whileTap={{ scale: 0.9 }}
                    >
                      <Minus className="h-4 w-4 text-gray-600" />
                    </motion.button>
                    
                    <span className="w-10 text-center font-semibold">{item.quantity}</span>
                    
                    <motion.button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                      whileTap={{ scale: 0.9 }}
                    >
                      <Plus className="h-4 w-4 text-gray-600" />
                    </motion.button>
                  </div>
                  
                  <div className="col-span-4 sm:col-span-2 text-right">
                      <p className="text-lg font-bold text-gray-900">₹{(Math.round(item.price / 1.18) * item.quantity).toLocaleString()}</p>
                  </div>

                  <div className="col-span-2 sm:col-span-1 flex justify-end">
                    <motion.button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
                      whileTap={{ scale: 0.9 }}
                    >
                      <Trash2 className="h-5 w-5" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              className="bg-white rounded-xl shadow-md p-6 sticky top-24 border"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{state.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-amber-600">Extra as per delivery</span>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  * Shipping costs will be calculated based on delivery partner and items being delivered
                </div>
                <div className="border-t pt-4 mt-4 flex justify-between text-xl font-extrabold text-gray-900">
                  <span>Total</span>
                  <span>₹{grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>

              <Link to="/checkout">
                <motion.button
                  className="w-full bg-amber-800 text-white py-3 rounded-lg font-semibold hover:bg-amber-900 transition-colors mt-6 flex items-center justify-center space-x-2 text-lg"
                  whileHover={{ scale: 1.02, boxShadow: "0 8px 25px rgba(0,0,0,0.1)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Cart;