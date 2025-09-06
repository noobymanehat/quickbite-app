export const categories = [
  { id: 1, name: 'Pizza', icon: '🍕' },
  { id: 2, name: 'Burgers', icon: '🍔' },
  { id: 3, name: 'Sushi', icon: '🍣' },
  { id: 4, name: 'Tacos', icon: '🌮' },
  { id: 5, name: 'Desserts', icon: '🍰' },
  { id: 6, name: 'Drinks', icon: '🥤' },
];

export const foodItems = [
  {
    id: 1,
    name: 'Margherita Pizza',
    category: 'Pizza',
    price: 18.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop',
    description: 'Fresh mozzarella, tomato sauce, and basil on a crispy crust.',
    restaurant: 'Tony\'s Pizzeria',
    cookTime: '25-30 min',
    ingredients: ['Fresh Mozzarella', 'Tomato Sauce', 'Fresh Basil', 'Olive Oil']
  },
  {
    id: 2,
    name: 'Classic Cheeseburger',
    category: 'Burgers',
    price: 15.99,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    description: 'Juicy beef patty with melted cheese, lettuce, tomato, and pickles.',
    restaurant: 'Burger Palace',
    cookTime: '15-20 min',
    ingredients: ['Beef Patty', 'Cheddar Cheese', 'Lettuce', 'Tomato', 'Pickles', 'Special Sauce']
  },
  {
    id: 3,
    name: 'Salmon Nigiri Set',
    category: 'Sushi',
    price: 24.99,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop',
    description: 'Fresh salmon nigiri with wasabi and pickled ginger.',
    restaurant: 'Sakura Sushi',
    cookTime: '10-15 min',
    ingredients: ['Fresh Salmon', 'Sushi Rice', 'Wasabi', 'Pickled Ginger', 'Soy Sauce']
  },
  {
    id: 4,
    name: 'Beef Tacos',
    category: 'Tacos',
    price: 12.99,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
    description: 'Seasoned beef with fresh salsa, cheese, and crisp lettuce.',
    restaurant: 'Casa de Tacos',
    cookTime: '12-18 min',
    ingredients: ['Seasoned Beef', 'Corn Tortilla', 'Cheese', 'Lettuce', 'Salsa', 'Sour Cream']
  },
  {
    id: 5,
    name: 'Chocolate Lava Cake',
    category: 'Desserts',
    price: 8.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1541599468348-e96984315921?w=400&h=300&fit=crop',
    description: 'Warm chocolate cake with a molten center, served with vanilla ice cream.',
    restaurant: 'Sweet Dreams',
    cookTime: '8-12 min',
    ingredients: ['Dark Chocolate', 'Butter', 'Eggs', 'Sugar', 'Flour', 'Vanilla Ice Cream']
  },
  {
    id: 6,
    name: 'Pepperoni Pizza',
    category: 'Pizza',
    price: 19.99,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
    description: 'Classic pepperoni pizza with mozzarella cheese and tomato sauce.',
    restaurant: 'Tony\'s Pizzeria',
    cookTime: '25-30 min',
    ingredients: ['Pepperoni', 'Mozzarella Cheese', 'Tomato Sauce', 'Italian Herbs']
  },
  {
    id: 7,
    name: 'BBQ Bacon Burger',
    category: 'Burgers',
    price: 17.99,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=400&h=300&fit=crop',
    description: 'Smoky BBQ burger with crispy bacon and onion rings.',
    restaurant: 'Burger Palace',
    cookTime: '18-25 min',
    ingredients: ['Beef Patty', 'Bacon', 'BBQ Sauce', 'Onion Rings', 'Cheese']
  },
  {
    id: 8,
    name: 'Fresh Smoothie',
    category: 'Drinks',
    price: 6.99,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=300&fit=crop',
    description: 'Refreshing blend of fresh fruits and yogurt.',
    restaurant: 'Healthy Bites',
    cookTime: '5-8 min',
    ingredients: ['Mixed Berries', 'Banana', 'Greek Yogurt', 'Honey', 'Mint']
  }
];

export const restaurants = [
  {
    id: 1,
    name: 'Tony\'s Pizzeria',
    rating: 4.8,
    deliveryTime: '25-30 min',
    deliveryFee: 2.99,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=200&fit=crop'
  },
  {
    id: 2,
    name: 'Burger Palace',
    rating: 4.6,
    deliveryTime: '15-20 min',
    deliveryFee: 1.99,
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=200&fit=crop'
  },
  {
    id: 3,
    name: 'Sakura Sushi',
    rating: 4.9,
    deliveryTime: '20-25 min',
    deliveryFee: 3.99,
    image: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=400&h=200&fit=crop'
  }
];
