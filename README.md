# 🛒 E-Commerce API

A **scalable and feature-rich E-Commerce API** built with **Node.js, Express, and MongoDB**. This API handles authentication, user management, products, cart, wishlist, address management, and order processing with role-based access control for admin operations.

## 🚀 Features

- **JWT Authentication** (Login, Register)
- **User Management** (Admin & Self-Profile Management)
- **Product CRUD** (Pagination, Admin-only modification)
- **Cart & Wishlist Handling**
- **Address Management**
- **Order Processing** (Admin controls order states: `Pending → Shipped → Delivered`)
- **Role-Based Access Control** (Middleware for Admin/User permissions)
- **Pagination & Filtering** (For fetching products)

---

## 🛠 Tools & Technologies Used
- **Node.js & Express** - Backend framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **TypeScript** - Typed JavaScript for better development
- **Joi** - Data validation
- **Postman** - API testing

---

## 📦 Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up environment variables:** Create a `.env` file in the root directory and add:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   SECRET_KEY=your_jwt_secret
   ```
4. **Start the server:**
   ```sh
   npm run dev
   ```

---

## 🔐 Authentication Endpoints
| Method | Endpoint            | Access | Description        |
|--------|---------------------|--------|--------------------|
| POST   | `/api/auth/register` | Public | Register a new user |
| POST   | `/api/auth/login`    | Public | Authenticate user & return JWT |

---

## 👤 User Management
| Method | Endpoint          | Access  | Description |
|--------|------------------|---------|-------------|
| GET    | `/api/users/`    | Admin   | Get all users |
| GET    | `/api/users/me`  | User    | Get own profile |
| PATCH  | `/api/users/me`  | User    | Update own profile |
| DELETE | `/api/users/me`  | User    | Delete own account |

---

## 🛍 Product Management
| Method | Endpoint            | Access | Description |
|--------|---------------------|--------|-------------|
| POST   | `/api/products/`    | Admin  | Add a new product |
| PATCH  | `/api/products/:id` | Admin  | Update product details |
| DELETE | `/api/products/:id` | Admin  | Delete a product |
| GET    | `/api/products/`    | Public | Get all products (with pagination) |
| GET    | `/api/products/:id` | Public | Get product details |

---

## 📌 Address Management
| Method | Endpoint            | Access | Description |
|--------|---------------------|--------|-------------|
| POST   | `/api/address/`     | User   | Add a new address |
| DELETE | `/api/address/:id`  | User   | Delete an address |

---

## 🛒 Cart Management
| Method | Endpoint           | Access | Description |
|--------|--------------------|--------|-------------|
| POST   | `/api/cart/`       | User   | Add product to cart |
| GET    | `/api/cart/`       | User   | Get cart items |
| DELETE | `/api/cart/:id`    | User   | Remove an item from cart |

---

## ❤️ Wishlist Management
(Same as Cart functionality)
| Method | Endpoint            | Access | Description |
|--------|---------------------|--------|-------------|
| POST   | `/api/wishlist/`    | User   | Add product to wishlist |
| GET    | `/api/wishlist/`    | User   | Get wishlist items |
| DELETE | `/api/wishlist/:id` | User   | Remove an item from wishlist |

---

## 📦 Order Management
| Method | Endpoint             | Access | Description |
|--------|----------------------|--------|-------------|
| POST   | `/api/orders/`       | User   | Place a new order |
| GET    | `/api/orders/`       | User   | Get all user orders |
| DELETE | `/api/orders/:id`    | User   | Cancel an order |
| PATCH  | `/api/orders/:id`    | Admin  | Change order status (Pending → Shipped → Delivered) |

---

## 🛡 Authentication Middleware
This API uses **JWT authentication**. Include the token in the request header:
```http
Authorization: Bearer YOUR_ACCESS_TOKEN
```

---

## 🏗 Project Structure
```
📂 your-repo
 ┣ 📂 src
 ┃ ┣ 📂 controllers   # Business logic
 ┃ ┣ 📂 models        # Mongoose schemas
 ┃ ┣ 📂 middleware    # Authentication & role-based access
 ┃ ┣ 📂 routes        # Express routes
 ┃ ┣ 📂 utils         # Helper functions
 ┃ ┗ index.ts         # Entry point
 ┣ 📄 .env            # Environment variables
 ┣ 📄 package.json    # Dependencies
 ┣ 📄 README.md       # Project documentation
 ┗ 📄 tsconfig.json   # TypeScript configuration
```

---

## 🤝 Contributing

1. **Fork the repository**
2. **Create a new branch** (`feature/your-feature`)
3. **Commit your changes** (`git commit -m "Added new feature"`)
4. **Push to your branch** (`git push origin feature/your-feature`)
5. **Submit a Pull Request**

---

## 📄 License

This project is licensed under the **MIT License**.

---

## ⭐ Show Some Love
If you found this project useful, please give it a ⭐ on GitHub! 😊


