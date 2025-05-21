# Restaurant Management System Project Structure

## Overview

This document outlines the folder structure of the Restaurant Management System frontend application. This structure is designed to be modular, maintainable, and scalable.

## Folder Structurew

```
frontend/
│
├── public/                  # Static files
│   └── vite.svg            # Vite logo
│
├── src/                     # Source code
│   ├── assets/             # Images, icons, and other assets
│   │   └── react.svg      # React logo
│   │
│   ├── components/         # Reusable UI components
│   │   ├── common/        # Shared components across features
│   │   │   └── SearchBar.jsx    # Global search component
│   │   │
│   │   ├── dashboard/     # Dashboard-specific components
│   │   │   ├── MetricsOverview.jsx  # Key metrics component
│   │   │   ├── MetricCard.jsx       # Individual metric display
│   │   │   └── charts/             # Chart components
│   │   │       ├── RevenueChart.jsx          # Daily revenue chart
│   │   │       └── OrderSummaryChart.jsx     # Order type distribution
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
│   │   │   ├── DeliveryInfo.jsx      # Delivery information form
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
│   │   ├── Checkout.jsx              # Checkout & payment page
│   │   └── ChefAssignment.jsx        # Chef order assignment page
│   │
│   ├── styles/             # CSS styles
│   │   ├── components/     # Component-specific styles
│   │   │   ├── common/     # Styles for common components
│   │   │   ├── dashboard/  # Styles for dashboard components
│   │   │   ├── tables/     # Styles for table components
│   │   │   ├── orders/     # Styles for order components
│   │   │   ├── menu/       # Styles for menu components
│   │   │   ├── checkout/   # Styles for checkout components
│   │   │   ├── chefs/      # Styles for chef components
│   │   │   └── navigation/ # Styles for navigation components
│   │   │
│   │   ├── layouts/        # Styles for layouts
│   │   └── pages/          # Styles for pages
│   │
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API and service integrations
│   ├── utils/              # Utility functions
│   ├── context/            # React context providers
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

Components are organized by feature and follow these principles:

1. **Feature-Based Structure**: Components are grouped by feature (dashboard, tables, etc.)
2. **Common Components**: Shared components are placed in the `common` directory
3. **Nested Hierarchy**: Components can have sub-components in their own folders (e.g., charts)

## Style Organization

Styles follow the same structure as components:

1. Each component has a corresponding CSS file in the same relative path
2. Global styles are in `index.css` and `App.css`
3. Component-specific styles are in the `styles` directory with matching paths

## Extending the Structure

When adding new features:

1. Create a new folder in `components/` for feature-specific components
2. Create corresponding style folders in `styles/components/`
3. Add a new page component in `pages/` if needed
4. Update routing in `App.jsx`
