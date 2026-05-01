# Quick Reference Guide

## Folder Quick Access

| Folder | Purpose | Files |
|--------|---------|-------|
| `assets/` | Static files | images/, icons/ |
| `components/` | Reusable UI components | common/, layout/, product/, auth/ |
| `pages/` | Route-level pages | Home/, Products/, Cart/, Auth/, etc. |
| `layouts/` | Layout wrappers | MainLayout.jsx |
| `context/` | Global state | StoreContext.jsx, AuthContext.jsx |
| `hooks/` | Custom hooks | useCart.js |
| `services/` | API calls | api.js |
| `utils/` | Helper functions | helpers.js |
| `routes/` | Routing config | AppRoutes.jsx |
| `styles/` | CSS files | globals.css, variables.css, component-specific CSS |

## Common Imports

### Context
```javascript
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
```

### Hooks
```javascript
import useCart from '../hooks/useCart';
```

### Components
```javascript
import { Header } from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ProductCard from '../components/product/ProductCard';
import ProtectedRoute from '../components/auth/ProtectedRoute';
```

### Services
```javascript
import { authAPI, productsAPI, cartAPI } from '../services/api';
```

### Utilities
```javascript
import { 
  formatCurrency, 
  validateEmail, 
  debounce 
} from '../utils/helpers';
```

## Component Structure Template

### New Component
```javascript
// components/common/Button.jsx
import React from 'react';
import '../../styles/Button.css'; // if needed

/**
 * Button Component
 * Reusable button with various styles
 */
function Button({ children, variant = 'primary', ...props }) {
  return (
    <button className={`btn btn-${variant}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
```

### New Page
```javascript
// pages/NewPage/index.jsx
import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import '../../styles/NewPage.css'; // if needed

function NewPage() {
  return (
    <MainLayout>
      <main className="new-page">
        {/* Page content */}
      </main>
    </MainLayout>
  );
}

export default NewPage;
```

## Route Pattern

```javascript
// pages/Auth/ProtectedPages
<Route path="/products" element={
  <MainLayout>
    <ProtectedRoute>
      <Products />
    </ProtectedRoute>
  </MainLayout>
} />

// pages/Public/Layout
<Route path="/" element={
  <MainLayout>
    <Home />
  </MainLayout>
} />

// pages/Auth/NoLayout
<Route path="/login" element={<Login />} />
```

## CSS Organization

### Component Styles
Each component type has dedicated CSS:
- `components/layout/` → `styles/Header.css`, `styles/Footer.css`
- `components/product/` → `styles/ProductCard.css`
- `pages/Home/` → `styles/Home.css`

### Global Styles
- `styles/globals.css` - Resets, base styles, utilities
- `styles/variables.css` - CSS custom properties

### Usage
```javascript
import '../../styles/ComponentName.css';
```

## API Usage Pattern

```javascript
// Fetch products
async function loadProducts() {
  try {
    const response = await productsAPI.getAll();
    setProducts(response.data);
  } catch (error) {
    console.error('Error loading products:', error);
  }
}

// Login user
async function handleLogin(credentials) {
  try {
    const response = await authAPI.login(credentials);
    localStorage.setItem('token', response.data.token);
  } catch (error) {
    console.error('Login failed:', error);
  }
}
```

## Custom Hook Pattern

```javascript
// pages/Products.jsx
import useCart from '../hooks/useCart';

function Products() {
  const { cart, addToCart, removeFromCart, totalPrice } = useCart();
  
  return (
    // Use cart functionality
  );
}
```

## Utility Functions

```javascript
// Format currency
const price = formatCurrency(99.99); // $99.99

// Validate input
if (validateEmail(email)) {
  // Valid email
}

// Debounce search
const debouncedSearch = debounce((query) => {
  // Perform search
}, 300);
```

## File Naming Quick Reference

| Type | Format | Example |
|------|--------|---------|
| Component | PascalCase.jsx | Header.jsx, ProductCard.jsx |
| Page | PascalCase/index.jsx | pages/Home/index.jsx |
| Hook | camelCase.js | useCart.js |
| Service | camelCase.js | api.js |
| Utility | camelCase.js | helpers.js |
| Style | lowercase.css | header.css, globals.css |

## Common File Paths

```
src/components/layout/Header.jsx
src/components/product/ProductCard.jsx
src/components/auth/ProtectedRoute.jsx
src/pages/Home/index.jsx
src/pages/Auth/Login.jsx
src/layouts/MainLayout.jsx
src/context/StoreContext.jsx
src/hooks/useCart.js
src/services/api.js
src/utils/helpers.js
src/routes/AppRoutes.jsx
src/styles/globals.css
```

## Relative Import Examples

### From pages/Products/index.jsx to other locations
```javascript
// To components
import ProductCard from '../../components/product/ProductCard';

// To context
import { useStore } from '../../context/StoreContext';

// To hooks
import useCart from '../../hooks/useCart';

// To layouts
import MainLayout from '../../layouts/MainLayout';

// To utils
import { formatCurrency } from '../../utils/helpers';

// To styles
import '../../styles/Products.css';
```

### From components/product/ProductCard.jsx
```javascript
// To context
import { useStore } from '../../context/StoreContext';

// To utils
import { formatCurrency } from '../../utils/helpers';

// To services
import { productsAPI } from '../../services/api';

// To styles
import '../../styles/ProductCard.css';
```

## Debugging Tips

1. **Import path issues?**
   - Check the file exists in the specified location
   - Verify relative paths (../ for each level up)
   - Check file extension (.jsx for components, .js for others)

2. **Component not found?**
   - Ensure export is correct (default or named)
   - Check import statement matches export type
   - Look for typos in component names

3. **Styles not applying?**
   - Verify CSS file is imported in component
   - Check CSS class names match
   - Ensure variables.css is imported first

4. **API errors?**
   - Check endpoint exists in services/api.js
   - Verify API URL is correct in .env
   - Check request/response format matches API

---

For more details, see `PROJECT_STRUCTURE.md` in the src/ folder.
