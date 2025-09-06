# QuickBite - Food Delivery App

A modern, feature-rich food delivery app built with React Native and Expo.

##  Features

### Core Features
- **Onboarding Experience**: Beautiful animated onboarding with swipeable intro pages
- **Home Screen**: Search functionality, category filtering, and food discovery
- **Food Details**: Detailed food information with quantity selection and favorites
- **Cart Management**: Add/remove items, quantity updates, and order summary
- **Order Tracking**: Real-time order status updates with animated delivery tracking

### UI/UX Highlights
- **Modern Design**: Clean, attractive interface with orange/green color palette
- **Smooth Animations**: Logo animations, progress indicators, and smooth transitions
- **Gradient Backgrounds**: Beautiful linear gradients throughout the app
- **Responsive Layout**: Optimized for various screen sizes
- **Vector Icons**: Comprehensive icon set from Expo Vector Icons

### Technical Features
- **React Navigation**: Seamless navigation between screens
- **AsyncStorage**: Persistent cart and favorites storage
- **Context API**: Global state management for cart functionality
- **FlatList Optimization**: Efficient rendering of food items and categories
- **Image Loading**: Dynamic image loading from external sources

##  Tech Stack

- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tools
- **React Navigation**: Navigation library
- **AsyncStorage**: Local data persistence
- **Expo Linear Gradient**: Gradient backgrounds
- **Expo Vector Icons**: Icon library
- **React Native Maps**: Map integration (for delivery tracking)

##  Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd quickbite-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on device/simulator**
   - Install Expo Go app on your mobile device
   - Scan the QR code displayed in the terminal
   - Or press 'i' for iOS simulator, 'a' for Android emulator

##  App Screens

### 1. Onboarding Screen
- Welcome animation with logo scaling
- Three swipeable intro pages
- Skip or navigate through pages
- Smooth transition to main app

### 2. Home Screen
- Header with greeting and cart icon
- Search bar with real-time filtering
- Horizontal scrolling categories
- Grid layout of food items with ratings and prices
- Cart badge showing item count

### 3. Food Detail Screen
- Full-screen food image
- Detailed description and ingredients
- Quantity selector with + / - buttons
- Dynamic price calculation
- Add to cart functionality
- Favorite toggle

### 4. Cart Screen
- List of selected items
- Quantity adjustment controls
- Remove item functionality
- Order summary with subtotal, delivery fee, and total
- Place order button
- Empty cart state with browse menu option

### 5. Order Tracking Screen
- Animated order status progression
- Mock delivery map with route visualization
- Real-time status updates (Confirmed → Preparing → On the way → Delivered)
- Estimated delivery time
- Order again functionality

## Design System

### Color Palette
- **Primary Orange**: `#FF6B35`
- **Secondary Orange**: `#F7931E`
- **Teal Green**: `#4ECDC4`
- **Dark Green**: `#44A08D`
- **Success Green**: `#4CAF50`
- **Background**: `#F8F9FA`
- **Text Dark**: `#333333`
- **Text Light**: `#666666`

### Typography
- **Headers**: Bold, 20-28px
- **Body Text**: Regular, 14-16px
- **Labels**: Medium, 12-14px

### Components
- **Buttons**: Gradient backgrounds with rounded corners
- **Cards**: White background with subtle shadows
- **Icons**: Consistent sizing and coloring
- **Inputs**: Clean design with proper focus states

##  Project Structure

```
src/
├── data/
│   └── foodData.js          # Static food and restaurant data
├── navigation/
│   └── AppNavigator.js      # Main navigation setup
├── screens/
│   ├── OnboardingScreen.js  # Welcome and intro screens
│   ├── HomeScreen.js        # Main browsing interface
│   ├── FoodDetailScreen.js  # Individual food details
│   ├── CartScreen.js        # Shopping cart management
│   └── OrderTrackingScreen.js # Order status and tracking
└── utils/
    └── CartContext.js       # Global cart state management
```

##  Configuration

The app is configured for Expo Go with the following settings:
- **App Name**: QuickBite
- **Slug**: quickbite-food-delivery
- **Platform Support**: iOS, Android, Web
- **Orientation**: Portrait
- **Brand Colors**: Orange theme

##  Development

### Adding New Food Items
Edit `src/data/foodData.js` to add new categories, food items, or restaurants.

### Customizing Styles
Each screen has its own StyleSheet with consistent design patterns. Global colors and typography can be extracted into a theme file for easier customization.

### Extending Functionality
- Add user authentication
- Implement real payment processing
- Connect to a backend API
- Add push notifications
- Implement real-time order tracking
##  License

This project is created for demonstration purposes. Feel free to use and modify as needed.
