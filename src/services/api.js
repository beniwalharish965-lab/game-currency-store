import axios from 'axios';

// TODO: Replace with your actual API endpoint
const API_BASE_URL = 'https://your-api-endpoint.com/api';

// Mock data for testing (remove when API is ready)
const MOCK_PRODUCTS = [
  {
    id: '1',
    game_type: 1, // BGMI
    package_name: '60 UC',
    currency_amount: 60,
    price: 75,
    description: 'Perfect for beginners',
    is_active: true
  },
  {
    id: '2',
    game_type: 1, // BGMI
    package_name: '325 UC',
    currency_amount: 325,
    price: 380,
    description: 'Most popular package',
    is_active: true
  },
  {
    id: '3',
    game_type: 1, // BGMI
    package_name: '660 UC',
    currency_amount: 660,
    price: 750,
    description: 'Best value for money',
    is_active: true
  },
  {
    id: '4',
    game_type: 2, // FreeFire
    package_name: '100 Diamonds',
    currency_amount: 100,
    price: 80,
    description: 'Starter pack',
    is_active: true
  },
  {
    id: '5',
    game_type: 2, // FreeFire
    package_name: '310 Diamonds',
    currency_amount: 310,
    price: 250,
    description: 'Popular choice',
    is_active: true
  },
  {
    id: '6',
    game_type: 2, // FreeFire
    package_name: '520 Diamonds',
    currency_amount: 520,
    price: 400,
    description: 'Great deal',
    is_active: true
  }
];

const api = {
  // Get all active products
  getProducts: async () => {
    try {
      // Using mock data for now
      // Uncomment below when API is ready:
      // const response = await axios.get(`${API_BASE_URL}/products`);
      // return response.data;
      
      return MOCK_PRODUCTS;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Create a new order
  createOrder: async (orderData) => {
    try {
      // Uncomment when API is ready:
      // const response = await axios.post(`${API_BASE_URL}/orders`, orderData);
      // return response.data;
      
      // Mock response for testing
      return {
        success: true,
        orderId: 'ORD' + Date.now(),
        message: 'Order placed successfully! (Mock data - configure API in src/services/api.js)'
      };
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  // Track order by game ID
  trackOrder: async (gameId) => {
    try {
      // Uncomment when API is ready:
      // const response = await axios.get(`${API_BASE_URL}/orders/track/${gameId}`);
      // return response.data;
      
      // Mock response for testing
      return {
        orders: [
          {
            id: 'ORD123456',
            product_name: '325 UC',
            quantity: 1,
            total_amount: 380,
            payment_status: 2, // Completed
            order_status: 3, // Fulfilled
            create_time: Date.now() - 86400000 // 1 day ago
          }
        ]
      };
    } catch (error) {
      console.error('Error tracking order:', error);
      throw error;
    }
  }
};

export default api;
