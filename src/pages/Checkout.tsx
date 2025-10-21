import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Truck, Shield, CheckCircle, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { RAZORPAY_CONFIG } from '../config/razorpay';

const Checkout: React.FC = () => {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    paymentMethod: 'razorpay'
  });

  // Redirect if cart is empty
  useEffect(() => {
    if (state.items.length === 0) {
      navigate('/cart');
    }
  }, [state.items.length, navigate]);

  const subtotal = state.total;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      // Check if Razorpay is already loaded
      if ((window as any).Razorpay) {
        resolve(true);
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Create Razorpay order using the correct API approach
  const createRazorpayOrder = async () => {
    try {
      // Use Razorpay's orders API with proper authentication
      const auth = btoa(`${RAZORPAY_CONFIG.key}:${RAZORPAY_CONFIG.keySecret}`);
      
      const response = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${auth}`
        },
        body: JSON.stringify({
          amount: total * 100,
          currency: 'INR',
          receipt: `receipt_${Date.now()}`,
          notes: {
            customer_name: `${formData.firstName} ${formData.lastName}`,
            customer_email: formData.email,
            customer_phone: formData.phone,
            items: state.items.map(item => `${item.name} x${item.quantity}`).join(', ')
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Razorpay API Error:', errorData);
        throw new Error(`Failed to create order: ${errorData.error?.description || 'Unknown error'}`);
      }

      const orderData = await response.json();
      console.log('Order created successfully:', orderData);
      return orderData.id;
    } catch (error) {
      console.error('Order creation failed:', error);
      toast.error('Failed to initialize payment. Please try again.');
      throw error;
    }
  };

  const handleRazorpayPayment = async () => {
    setPaymentLoading(true);
    
    try {
      // Load Razorpay script
      const res = await loadRazorpayScript();
      if (!res) {
        toast.error('Razorpay SDK failed to load');
        setPaymentLoading(false);
        return;
      }

      // Try to create order first, fallback to direct payment if it fails
      let orderId;
      try {
        orderId = await createRazorpayOrder();
      } catch (error: any) {
        console.warn('Order creation failed, using direct payment:', error);
        // Fallback to direct payment without order_id
        orderId = null;
      }
      
      // Create payment options
      const options = {
        key: RAZORPAY_CONFIG.key,
        amount: total * 100, // Amount in paise
        currency: RAZORPAY_CONFIG.currency,
        name: RAZORPAY_CONFIG.name,
        description: RAZORPAY_CONFIG.description,
        image: RAZORPAY_CONFIG.image,
        ...(orderId && { order_id: orderId }), // Only include order_id if we have one
        handler: function (response: any) {
          console.log('Payment successful:', response);
          toast.success('Payment successful!');
          dispatch({ type: 'CLEAR_CART' });
          setStep(4);
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone,
        },
        notes: {
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
        },
        theme: RAZORPAY_CONFIG.theme,
        modal: {
          ondismiss: function() {
            setPaymentLoading(false);
          }
        }
      };

      // Initialize Razorpay
      const razorpay = (window as any).Razorpay;
      if (!razorpay) {
        throw new Error('Razorpay not loaded');
      }

      const paymentObject = new razorpay(options);
      
      // Handle payment events
      paymentObject.on('payment.failed', function (response: any) {
        console.log('Payment failed:', response);
        toast.error(`Payment failed: ${response.error.description || 'Please try again'}`);
        setPaymentLoading(false);
      });

      // Open payment modal
      paymentObject.open();
      
    } catch (error: any) {
      console.error('Payment error:', error);
      toast.error(error.message || 'Payment initialization failed');
      setPaymentLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Process payment
      if (formData.paymentMethod === 'razorpay') {
        await handleRazorpayPayment();
      } else if (formData.paymentMethod === 'cod') {
        // Cash on Delivery
        setLoading(true);
        setTimeout(() => {
          dispatch({ type: 'CLEAR_CART' });
          setStep(4);
          setLoading(false);
        }, 2000);
      }
    }
  };

  if (step === 4) {
    return (
      <motion.div
        className="min-h-screen pt-24 pb-12 bg-gray-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4, type: "spring", stiffness: 200 }}
          >
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your order. We'll send you a confirmation email shortly.
          </p>
          <motion.button
            onClick={() => window.location.href = '/'}
            className="bg-amber-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-900 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Continue Shopping
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-screen pt-24 pb-12 bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <span className="text-amber-800">Checkout</span>
          </h1>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center space-x-4">
            {[
              { number: 1, label: 'Information' },
              { number: 2, label: 'Shipping' },
              { number: 3, label: 'Payment' }
            ].map((stepItem, index) => (
              <div key={stepItem.number} className="flex items-center">
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= stepItem.number
                      ? 'bg-amber-800 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                  animate={{
                    scale: step === stepItem.number ? 1.1 : 1,
                    backgroundColor: step >= stepItem.number ? '#92400e' : '#e5e7eb'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {stepItem.number}
                </motion.div>
                <span className="ml-2 text-sm font-medium text-gray-700">
                  {stepItem.label}
                </span>
                {index < 2 && (
                  <div className="w-8 h-0.5 bg-gray-300 mx-4" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <motion.form
              onSubmit={handleSubmit}
              className="bg-white rounded-lg shadow-sm p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                        required
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                        required
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                        required
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                        required
                      />
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-xl font-semibold mb-6 flex items-center">
                    <Truck className="h-5 w-5 mr-2 text-amber-800" />
                    Shipping Address
                  </h2>
                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                        required
                      />
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                      >
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                          required
                        />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                      >
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Postal Code
                        </label>
                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                          required
                        />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-xl font-semibold mb-6 flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-amber-800" />
                    Payment Method
                  </h2>
                  <div className="space-y-4">
                    <motion.div
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        formData.paymentMethod === 'razorpay'
                          ? 'border-amber-500 bg-amber-50'
                          : 'border-gray-300 hover:border-amber-500'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="razorpay"
                            checked={formData.paymentMethod === 'razorpay'}
                            onChange={handleInputChange}
                            className="mr-3"
                          />
                          <CreditCard className="h-5 w-5 mr-2 text-amber-800" />
                          <div>
                            <span className="font-medium">Razorpay Payment</span>
                            <p className="text-sm text-gray-600">Cards, UPI, Net Banking, Wallets</p>
                          </div>
                        </div>
                        <div className="flex space-x-1">
                          <div className="w-6 h-4 bg-blue-500 rounded text-white text-xs flex items-center justify-center">V</div>
                          <div className="w-6 h-4 bg-red-500 rounded text-white text-xs flex items-center justify-center">M</div>
                          <div className="w-6 h-4 bg-green-500 rounded text-white text-xs flex items-center justify-center">UPI</div>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        formData.paymentMethod === 'cod'
                          ? 'border-amber-500 bg-amber-50'
                          : 'border-gray-300 hover:border-amber-500'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          checked={formData.paymentMethod === 'cod'}
                          onChange={handleInputChange}
                          className="mr-3"
                        />
                        <Truck className="h-5 w-5 mr-2 text-amber-800" />
                        <div>
                          <span className="font-medium">Cash on Delivery</span>
                          <p className="text-sm text-gray-600">Pay when your order arrives</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                  
                  {formData.paymentMethod === 'razorpay' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200"
                    >
                      <div className="flex items-start">
                        <Shield className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-blue-900">Secure Payment</h4>
                          <p className="text-sm text-blue-700">
                            Your payment information is encrypted and secure. We support all major cards, UPI, and digital wallets.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={loading || paymentLoading}
                className={`w-full py-3 rounded-lg font-semibold transition-colors mt-8 flex items-center justify-center space-x-2 ${
                  loading || paymentLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-amber-800 hover:bg-amber-900'
                }`}
                whileHover={!loading && !paymentLoading ? { scale: 1.02 } : {}}
                whileTap={!loading && !paymentLoading ? { scale: 0.98 } : {}}
              >
                {loading || paymentLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>
                      {paymentLoading ? 'Processing Payment...' : 'Processing Order...'}
                    </span>
                  </>
                ) : (
                  <>
                    <span>
                      {step < 3 ? 'Continue' : formData.paymentMethod === 'razorpay' ? 'Pay Now' : 'Place Order'}
                    </span>
                    {step === 3 && <Shield className="h-5 w-5" />}
                  </>
                )}
              </motion.button>
            </motion.form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              className="bg-white rounded-lg shadow-sm p-6 sticky top-24"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                {state.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="truncate mr-2">{item.name} × {item.quantity}</span>
                    <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>₹{tax.toLocaleString()}</span>
                </div>
                <hr />
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                <div className="flex items-center text-amber-800 text-sm">
                  <Shield className="h-4 w-4 mr-2" />
                  <span>Secure checkout protected by SSL encryption</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;