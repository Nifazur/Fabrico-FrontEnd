# Fabrico Frontend

A modern, responsive e-commerce frontend application built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**. This comprehensive web application provides a seamless shopping experience with features like product browsing, cart management, order tracking, and admin dashboard.

## 🌐 Live Application

**URL:** https://fabrico-theta.vercel.app

## 🚀 Features

### User Experience

- **Modern UI/UX**: Clean, responsive design with dark/light theme support
- **Product Discovery**: Advanced filtering, search, and categorization
- **Shopping Cart**: Real-time cart management with variant selection
- **Order Management**: Complete order lifecycle tracking
- **User Authentication**: Secure login with Google OAuth integration
- **Responsive Design**: Optimized for mobile, tablet, and desktop

### Admin Dashboard

- **Dashboard Overview**: Real-time statistics and analytics
- **Product Management**: Complete CRUD operations for products
- **Order Management**: Track and update order statuses
- **User Management**: Manage customer accounts and permissions
- **Analytics**: Visual charts and reports

### Technical Features

- **Type Safety**: Full TypeScript implementation
- **State Management**: RTK Query for efficient API state management
- **Authentication**: JWT-based auth with auto-refresh tokens
- **Form Handling**: React Hook Form with Zod validation
- **Routing**: React Router v7 with protected routes
- **Theme Support**: Dynamic theme switching (Light/Dark/System)

## 🛠 Tech Stack

### Frontend Framework

- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Ultra-fast build tool and dev server
- **React Router v7** - Modern client-side routing

### Styling & UI

- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Lucide React** - Beautiful icon library
- **Recharts** - Composable charting library for analytics

### State Management

- **Redux Toolkit** - Modern Redux with RTK Query
- **RTK Query** - Powerful data fetching and caching
- **React Hook Form** - Performant form handling
- **Zod** - Schema validation library

### Development Tools

- **Bun** - Fast JavaScript runtime and package manager
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📁 Project Structure

```

src/

├── components/                     # Reusable UI components

│   ├── admin/                     # Admin-specific components

│   │   ├── dashboard/             # Dashboard widgets

│   │   ├── orders/                # Order management

│   │   ├── products/              # Product management

│   │   └── users/                 # User management

│   ├── cart/                      # Shopping cart components

│   ├── checkout/                  # Checkout process

│   ├── dashboardLayout/           # Dashboard layout wrapper

│   ├── home/                      # Homepage sections

│   ├── Layout/                    # Main layout components

│   ├── orders/                    # Order tracking components

│   ├── Product/                   # Product display components

│   ├── product-details/           # Product detail page

│   └── ui/                        # Base UI components (shadcn/ui)

├── config/                        # App configuration

│   └── index.ts                   # Environment variables

├── constants/                     # App constants

│   └── role.ts                    # User role definitions

├── context/                       # React contexts

│   └── theme.context.ts           # Theme context

├── hooks/                         # Custom React hooks

│   ├── use-mobile.ts              # Mobile detection

│   ├── useDebounce.ts             # Debounce hook

│   └── useTheme.ts                # Theme management

├── lib/                          # Utility libraries

│   ├── axios.ts                   # API client with interceptors

│   └── utils.ts                   # Helper functions

├── pages/                        # Page components

│   ├── admin/                     # Admin dashboard pages

│   ├── Auth/                      # Authentication pages

│   ├── public/                    # Public pages (Home, About, etc.)

│   └── user/                      # User dashboard pages

├── providers/                     # Context providers

│   └── theme.provider.tsx         # Theme provider

├── redux/                        # State management

│   ├── features/                  # Feature-specific APIs

│   │   ├── authApi.ts            # Authentication endpoints

│   │   ├── cartApi.ts            # Cart management

│   │   ├── orderApi.ts           # Order management

│   │   ├── productApi.ts         # Product catalog

│   │   └── userApi.ts            # User management

│   ├── axiosBaseQuery.ts          # Custom base query

│   ├── baseApi.ts                 # RTK Query setup

│   └── store.ts                   # Redux store configuration

├── routes/                       # Route definitions

│   ├── adminRoutes.tsx            # Admin route structure

│   ├── index.tsx                  # Main router

│   └── userRoutes.tsx             # User route structure

├── types/                        # TypeScript type definitions

├── utils/                        # Utility functions

│   ├── generateRoutes.ts          # Dynamic route generation

│   └── withAuth.ts                # Authentication HOC

├── App.tsx                       # Main App component

└── main.tsx                      # Application entry point

```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env

