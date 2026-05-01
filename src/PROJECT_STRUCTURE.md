# Project Structure Documentation

## Overview
This document outlines the reorganized folder structure of the EcommerceHub React project following modern best practices and scalability standards.

## Folder Structure

```
src/
├── assets/                      # Static assets (images, icons, fonts)
│   ├── images/                  # Product and page images
│   └── icons/                   # SVG and icon files
│
├── components/                  # Reusable UI components
│   ├── common/                  # Generic components (buttons, inputs, loaders, etc.)
│   ├── layout/                  # Layout components
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── product/                 # Product-related components
│   │   └── ProductCard.jsx
│   └── auth/                    # Authentication components
│       └── ProtectedRoute.jsx
│
├── pages/                       # Route-level page components
│   ├── Home/
│   │   └── index.jsx
│   ├── Products/
│   │   └── index.jsx
│   ├── Cart/
│   │   └── index.jsx
│   ├── Checkout/
│   │   └── index.jsx
│   ├── Auth/                    # Authentication pages
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   └── ForgotPassword.jsx
│   ├── About/
│   │   └── index.jsx
│   ├── Contact/
│   │   └── index.jsx
│   ├── Wishlist/
│   │   └── index.jsx
│   └── NotFound.jsx             # 404 error page
│
├── layouts/                     # Layout wrapper components
│   └── MainLayout.jsx           # Main application layout (Header + Footer)
│
├── context/                     # Global state management
│   └── StoreContext.jsx         # Global store context and provider
│
├── hooks/                       # Custom React hooks
│   └── useCart.js               # Custom cart management hook
│
├── services/                    # API calls and external services
│   └── api.js                   # Axios instance and API endpoints
│
├── utils/                       # Helper functions and utilities
│   └── helpers.js               # Reusable utility functions
│
├── routes/                      # Routing configuration
│   └── AppRoutes.jsx            # All application routes
│
├── styles/                      # Global and component styles
│   ├── globals.css              # Global styles and resets
│   ├── variables.css            # CSS custom properties
│   ├── App.css                  # App component styles
│   ├── Layout.css               # Layout component styles
│   ├── Header.css               # Header styles
│   ├── Footer.css               # Footer styles
│   ├── Home.css                 # Home page styles
│   ├── Products.css             # Products page styles
│   ├── ProductCard.css          # ProductCard component styles
│   ├── Cart.css                 # Cart page styles
│   ├── Auth.css                 # Authentication pages styles
│   └── Pages.css                # Other pages styles
│
├── App.jsx                      # Main App component
├── App.css                      # App component styles
├── index.jsx                    # React DOM render entry point
└── index.css                    # Legacy index styles (deprecated)
```

## Component Organization

### Components Directory
Components are organized by type for better scalability:

