import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
// import MapView, { Marker, Polyline } from 'react-native-maps';

const { width } = Dimensions.get('window');

const orderStatuses = [
  {
    id: 1,
    title: 'Order Confirmed',
    description: 'Your order has been confirmed',
    icon: 'checkmark-circle',
    color: '#4ECDC4',
    completed: true,
  },
  {
    id: 2,
    title: 'Preparing',
    description: 'Restaurant is preparing your food',
    icon: 'restaurant',
    color: '#FFD93D',
    completed: false,
  },
  {
    id: 3,
    title: 'On the way',
    description: 'Driver is coming to deliver your order',
    icon: 'car',
    color: '#FF6B35',
    completed: false,
  },
  {
    id: 4,
    title: 'Delivered',
    description: 'Order delivered successfully',
    icon: 'home',
    color: '#4CAF50',
    completed: false,
  },
];

const OrderTrackingScreen = ({ route, navigation }) => {
  const { orderTotal } = route.params;
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);
  const [statuses, setStatuses] = useState(orderStatuses);
  const progressAnimation = useRef(new Animated.Value(0)).current;
  const deliveryAnimation = useRef(new Animated.Value(0)).current;

  // Mock coordinates for the demonstration
  const restaurantLocation = { latitude: 37.7749, longitude: -122.4194 };
  const deliveryLocation = { latitude: 37.7849, longitude: -122.4094 };
  const currentLocation = { latitude: 37.7799, longitude: -122.4144 };

  useEffect(() => {
    // Simulate order progress
    const interval = setInterval(() => {
      setCurrentStatusIndex(prevIndex => {
        if (prevIndex < statuses.length - 1) {
          const newIndex = prevIndex + 1;
          updateOrderStatus(newIndex);
          return newIndex;
        } else {
          clearInterval(interval);
          return prevIndex;
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Animate progress bar
    Animated.timing(progressAnimation, {
      toValue: currentStatusIndex,
      duration: 500,
      useNativeDriver: false,
    }).start();

    // Animate delivery truck on map
    Animated.timing(deliveryAnimation, {
      toValue: currentStatusIndex / (statuses.length - 1),
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [currentStatusIndex]);

  const updateOrderStatus = (statusIndex) => {
    setStatuses(prevStatuses =>
      prevStatuses.map((status, index) => ({
        ...status,
        completed: index <= statusIndex,
      }))
    );
  };

  const renderStatusItem = (status, index) => {
    const isActive = index === currentStatusIndex;
    const isCompleted = status.completed;

    return (
      <View key={status.id} style={styles.statusItem}>
        <View style={styles.statusIndicator}>
          <View
            style={[
              styles.statusDot,
              {
                backgroundColor: isCompleted ? status.color : '#E0E0E0',
                transform: [{ scale: isActive ? 1.2 : 1 }],
              },
            ]}
          >
            <Ionicons
              name={status.icon}
              size={20}
              color={isCompleted ? 'white' : '#999'}
            />
          </View>
          {index < statuses.length - 1 && (
            <View
              style={[
                styles.statusLine,
                { backgroundColor: isCompleted ? status.color : '#E0E0E0' },
              ]}
            />
          )}
        </View>

        <View style={styles.statusContent}>
          <Text style={[styles.statusTitle, isActive && styles.activeStatusTitle]}>
            {status.title}
          </Text>
          <Text style={[styles.statusDescription, isActive && styles.activeStatusDescription]}>
            {status.description}
          </Text>
        </View>
      </View>
    );
  };

  const interpolateDeliveryPosition = () => {
    return {
      latitude: deliveryAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [restaurantLocation.latitude, deliveryLocation.latitude],
      }),
      longitude: deliveryAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [restaurantLocation.longitude, deliveryLocation.longitude],
      }),
    };
  };

  const renderMap = () => (
    <View style={styles.mapContainer}>
      <View style={styles.mockMap}>
        <Text style={styles.mapTitle}>🗺️ Live Delivery Tracking</Text>
        
        <View style={styles.routeContainer}>
          {/* Restaurant marker */}
          <View style={styles.mapMarker}>
            <View style={[styles.markerContainer, { backgroundColor: '#FFD93D' }]}>
              <Ionicons name="restaurant" size={20} color="white" />
            </View>
            <Text style={styles.markerLabel}>Restaurant</Text>
          </View>

          {/* Animated route line */}
          <View style={styles.routeLine}>
            <View 
              style={[
                styles.routeProgress,
                { width: `${(currentStatusIndex / 3) * 100}%` }
              ]} 
            />
          </View>

          {/* Delivery vehicle (only show when on the way) */}
          {currentStatusIndex >= 2 && (
            <Animated.View 
              style={[
                styles.deliveryVehicle,
                {
                  left: deliveryAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['10%', '80%'],
                  })
                }
              ]}
            >
              <View style={[styles.markerContainer, { backgroundColor: '#FF6B35' }]}>
                <Ionicons name="car" size={16} color="white" />
              </View>
            </Animated.View>
          )}

          {/* Delivery location marker */}
          <View style={styles.mapMarker}>
            <View style={[styles.markerContainer, { backgroundColor: '#4CAF50' }]}>
              <Ionicons name="home" size={20} color="white" />
            </View>
            <Text style={styles.markerLabel}>Your Location</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4ECDC4', '#44A08D']}
        style={styles.header}
      >
        <SafeAreaView>
          <View style={styles.headerContent}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.navigate('Home')}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            
            <Text style={styles.headerTitle}>Order Tracking</Text>
            
            <View style={styles.placeholder} />
          </View>

          <View style={styles.orderInfo}>
            <Text style={styles.orderAmount}>Order Total: ${orderTotal}</Text>
            <Text style={styles.estimatedTime}>
              Estimated delivery: {currentStatusIndex >= 3 ? 'Delivered!' : '20-25 mins'}
            </Text>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {renderMap()}

      <View style={styles.statusContainer}>
        <Text style={styles.statusTitle}>Order Status</Text>
        
        <View style={styles.statusList}>
          {statuses.map((status, index) => renderStatusItem(status, index))}
        </View>

        {currentStatusIndex >= 3 && (
          <TouchableOpacity
            style={styles.newOrderButton}
            onPress={() => navigation.navigate('Home')}
          >
            <LinearGradient
              colors={['#FF6B35', '#F7931E']}
              style={styles.newOrderGradient}
            >
              <Text style={styles.newOrderText}>Order Again</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  orderInfo: {
    alignItems: 'center',
    marginTop: 10,
  },
  orderAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  estimatedTime: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  mapContainer: {
    height: 250,
    margin: 15,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  mockMap: {
    flex: 1,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  mapTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    position: 'relative',
  },
  mapMarker: {
    alignItems: 'center',
    zIndex: 2,
  },
  markerLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
  routeLine: {
    position: 'absolute',
    left: 40,
    right: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    zIndex: 1,
  },
  routeProgress: {
    height: '100%',
    backgroundColor: '#FF6B35',
    borderRadius: 2,
  },
  deliveryVehicle: {
    position: 'absolute',
    zIndex: 3,
  },
  markerContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  statusContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  statusList: {
    flex: 1,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  statusIndicator: {
    alignItems: 'center',
    marginRight: 15,
  },
  statusDot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusLine: {
    width: 2,
    height: 40,
    marginTop: 5,
  },
  statusContent: {
    flex: 1,
    paddingTop: 8,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 4,
  },
  activeStatusTitle: {
    color: '#333',
  },
  statusDescription: {
    fontSize: 14,
    color: '#999',
  },
  activeStatusDescription: {
    color: '#666',
  },
  newOrderButton: {
    borderRadius: 25,
    overflow: 'hidden',
    marginTop: 10,
  },
  newOrderGradient: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  newOrderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default OrderTrackingScreen;
