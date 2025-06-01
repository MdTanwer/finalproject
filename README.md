# 🍽️ Restaurant Management System

A comprehensive full-stack restaurant management solution featuring real-time analytics, table management, order processing, and a mobile-optimized customer experience.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://finalproject-seven-xi.vercel.app/)
[![Frontend](https://img.shields.io/badge/frontend-React-blue)](https://finalproject-seven-xi.vercel.app/)
[![Backend](https://img.shields.io/badge/backend-Node.js-green)](https://render.com/)

## 📱 Live Application

- **Production URL:** [https://finalproject-seven-xi.vercel.app/](https://finalproject-seven-xi.vercel.app/)
- **Frontend Hosting:** [Vercel](https://vercel.com/)
- **Backend Hosting:** [Render](https://render.com/)

## 🎯 Key Features

### Administrative Dashboard

- Real-time analytics and performance metrics
- Daily revenue tracking and visualization
- Order status monitoring
- Chef workload management

### Table Management

- Interactive table status dashboard
- Real-time availability updates
- Reservation handling
- Seating capacity management

### Order Processing

- Multi-stage order tracking
- Real-time status updates
- Special instructions handling
- Order history and analytics

### Mobile Experience

- Responsive menu interface
- Streamlined checkout process
- Order status tracking
- Customer information management

## 🛠️ Technology Stack

### Frontend

- **Framework:** React 19.1.0
- **Build Tool:** Vite 6.3.5
- **Routing:** React Router DOM 6.22.3
- **State Management:** React Context
- **UI Components:** React Icons 5.5.0
- **Data Visualization:** Chart.js 4.4.9
- **Notifications:** React Toastify 11.0.5
- **Development:** ESLint 9.25.0

### Backend

- **Runtime:** Node.js
- **Framework:** Express
- **Database:** MongoDB with Mongoose
- **API:** RESTful architecture
- **Error Handling:** Global error middleware
- **Security:** CORS enabled

## 🏗️ Architecture

### Frontend Structure

```
frontend/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/           # Route components
│   ├── context/         # Global state management
│   ├── styles/          # CSS modules
│   ├── services/        # API integration
│   └── utils/           # Helper functions
```

### Backend Structure

```
backend/
├── config/             # Configuration files
├── controllers/        # Business logic
├── models/            # Database schemas
├── routes/            # API endpoints
└── utils/             # Helper functions
```

## 📑 Pages & Features

### 1. Dashboard (`/`)

- **Purpose:** Main administrative interface
- **Key Features:**
  - Real-time order statistics
  - Revenue tracking and charts
  - Table occupancy overview
  - Chef workload monitoring
  - Quick access to all management functions
- **Access:** Admin/Staff only
- **Layout:** Full desktop layout with sidebar

### 2. Table Management (`/tables`)

- **Purpose:** Table status and reservation control
- **Key Features:**
  - Interactive table grid layout
  - Real-time status updates
  - Table reservation management
  - Seating capacity tracking
  - Quick status toggle
- **Access:** Admin/Staff only
- **Layout:** Full desktop layout with sidebar

### 3. Order Management (`/orders`)

- **Purpose:** Comprehensive order tracking and management
- **Key Features:**
  - Active orders list
  - Order status updates
  - Chef assignments
  - Order history
  - Filtering and search
  - Order details view
- **Access:** Admin/Staff only
- **Layout:** Full desktop layout with sidebar

### 4. Mobile Menu (`/order-menu`)

- **Purpose:** Customer-facing menu interface
- **Key Features:**
  - Category-based menu navigation
  - Item details and pricing
  - Add to cart functionality
  - Quantity selection
  - Special instructions
  - Real-time cart updates
- **Access:** Customers
- **Layout:** Mobile-optimized interface
- **Note:** Designed specifically for mobile devices

### 5. Mobile Checkout (`/mobile-checkout`)

- **Purpose:** Order completion and payment
- **Key Features:**
  - Order summary
  - Customer information collection
  - Delivery/pickup options
  - Special instructions
  - Payment method selection
  - Order confirmation
  - Real-time validation
- **Access:** Customers
- **Layout:** Mobile-optimized interface
- **Note:** Designed specifically for mobile devices

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- MongoDB database
- npm or yarn package manager

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

## 📱 Mobile-Optimized Routes

The application includes mobile-specific routes optimized for smaller screens:

- `/order-menu` - Mobile-optimized menu interface
- `/mobile-checkout` - Streamlined checkout process

> **Note:** These routes are designed exclusively for mobile devices and may not display correctly on larger screens.

## 💾 Data Models

### Order Schema

- Customer information
- Order items and quantities
- Delivery/table details
- Status tracking
- Chef assignment

### Table Schema

- Seating capacity
- Current status
- Reservation details

### Menu Item Schema

- Item details
- Pricing
- Category
- Preparation time

### Chef Schema

- Personal information
- Current workload
- Order assignments

## 🔒 Security Features

- Environment variable configuration
- CORS protection
- Error handling middleware
- Input validation
- MongoDB injection protection

## 🚦 API Endpoints

### Orders

- `GET /api/orders` - Retrieve orders
- `POST /api/orders` - Create order
- `PATCH /api/orders/:id/status` - Update status
- `DELETE /api/orders` - Delete orders

### Tables

- `GET /api/tables` - Get all tables
- `POST /api/tables` - Add table
- `PATCH /api/tables/:id` - Update status
- `DELETE /api/tables/:id` - Remove table

### Menu Items

- `GET /api/products` - Get menu items
- `POST /api/products/seed` - Seed menu data
- `DELETE /api/products/:id` - Remove item

### Chefs

- `GET /api/chefs` - List all chefs
- `POST /api/chefs` - Add/update chef

## 📈 Performance Optimization

### Frontend

- Code splitting with React.lazy()
- Asset optimization with Vite
- Lazy loading of images
- Efficient state management
- Memoized components

### Backend

- Database indexing
- Query optimization
- Caching strategies
- Efficient error handling

## 🧪 Development

### Code Quality

- ESLint configuration
- Consistent code style
- Component organization
- Documentation standards

### Best Practices

- Feature-based structure
- Modular components
- Clean code principles
- DRY methodology

## 📚 Documentation

Detailed documentation is available in the respective directories:

- [Frontend Documentation](./frontend/README.md)
- [Backend Documentation](./backend/README.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- React Team for the excellent framework
- MongoDB Team for the robust database
- Vercel and Render for hosting services