- **common/**: Reusable UI components
  - Buttons, Input fields, Loaders, Modals, etc.
  
- **layout/**: Layout-specific components
  - Header, Navbar, Sidebar, Footer
  
- **product/**: Product-related components
  - ProductCard, ProductList, ProductDetail
  
- **auth/**: Authentication components
  - ProtectedRoute, AuthGuard

### Pages Directory
Each page is organized in its own directory with an `index.jsx` file:

- **Home/**: Homepage component
- **Products/**: Products listing page
- **Cart/**: Shopping cart page
- **Checkout/**: Checkout/payment page
- **Auth/**: Authentication pages (Login, Signup, ForgotPassword)
- **About/**: About page
- **Contact/**: Contact page
- **Wishlist/**: User wishlist page
- **NotFound.jsx**: 404 error page

## Key Changes from Original Structure

### Before
```
src/
├── component/
│   ├── footer.js
│   ├── Header.js
│   ├── Layout.js
│   ├── ProductCard.js
│   └── ProtectedRoute.js
├── pages/
│   ├── Home.js
│   ├── Products.js
│   ├── Cart.js
│   ├── ... (flat structure)
├── context/
│   └── StoreContext.js
├── styles/
│   └── (multiple CSS files)
└── App.js
```

### After
```
src/
├── components/
│   ├── layout/
│   ├── product/
│   ├── auth/
│   └── common/
├── pages/
│   ├── Home/
│   ├── Products/
│   ├── Cart/
│   ├── Checkout/
│   ├── Auth/
│   └── ... (organized structure)
├── layouts/
├── context/
├── hooks/
├── services/
├── routes/
├── utils/
├── styles/
└── App.jsx
```

## Import Examples

### Before
```javascript
// Long relative paths
import Header from '../../../component/Header';
import ProductCard from '../component/ProductCard';
import { useStore } from '../context/StoreContext';
```

### After
```javascript
// Shorter, more readable paths
import { Header } from '../components/layout/Header';
import ProductCard from '../components/product/ProductCard';
import { useStore } from '../context/StoreContext';
```

## File Naming Conventions

- **Components**: `PascalCase.jsx` (e.g., `Header.jsx`, `ProductCard.jsx`)
- **Pages**: `PascalCase/index.jsx` (e.g., `pages/Home/index.jsx`)
- **Hooks**: `camelCase.js` (e.g., `useCart.js`)
- **Services**: `camelCase.js` (e.g., `api.js`)
- **Utilities**: `camelCase.js` (e.g., `helpers.js`)
- **Styles**: `lowercase.css` (e.g., `globals.css`, `variables.css`)

## Global State Management

The `StoreContext.jsx` provides global state for:
- Products
- Shopping Cart
- Wishlist
- User Authentication
- Loading states

### Usage
```javascript
import { useStore } from '../context/StoreContext';

function MyComponent() {
  const { cart, user, addToCart } = useStore();
  // ... component code
}
```

## Custom Hooks

### useCart
Manages shopping cart operations:
```javascript
import useCart from '../hooks/useCart';

function Cart() {
  const { cart, totalItems, totalPrice, addToCart, removeFromCart } = useCart();
  // ... component code
}
```

## API Service

Centralized API calls in `services/api.js`:
```javascript
import { productsAPI, authAPI, cartAPI } from '../services/api';

// Usage
const products = await productsAPI.getAll();
const result = await authAPI.login(credentials);
```

## Utility Functions

Helper functions in `utils/helpers.js`:
- `formatCurrency()` - Format currency values
- `validateEmail()` - Email validation
- `debounce()` - Debounce function calls
- `capitalize()` - Capitalize strings
- And more...

## Routing Structure

All routes are defined in `routes/AppRoutes.jsx`:
- Auth routes (no layout)
- Public routes (with MainLayout)
- Protected routes (with authentication check)
- 404 fallback route

## CSS Organization

### Global Styles
- `globals.css` - Reset and base styles
- `variables.css` - CSS custom properties

### Component Styles
Each component type has its own CSS file:
- Component-specific styles are imported within components
- Organized and easy to maintain
- Scoped to prevent conflicts

## Best Practices

1. **Keep components small and focused** - Each component should have a single responsibility
2. **Use meaningful folder names** - Organize by feature or type
3. **Centralize API calls** - All API endpoints in `services/api.js`
4. **Extract common logic** - Use custom hooks for shared logic
5. **Use utility functions** - Keep helper functions in `utils/helpers.js`
6. **Consistent naming** - Follow naming conventions for files and components
7. **Document complex components** - Add JSDoc comments for clarity
8. **Reuse components** - Build a component library in `components/common/`

## Migration Notes

- All `.js` files are now `.jsx` for React components
- All imports have been updated to reflect the new structure
- Component imports are relative to the importing file
- Use `index.jsx` for page components for cleaner imports

## Future Improvements

1. Add more components to `components/common/`
2. Create test files alongside components (`*.test.jsx`)
3. Add Storybook for component documentation
4. Implement error boundary components
5. Add logging service
6. Create form components library

---

For questions or updates to this structure, please refer to the component comments and JSDoc annotations throughout the codebase.
