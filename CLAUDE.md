# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based e-commerce website for "Verma and Company", a plumbing supplies business. It's built with Vite + TypeScript + React + Tailwind CSS, featuring a shopping cart system and product catalog.

## Technology Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3
- **Routing**: React Router DOM 7
- **Animations**: Framer Motion 12
- **Icons**: Lucide React
- **UI Components**: Swiper for carousels

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Preview production build
npm run preview
```

## Architecture

### State Management
- **Cart State**: Managed via React Context (`src/context/CartContext.tsx`)
- Uses `useReducer` for cart operations (add, remove, update quantity, clear)
- Cart state includes items array and total price calculation

### Routing Structure
- **Home** (`/`) - Landing page with hero section and featured products
- **Shop** (`/shop`) - Product listing page
- **Categories** (`/categories`) - Product categories overview  
- **Cart** (`/cart`) - Shopping cart management
- **Checkout** (`/checkout`) - Order completion
- **About** (`/about`) - Company information
- **Contact** (`/contact`) - Contact form and details

### Component Structure
```
src/
├── components/           # Reusable UI components
│   ├── CategoryCard.tsx  # Category display cards
│   ├── Footer.tsx        # Site footer
│   ├── Navbar.tsx        # Navigation header
│   └── ProductCard.tsx   # Product display cards
├── context/              # React Context providers
│   └── CartContext.tsx   # Shopping cart state management
├── data/                 # Static data
│   └── products.ts       # Product and category data
├── pages/                # Route components
│   ├── Home.tsx          # Landing page
│   ├── Shop.tsx          # Product catalog
│   ├── Categories.tsx    # Category listing
│   ├── Cart.tsx          # Shopping cart
│   ├── Checkout.tsx      # Order completion
│   ├── About.tsx         # Company info
│   └── Contact.tsx       # Contact page
└── App.tsx               # Main app component with routing
```

### Data Models
- **Product**: Interface with id, name, price, image, category, description
- **CartItem**: Extends Product with quantity field
- **CartState**: Contains items array and total price

### Styling Approach
- Uses Tailwind CSS for utility-first styling
- Responsive design with mobile-first approach
- Framer Motion for page transitions and animations
- Swiper for interactive carousels

## Key Features
- Product catalog with categories (Pipes, Tiles, Bathroom Accessories, Kitchen, Water Tanks, Tools)
- Shopping cart with add/remove/quantity management
- Responsive design for desktop and mobile
- Smooth page transitions with Framer Motion
- Image optimization with external CDN (Pexels)

## Build Configuration
- Vite configured with React plugin
- ESLint with TypeScript and React plugins
- Tailwind CSS with PostCSS
- Excludes `lucide-react` from optimization bundle