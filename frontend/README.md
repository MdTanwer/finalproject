# Restaurant Management System Frontend

A modern React-based frontend for the Restaurant Management System, built with Vite and featuring real-time analytics, order management, and responsive design.

## Tech Stack

- **Framework:** React 19.1.0
- **Build Tool:** Vite 6.3.5
- **Routing:** React Router DOM 6.22.3
- **UI Components:** React Icons 5.5.0
- **Charts:** Chart.js 4.4.9 with react-chartjs-2 5.3.0
- **Notifications:** React Toastify 11.0.5
- **Development:** ESLint 9.25.0

## Features

- 📊 Real-time Dashboard Analytics
- 🪑 Table Management System
- 🍽️ Order Processing
- 👨‍🍳 Chef Assignment
- 📱 Mobile-Responsive Design
- 📈 Interactive Charts
- 🛒 Cart Management
- 💳 Checkout System

## Getting Started

1. **Install Dependencies:**

   ```bash
   npm install
   ```

2. **Start Development Server:**

   ```bash
   npm run dev
   ```

3. **Build for Production:**

   ```bash
   npm run build
   ```

4. **Preview Production Build:**
   ```bash
   npm run preview
   ```

## Project Structure

```
frontend/
│
├── public/                  # Static files
│   └── vite.svg            # Vite logo
│
├── src/                     # Source code
│   ├── assets/             # Images, icons, and other assets
│   │
│   ├── components/         # Reusable UI components
│   │   ├── common/        # Shared components
│   │   │   └── SearchBar.jsx    # Global search component
│   │   │
│   │   ├── dashboard/     # Dashboard-specific components
│   │   │   ├── MetricsOverview.jsx  # Key metrics component
│   │   │   ├── MetricCard.jsx       # Individual metric display
│   │   │   └── charts/             # Chart components
│   │   │
│   │   ├── tables/        # Table management components
│   │   │   ├── TablesDashboard.jsx   # Table status overview
│   │   │   ├── TableForm.jsx         # Add/edit table form
│   │   │   └── TableSearchFilter.jsx # Table search & filter
│   │   │
│   │   ├── orders/        # Order management components
│   │   │   ├── OrdersList.jsx        # List of orders
│   │   │   ├── OrderDetails.jsx      # Order details view
│   │   │   └── OrderFilters.jsx      # Order filtering options
│   │   │
│   │   ├── menu/          # Menu management components
│   │   │   ├── CategoryTabs.jsx      # Menu category navigation
│   │   │   ├── MenuItems.jsx         # Menu items display
│   │   │   └── Cart.jsx              # Order cart
│   │   │
│   │   ├── checkout/      # Checkout components
│   │   │   ├── CustomerForm.jsx      # Customer information form
│   │   │   ├── OrderSummary.jsx      # Order summary display
│   │   │   └── PaymentOptions.jsx    # Payment method selection
│   │   │
│   │   ├── chefs/         # Chef assignment components
│   │   │   ├── ChefList.jsx          # List of available chefs
│   │   │   └── PendingOrders.jsx     # Orders pending assignment
│   │   │
│   │   └── navigation/    # Navigation components
│   │       ├── Header.jsx            # App header with search
│   │       └── Sidebar.jsx           # Main navigation sidebar
│   │
│   ├── layouts/            # Page layout components
│   │   └── MainLayout.jsx            # Main application layout
│   │
│   ├── pages/              # Page components
│   │   ├── Dashboard.jsx             # Analytics dashboard page
│   │   ├── TableManagement.jsx       # Table management page
│   │   ├── OrderManagement.jsx       # Order management page
│   │   ├── MenuManagement.jsx        # Menu & ordering page
│   │   └── ChefAssignment.jsx        # Chef order assignment page
│   │
│   ├── styles/             # CSS styles
│   │   ├── components/     # Component-specific styles
│   │   ├── layouts/        # Layout styles
│   │   └── pages/          # Page-specific styles
│   │
│   ├── context/            # React context providers
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API and service integrations
│   ├── utils/              # Utility functions
│   ├── App.jsx             # Root App component
│   ├── App.css             # App-wide styles
│   ├── index.css           # Global CSS
│   └── main.jsx            # Entry point
│
├── index.html              # HTML entry point
├── vite.config.js          # Vite configuration
├── package.json            # Dependencies and scripts
└── README.md               # Project documentation
```

## Component Organization

Components follow these organizational principles:

1. **Feature-Based Structure**

   - Components are grouped by feature (dashboard, tables, etc.)
   - Each feature has its own directory
   - Related components are kept together

2. **Common Components**

   - Shared components in `common` directory
   - Reusable across multiple features
   - Consistent styling and behavior

3. **Nested Hierarchy**
   - Complex features have sub-components
   - Organized in nested folders
   - Clear parent-child relationships

## Routing Overview

The application uses React Router with the following structure:

- `/` – Main Dashboard

  - Real-time analytics
  - Key performance metrics
  - Order statistics

- `/tables` – Table Management

  - Table status overview
  - Reservation management
  - Seating arrangements

- `/orders` – Order Management

  - Active orders
  - Order history
  - Status tracking

- `/order-menu` – Mobile Menu (Mobile Only)

  - Category-based menu
  - Item details
  - Cart management

- `/mobile-checkout` – Checkout (Mobile Only)
  - Order summary
  - Customer details
  - Payment processing

## Development Guidelines

1. **Component Creation:**

   - Place new components in appropriate feature folders
   - Create corresponding style modules
   - Follow the established naming conventions

2. **Styling:**

   - Use CSS modules for component-specific styles
   - Global styles in `index.css`
   - Follow BEM naming convention

3. **State Management:**

   - Use React Context for global state
   - Local state for component-specific data
   - Custom hooks for shared logic

4. **Code Quality:**
   - Run `npm run lint` before commits
   - Follow ESLint configuration
   - Write meaningful commit messages

## Mobile-First Approach

The application implements a mobile-first design strategy:

- Responsive layouts using CSS Grid and Flexbox
- Touch-friendly interface elements
- Optimized mobile routes for ordering
- Dedicated mobile checkout experience

## Performance Optimization

- Code splitting with React.lazy()
- Asset optimization with Vite
- Lazy loading of images
- Memoization of expensive calculations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the ISC License.