# API Configuration

VITE_BASE_URL=https://fabrico-backend-one.vercel.app/api/v1

VITE_FRONT_URL=https://fabrico-theta.vercel.app


# For local development

# VITE_BASE_URL=http://localhost:5000/api/v1

# VITE_FRONT_URL=http://localhost:5173

```

## 🚀 Getting Started

### Prerequisites

- **Bun** (latest version)
- **Node.js** 18+ (if not using Bun)

### Installation

1. **Clone the repository**

   ```bash

   git clone <repository-url>

   cd fabrico-frontend

   ```

```


2. **Install dependencies**

   ```bash

   bun install

```

3. **Set up environment variables**

   ```bash

   cp .env.example .env

   # Update the .env file with your configurations

   ```

```


4. **Start development server**

   ```bash

   bun run dev

```

5. **Build for production**

   ```bash

   bun run build

   ```

```


6. **Preview production build**

   ```bash

   bun run preview

```

## 📚 Available Scripts

```bash

bun run dev          # Start development server

bun run build        # Build for production

bun run preview      # Preview production build

bun run lint         # Run ESLint

bun run lint:fix     # Fix ESLint issues

bun run type-check   # Run TypeScript compiler check

```

## 🎨 UI Components

The application uses **shadcn/ui** components built on top of **Radix UI** primitives:

### Base Components

- **Button** - Various button styles and sizes
- **Input** - Form input fields
- **Card** - Content containers
- **Dialog** - Modal dialogs
- **Dropdown** - Dropdown menus
- **Table** - Data tables
- **Skeleton** - Loading placeholders
- **Badge** - Status indicators

### Form Components

- **Label** - Form labels
- **Select** - Dropdown selectors
- **Checkbox** - Boolean inputs
- **RadioGroup** - Single choice options
- **Textarea** - Multi-line text input

### Navigation

- **Breadcrumb** - Navigation breadcrumbs
- **Tabs** - Tabbed content
- **Pagination** - Page navigation

## 🔐 Authentication Flow

### Login Process

1. User enters credentials or uses Google OAuth
2. JWT tokens stored in HTTP-only cookies
3. Automatic token refresh with interceptors
4. Role-based route protection

### Protected Routes

```typescript

// Admin routes require ADMIN or SUPER_ADMIN role

<Route path="/admin/*" element={withAuth(AdminDashboard,['ADMIN','SUPER_ADMIN'])} />


// User routes require USER role

<Route path="/user/*" element={withAuth(UserDashboard,['USER'])} />

```

## 🛒 E-commerce Features

### Product Catalog

- **Product Listing**: Grid/list view with filtering
- **Search & Filters**: By category, price, brand, size, color
- **Product Details**: Image gallery, variants, specifications
- **Related Products**: Recommendation system

### Shopping Cart

- **Add to Cart**: With variant selection (size, color)
- **Quantity Management**: Update item quantities
- **Price Calculation**: Real-time subtotal and total
- **Persistent Cart**: Survives browser refresh

### Checkout Process

1. **Cart Review**: Final item verification
2. **Shipping Details**: Address form with validation
3. **Payment Method**: COD, Card, Mobile Banking
4. **Order Confirmation**: Success page with order number

### Order Management

- **Order History**: View past orders with status
- **Order Tracking**: Real-time status updates
- **Order Details**: Comprehensive order information

## 📊 Admin Dashboard Features

### Dashboard Overview

- **Sales Statistics**: Revenue, order count, user metrics
- **Charts**: Sales trends, order status distribution
- **Recent Activity**: Latest orders and updates

### Product Management

- **Product CRUD**: Create, read, update, delete products
- **Variant Management**: Size, color, stock tracking
- **Image Upload**: Multiple product images
- **Category Management**: Organize products

### Order Management

- **Order List**: All orders with filtering
- **Status Updates**: Change order status
- **Order Details**: Comprehensive order view
- **Print Labels**: Shipping label generation

### User Management

- **User List**: All registered users
- **Role Management**: Assign user roles
- **User Analytics**: Registration trends

## 🎨 Theme System

The app supports three theme modes:

```typescript

typeTheme="light"|"dark"|"system";

```

### Theme Features

- **Automatic Detection**: System preference detection
- **Persistent Storage**: Theme choice saved in localStorage
- **Dynamic Switching**: Real-time theme changes
- **CSS Variables**: Consistent color system

### Theme Implementation

```typescript

const{ theme, setTheme }= useTheme();


// Switch theme

setTheme("dark");

setTheme("light");

setTheme("system");

```

