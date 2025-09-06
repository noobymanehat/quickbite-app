import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../utils/CartContext';

const FoodDetailScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const [quantity, setQuantity] = useState(1);
  const { addToCart, isFavorite, toggleFavorite } = useCart();

  const totalPrice = (item.price * quantity).toFixed(2);

  const handleAddToCart = () => {
    const cartItem = {
      ...item,
      quantity: quantity,
    };
    addToCart(cartItem);
    
    Alert.alert(
      'Added to Cart!',
      `${quantity} x ${item.name} added to your cart.`,
      [
        { text: 'Continue Shopping', style: 'default' },
        { text: 'View Cart', onPress: () => navigation.navigate('Cart') },
      ]
    );
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleFavorite = () => {
    toggleFavorite(item.id);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.foodImage} />
          
          <SafeAreaView style={styles.headerOverlay}>
            <View style={styles.headerButtons}>
              <TouchableOpacity
                style={styles.headerButton}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="arrow-back" size={24} color="white" />
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.headerButton}
                onPress={handleFavorite}
              >
                <Ionicons
                  name={isFavorite(item.id) ? "heart" : "heart-outline"}
                  size={24}
                  color={isFavorite(item.id) ? "#FF3B30" : "white"}
                />
              </TouchableOpacity>
            </View>
          </SafeAreaView>

          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.3)']}
            style={styles.imageGradient}
          />
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.basicInfo}>
            <Text style={styles.foodName}>{item.name}</Text>
            <Text style={styles.restaurantName}>{item.restaurant}</Text>
            
            <View style={styles.metaInfo}>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.rating}>{item.rating}</Text>
              </View>
              
              <View style={styles.timeContainer}>
                <Ionicons name="time" size={16} color="#666" />
                <Text style={styles.cookTime}>{item.cookTime}</Text>
              </View>
            </View>
          </View>

          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>

          <View style={styles.ingredientsSection}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            <View style={styles.ingredientsList}>
              {item.ingredients.map((ingredient, index) => (
                <View key={index} style={styles.ingredientItem}>
                  <Text style={styles.ingredientText}>• {ingredient}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.quantitySection}>
            <Text style={styles.sectionTitle}>Quantity</Text>
            <View style={styles.quantityControls}>
              <TouchableOpacity
                style={[styles.quantityButton, quantity === 1 && styles.disabledButton]}
                onPress={decrementQuantity}
                disabled={quantity === 1}
              >
                <Ionicons name="remove" size={20} color={quantity === 1 ? "#ccc" : "white"} />
              </TouchableOpacity>
              
              <Text style={styles.quantityText}>{quantity}</Text>
              
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={incrementQuantity}
              >
                <Ionicons name="add" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalPrice}>${totalPrice}</Text>
        </View>
        
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <LinearGradient
            colors={['#FF6B35', '#F7931E']}
            style={styles.addToCartGradient}
          >
            <Ionicons name="cart" size={20} color="white" style={styles.cartIcon} />
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    height: 300,
  },
  foodImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  headerButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    padding: 8,
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  contentContainer: {
    padding: 20,
  },
  basicInfo: {
    marginBottom: 20,
  },
  foodName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  restaurantName: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  rating: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cookTime: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  descriptionSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  ingredientsSection: {
    marginBottom: 25,
  },
  ingredientsList: {
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    padding: 15,
  },
  ingredientItem: {
    paddingVertical: 2,
  },
  ingredientText: {
    fontSize: 14,
    color: '#666',
  },
  quantitySection: {
    marginBottom: 20,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 25,
    padding: 10,
  },
  quantityButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#E0E0E0',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 30,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  priceContainer: {
    flex: 1,
  },
  totalLabel: {
    fontSize: 14,
    color: '#666',
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  addToCartButton: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  addToCartGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  cartIcon: {
    marginRight: 10,
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default FoodDetailScreen;
