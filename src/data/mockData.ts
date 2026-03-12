import { Product, User, Order } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life and superior sound quality.',
    price: 199.99,
    originalPrice: 299.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    category: 'Electronics',
    rating: 4.5,
    reviews: [
      {
        id: 'r1',
        userId: 'u1',
        userName: 'John Doe',
        rating: 5,
        comment: 'Amazing sound quality and comfortable to wear all day!',
        date: '2024-01-15',
        helpful: 12
      },
      {
        id: 'r2',
        userId: 'u2',
        userName: 'Jane Smith',
        rating: 4,
        comment: 'Great headphones, but a bit expensive.',
        date: '2024-01-10',
        helpful: 8
      }
    ],
    inStock: true,
    discount: 33,
    seller: 'TechStore Pro'
  },
  {
    id: '2',
    name: 'Smart Watch Series 6',
    description: 'Advanced fitness tracking, heart rate monitoring, and smartphone integration in a sleek design.',
    price: 349.99,
    originalPrice: 399.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    category: 'Electronics',
    rating: 4.8,
    reviews: [
      {
        id: 'r3',
        userId: 'u3',
        userName: 'Mike Johnson',
        rating: 5,
        comment: 'Best smartwatch I\'ve ever owned. Battery life is incredible!',
        date: '2024-01-20',
        helpful: 15
      }
    ],
    inStock: true,
    discount: 13,
    seller: 'TechStore Pro'
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    description: 'Comfortable and sustainable organic cotton t-shirt available in multiple colors.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    category: 'Clothing',
    rating: 4.2,
    reviews: [
      {
        id: 'r4',
        userId: 'u4',
        userName: 'Sarah Wilson',
        rating: 4,
        comment: 'Very comfortable and fits well. Love the organic material!',
        date: '2024-01-18',
        helpful: 6
      }
    ],
    inStock: true,
    seller: 'EcoFashion'
  },
  {
    id: '4',
    name: 'Professional Laptop Backpack',
    description: 'Durable and spacious backpack with laptop compartment and multiple organizer pockets.',
    price: 79.99,
    originalPrice: 99.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    category: 'Accessories',
    rating: 4.6,
    reviews: [
      {
        id: 'r5',
        userId: 'u5',
        userName: 'Tom Brown',
        rating: 5,
        comment: 'Perfect for work. Fits my laptop and all accessories.',
        date: '2024-01-22',
        helpful: 9
      }
    ],
    inStock: true,
    discount: 20,
    seller: 'WorkGear Inc'
  },
  {
    id: '5',
    name: 'Yoga Mat Premium',
    description: 'Extra thick, non-slip yoga mat with alignment markers for perfect poses.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=500',
    category: 'Sports',
    rating: 4.7,
    reviews: [
      {
        id: 'r6',
        userId: 'u6',
        userName: 'Lisa Davis',
        rating: 5,
        comment: 'Best yoga mat I\'ve used. Great grip and cushioning!',
        date: '2024-01-25',
        helpful: 11
      }
    ],
    inStock: true,
    seller: 'FitLife Store'
  },
  {
    id: '6',
    name: 'Coffee Maker Deluxe',
    description: 'Programmable coffee maker with thermal carafe and multiple brew settings.',
    price: 129.99,
    originalPrice: 159.99,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500',
    category: 'Home',
    rating: 4.4,
    reviews: [
      {
        id: 'r7',
        userId: 'u7',
        userName: 'Robert Miller',
        rating: 4,
        comment: 'Makes great coffee. Love the programmable feature.',
        date: '2024-01-28',
        helpful: 7
      }
    ],
    inStock: false,
    discount: 19,
    seller: 'Home Essentials'
  }
];

export const mockUser: User = {
  id: 'u1',
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password123',
  addresses: [
    {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    }
  ],
  orders: ['o1', 'o2'],
  isSeller: false
};

export const mockSeller: User = {
  id: 's1',
  name: 'TechStore Pro',
  email: 'seller@techstore.com',
  password: 'seller123',
  addresses: [
    {
      street: '456 Business Ave',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      country: 'USA'
    }
  ],
  orders: [],
  isSeller: true
};

export const mockOrders: Order[] = [
  {
    id: 'o1',
    userId: 'u1',
    items: [
      {
        product: mockProducts[0],
        quantity: 1
      }
    ],
    total: 199.99,
    status: 'delivered',
    shippingAddress: mockUser.addresses[0],
    paymentMethod: 'Credit Card',
    orderDate: '2024-01-10',
    estimatedDelivery: '2024-01-15'
  },
  {
    id: 'o2',
    userId: 'u1',
    items: [
      {
        product: mockProducts[2],
        quantity: 2
      },
      {
        product: mockProducts[3],
        quantity: 1
      }
    ],
    total: 139.97,
    status: 'shipped',
    shippingAddress: mockUser.addresses[0],
    paymentMethod: 'PayPal',
    orderDate: '2024-01-20',
    estimatedDelivery: '2024-01-25'
  }
];
