# 🎮 Game Currency Store - Mobile App

A complete mobile application for selling BGMI UC and Free Fire Diamonds with integrated order management and UPI payment tracking.

## ✨ Features

- 📱 **Product Catalog** - Browse BGMI & Free Fire currency packages
- 🛒 **Order Management** - Complete order form with validation
- 💳 **UPI Payment Integration** - Track payments via UPI transaction ID
- 🔍 **Order Tracking** - Track orders by Game ID
- 🎨 **Modern UI** - Clean, professional mobile interface
- 📊 **Real-time Status** - Payment and order status tracking

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo Go app (for testing on mobile)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/beniwalharish965-lab/game-currency-store.git
cd game-currency-store
Install dependencies:
npm install
Start the development server:
npx expo start
Scan the QR code with Expo Go app on your phone
📱 Building APK
Using EAS Build (Recommended)
Install EAS CLI:
npm install -g eas-cli
Login to Expo:
eas login
Build APK:
eas build --platform android --profile preview
Download the APK from the provided link
⚙️ Configuration
API Setup
Edit src/services/api.js:

const API_BASE_URL = 'https://your-api-endpoint.com/api';
UPI ID Setup
Edit src/screens/OrderFormScreen.js:

<Text style={styles.upiId}>UPI ID: your-upi-id@paytm</Text>
📊 Data Schema
The app integrates with two main entities:

Product
game_type (BGMI/FreeFire)
package_name
currency_amount
price
description
is_active
Order
product_id
customer_name
game_id
contact_email
contact_phone
quantity
total_amount
payment_status
order_status
upi_transaction_id
🎨 Customization
Colors
Edit the primary color in navigation and components:

Primary: #6366f1 (Indigo)
BGMI: #ff6b35 (Orange)
FreeFire: #ffd700 (Gold)
Mock Data
The app includes mock data for testing. Remove it when your API is ready:

src/services/api.js - MOCK_PRODUCTS array_
📚 Documentation
Quick Start Guide [blocked]
Deployment Guide [blocked]
API Configuration [blocked]_
🛠️ Tech Stack
React Native
Expo
React Navigation
Axios
📄 License
MIT License - feel free to use for your business!

🤝 Support
For issues or questions, please open an issue on GitHub.

Made with ❤️ for game currency sellers
