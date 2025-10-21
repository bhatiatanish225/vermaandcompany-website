// Razorpay Configuration
export const RAZORPAY_CONFIG = {
  key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_live_VNKFXTowhN6IeN', // Live Razorpay key
  keySecret: import.meta.env.VITE_RAZORPAY_KEY_SECRET || 'F2BpvOlfq0EXG12pZu9MSUPd', // Keep this secure - only use on backend
  currency: 'INR',
  name: 'Verma & Company',
  description: 'Sanitary Products Order',
  image: '/vermalogo.jpg',
  theme: {
    color: '#92400e'
  }
};

// ⚠️ SECURITY WARNING ⚠️
// The keySecret should NEVER be exposed in frontend code!
// For production, you should:
// 1. Move keySecret to backend environment variables
// 2. Use backend API to create orders and handle payments
// 3. Implement webhook verification for payment confirmation
// 4. Store orders in database with proper status tracking
// 5. Use environment variables for all sensitive data

// Current setup is for demo purposes only!
// In production, create orders on your backend server.
