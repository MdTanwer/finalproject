# Restaurant Management System Backend

This is the backend API for the Restaurant Management System, built with Node.js, Express, and MongoDB (Mongoose).

## Features

- Order Management (Dine-in and Takeaway)
- Menu Item Management
- Table Management
- Chef Workload Management
- Real-time Order Status Tracking
- Custom Error Handling
- CORS Support for Frontend Integration

## Requirements

- Node.js (v14+ recommended)
- MongoDB database (local or Atlas)
- npm or yarn package manager

## Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Configure environment:**

   - Currently using MongoDB Atlas connection
   - For production, move the MongoDB URI to `.env` file
   - Configure CORS origins in `app.js` if needed

3. **Run the server:**

   ```bash
   # Development mode with nodemon
   npm run dev

   # Production mode
   npm start
   ```

4. **Seed initial data (optional):**

   ```bash
   # Seed tables
   node seedTables.js

   # Seed chefs
   node seedChefs.js
   ```

## API Endpoints

### Root

- `GET /` — Health check endpoint

### Orders

- `GET /api/orders` — Get all orders
- `GET /api/orders/:id` — Get order by ID
- `POST /api/orders` — Create new order
- `PATCH /api/orders/:id/status` — Update order status
- `PATCH /api/orders/:id/takeaway-status` — Update takeaway status
- `DELETE /api/orders` — Delete all orders

### Menu Items

- `GET /api/products` — Get all menu items
- `DELETE /api/products/:id` — Delete menu item
- `DELETE /api/products` — Delete all menu items
- `POST /api/products/seed` — Seed menu items

### Tables

- `GET /api/tables` — Get all tables
- `POST /api/tables` — Add new table
- `DELETE /api/tables/:id` — Delete table
- `PATCH /api/tables/:id` — Update table status

### Chefs

- `GET /api/chefs` — Get all chefs
- `POST /api/chefs` — Add/seed chefs

## Data Models

### Order

```javascript
{
  items: [{
    menuItem: ObjectId,  // Reference to MenuItem
    quantity: Number
  }],
  orderType: String,     // "dineIn", "takeAway", "done"
  specialInstructions: String,
  user: {
    name: String,
    phone: String
  },
  deliveryAddress: String,
  deliveryTime: String,
  deliveryCharge: Number,
  tax: Number,
  total: Number,
  orderId: Number,
  tableName: String,
  status: String,        // "processing", "served", "takeaway"
  takeawayStatus: String,// "notPickedUp", "pickedUp"
  createdAt: Date,
  chef: ObjectId         // Reference to Chef
}
```

### MenuItem

```javascript
{
  name: String,
  category: String,      // pizza, burger, drink, etc.
  price: Number,
  image: String,         // URL to item image
  deliveryTime: Number,  // in minutes
  deliveryCharge: Number
}
```

### Table

```javascript
{
  name: String,          // unique
  chairs: Number,        // min: 1
  status: String        // "available" or "reserved"
}
```

### Chef

```javascript
{
  name: String,
  orderTaken: Number    // Tracks chef workload
}
```

## Project Structure

```
backend/
├── app.js              # Main application entry
├── config/
│   └── db.js          # Database configuration
├── controllers/
│   ├── chefController.js
│   ├── orderController.js
│   ├── productController.js
│   └── tableController.js
├── models/
│   ├── Chef.js
│   ├── MenuItem.js
│   ├── Order.js
│   └── Table.js
├── routes/
│   ├── chefRoutes.js
│   ├── orderRoutes.js
│   ├── productRoutes.js
│   └── tableRoutes.js
├── utils/
│   └── errorHandler.js  # Global error handling
├── seedChefs.js        # Chef data seeder
└── seedTables.js       # Table data seeder
```

## Error Handling

The application uses a global error handler that provides consistent error responses:

```javascript
{
  status: "error",
  message: "Error description"
}
```

## License

ISC
