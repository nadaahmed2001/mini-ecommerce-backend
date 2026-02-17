# Mini E-Commerce Frontend

A modern React frontend built with Vite and Tailwind CSS for the Mini E-Commerce backend.

## Features

- **Product Management**: View all products, add new products with validation
- **Order Creation**: Create orders with customer info, add multiple items, real-time discount calculation
- **Order Details**: View complete order information with discount breakdown
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Real-time Updates**: Stock validation and discount calculations (5% for 2-4 items, 10% for 5+ items)

## Tech Stack

- React 19 + TypeScript
- Vite (fast build tool)
- Tailwind CSS (utility-first styling)
- React Router (navigation)
- Lucide React (icons)

## Getting Started

### Prerequisites

- Node.js 18+
- Backend API running on `http://localhost:5000`

### Installation

```bash
cd mini-ecommerce-frontend
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── api/
│   └── client.ts          # API client for backend communication
├── pages/
│   ├── ProductList.tsx    # List all products (home page)
│   ├── CreateProduct.tsx  # Add new product form
│   ├── CreateOrder.tsx    # Create order with cart
│   └── OrderDetails.tsx   # View order details
├── App.tsx                # Main app with routing
└── index.css              # Tailwind directives + custom styles
```

## API Integration

The frontend connects to the ASP.NET Core backend at `http://localhost:5000/api`:

- `GET /products` - List all products
- `POST /products` - Create new product
- `POST /orders` - Create order
- `GET /orders/:id` - Get order details

## Pages

1. **Products** (`/`) - View all products with stock badges, navigate to create product or new order
2. **Create Product** (`/products/new`) - Form to add new product with name, price, and stock
3. **New Order** (`/orders/new`) - Shopping cart interface with product selection, quantity, discount preview
4. **Order Details** (`/orders/:id`) - Complete order view with itemized list and discount breakdown

## Discount Logic

- 2-4 items: 5% discount
- 5+ items: 10% discount
- Discount is calculated on the subtotal and displayed in order summary
