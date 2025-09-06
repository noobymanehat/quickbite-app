## Project Overview

QuickBite is a food delivery app built with React Native and Expo. It's a single-page mobile application with onboarding, food browsing, cart management, and order tracking features.

## Development Commands

### Setup and Installation
```bash
npm install                 # Install all dependencies
```

### Running the App
```bash
npm start                   # Start Expo development server
npm run android            # Run on Android device/emulator
npm run ios                # Run on iOS device/simulator  
npm run web                # Run in web browser
```

### Development Workflow
- Use Expo Go app on mobile device to test by scanning QR code
- Press 'i' in terminal for iOS simulator, 'a' for Android emulator
- Press 'r' to reload the app during development
- Press 'd' to open developer menu

## Architecture Overview

### Core Structure
The app follows a standard React Native + Expo architecture with these key patterns:

**Navigation**: Uses React Navigation v6 with a single native stack navigator containing 5 screens:
- OnboardingScreen (entry point with animated logo and swipeable intro pages)
- HomeScreen (main browsing interface with search, categories, and food grid)
- FoodDetailScreen (individual food details with quantity selector)
- CartScreen (shopping cart with item management)
- OrderTrackingScreen (order status with animated progress)

**State Management**: Implements Context API pattern with `CartContext` that provides:
- Cart state (items, quantities)
- Favorites management
- Persistent storage via AsyncStorage
- Actions for cart operations (add, remove, update, clear)

**Data Layer**: Static JSON data structure in `/src/data/foodData.js` with:
- Categories (with emoji icons)
- Food items (with images from Unsplash)
- Restaurant information

### Key Components and Patterns

**Screen Components**: Each screen is a functional component using hooks, following consistent patterns:
- SafeAreaView for safe area handling
- LinearGradient for brand styling
- FlatList for performant list rendering
- StyleSheet for component-specific styles

**Context Usage**: All screens that need cart functionality use `useCart()` hook from `CartContext`

**Navigation**: Screens receive navigation prop for programmatic navigation between screens

**Styling**: Consistent design system with:
- Primary colors: Orange (#FF6B35) and secondary (#F7931E)  
- Accent colors: Teal (#4ECDC4) and dark green (#44A08D)
- White cards with subtle shadows and rounded corners
- Gradient backgrounds for headers and buttons

### File Organization
```
src/
├── data/foodData.js          # Static app data (categories, food items, restaurants)
├── navigation/AppNavigator.js # Navigation stack configuration
├── screens/                  # All screen components
│   ├── OnboardingScreen.js
│   ├── HomeScreen.js
│   ├── FoodDetailScreen.js
│   ├── CartScreen.js
│   └── OrderTrackingScreen.js
└── utils/CartContext.js      # Global state management
```

## Important Development Notes

### Data Management
- All app data is static and located in `src/data/foodData.js`
- Cart and favorites persist automatically via AsyncStorage
- Food item images use Unsplash URLs with specific dimensions (400x300)

### Navigation Flow
- App always starts with OnboardingScreen
- No authentication or user management
- All navigation uses screen names: 'Onboarding', 'Home', 'FoodDetail', 'Cart', 'OrderTracking'

### Cart Logic
- Items with same ID have quantities merged automatically
- Cart badge shows total item count (not unique items)
- Order total includes $2.99 delivery fee
- Cart persists between app sessions

### Performance Considerations  
- Uses FlatList with proper keyExtractor for all lists
- Images loaded via URI with placeholder handling
- Categories use horizontal scrolling FlatList
- Food grid uses 2-column layout with columnWrapperStyle

### Styling Patterns
- All screens use consistent spacing (15-20px margins)
- Cards have elevation/shadow for depth
- Buttons use gradient backgrounds
- Text hierarchy: 24px headers, 16px body, 12-14px meta text

### Platform Configuration
- Configured for Expo SDK ~53.0.22
- Supports iOS, Android, and Web platforms
- Uses new architecture enabled
- Portrait orientation only
- Brand orange splash screen (#FF6B35)

## Common Development Patterns

When adding new features:
1. Add screen components to `src/screens/` following existing patterns
2. Register new screens in `AppNavigator.js`
3. Use `useCart()` hook for cart-related functionality
4. Follow existing styling patterns with consistent colors and spacing
5. Add any new data to `foodData.js` following existing structure
6. Use FlatList for any list rendering with proper keys