## 🔄 State Management

### RTK Query Setup

```typescript

// Base API configuration

exportconst baseApi = createApi({

  reducerPath:"baseApi",

  baseQuery: axiosBaseQuery(),

  tagTypes:["AUTH","USER","PRODUCT","CART","ORDER"],

  endpoints:()=>({}),

});

```

### API Endpoints

- **authApi**: Login, logout, register, token refresh
- **productApi**: Product CRUD operations
- **cartApi**: Cart management
- **orderApi**: Order operations
- **userApi**: User profile and management

### Automatic Cache Management

```typescript

// Automatic cache invalidation

providesTags:["PRODUCT"],

invalidatesTags:["PRODUCT","CART"],

```

## 📱 Responsive Design

### Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile Features

- **Touch Optimized**: Touch-friendly interactions
- **Mobile Navigation**: Collapsible menu
- **Responsive Grid**: Adaptive product grid
- **Mobile Cart**: Optimized cart experience

## 🔧 Development Guidelines

### Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Airbnb configuration
- **Prettier**: Code formatting
- **Conventional Commits**: Commit message format

### Component Structure

```typescript

// Component template

interfaceComponentProps{

  title:string;

  items:Item[];

}


exportconstComponent:React.FC<ComponentProps>=({ title, items })=>{

return(

<div className="component-container">

{/* Component content */}

</div>

);

};

```

### Custom Hooks

```typescript

// Custom hook example

exportconst useProducts =(filters:ProductFilters)=>{

const{ data, isLoading, error }= useGetAllProductsQuery(filters);


return{

    products: data?.data ||[],

    isLoading,

    error,

    total: data?.meta?.total ||0,

};

};

```

## 🚀 Deployment

### Build Process

```bash

bun run build

```

### Deployment Checklist

- [ ] Environment variables configured
- [ ] API endpoints updated
- [ ] Build optimization enabled
- [ ] Error boundaries implemented
- [ ] SEO meta tags added

### Vercel Deployment

The app is deployed on Vercel with automatic deployments on push to main branch.

## 🧪 Performance Optimization

### Code Splitting

- **Route-based**: Automatic route code splitting
- **Component-based**: Lazy loading for heavy components
- **Vendor Splitting**: Separate vendor chunks

### Image Optimization

- **Lazy Loading**: Images load on scroll
- **WebP Format**: Modern image formats
- **Responsive Images**: Multiple sizes for different screens

### Bundle Analysis

```bash

bun run build --analyze

```

## 🐛 Error Handling

### Error Boundaries

```typescript

<ErrorBoundary fallback={<ErrorPage />}>

<App />

</ErrorBoundary>

```

### API Error Handling

- **Network Errors**: Retry mechanism
- **Authentication Errors**: Auto-redirect to login
- **Validation Errors**: User-friendly messages
- **Server Errors**: Fallback UI

## 🔒 Security Features

### Authentication Security

- **HTTP-only Cookies**: Secure token storage
- **CSRF Protection**: Cross-site request forgery prevention
- **XSS Protection**: Content Security Policy
- **Input Validation**: Client and server-side validation

### Route Protection

```typescript

exportconst withAuth =(Component:React.FC, allowedRoles:Role[])=>{

return(props:any)=>{

const{ user, isLoading }= useAuth();


if(isLoading)return<LoadingSpinner />;

if(!user)return<Navigate to="/login" />;

if(!hasPermission(user.role, allowedRoles))return<Unauthorized />;


return<Component{...props} />;

};

};

```

## 📈 Analytics Integration

### User Analytics

- **Page Views**: Track page navigation
- **User Interactions**: Button clicks, form submissions
- **Shopping Behavior**: Cart additions, purchases
- **Performance Metrics**: Loading times, error rates

## 🎯 SEO Optimization

### Meta Tags

- **Dynamic Titles**: Page-specific titles
- **Meta Descriptions**: SEO-friendly descriptions
- **Open Graph**: Social media sharing
- **Structured Data**: Product schema markup

## 🤝 Contributing

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Review Process

- [ ] Code passes all tests
- [ ] TypeScript compilation successful
- [ ] ESLint rules followed
- [ ] Responsive design verified
- [ ] Accessibility checked

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:

- **Email**: support@fabrico.com
- **Website**: https://fabrico-theta.vercel.app
- **Documentation**: https://fabrico-theta.vercel.app/docs

---

**Built with ❤️ by the Fabrico Team using Bun, React, and TypeScript**
