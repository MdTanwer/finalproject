# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Routing Overview

Routing is handled by `react-router-dom`:

- `/` – Dashboard (with MainLayout)
- `/tables` – Table Management (with MainLayout)
- `/orders` – Order Management (with MainLayout)
- `/order-menu` – Mobile Menu (standalone, no MainLayout)
- `/mobile-checkout` – Mobile Checkout (standalone, no MainLayout)

> **Note:** The `/order-menu` and `/mobile-checkout` routes are **designed exclusively for mobile devices**. They are not optimized for laptop or tablet screens, and the layout or functionality may not display correctly on larger devices.

The `MainLayout` wraps the main admin/management pages, providing a consistent header and sidebar. Mobile routes are standalone for a cleaner mobile experience.
