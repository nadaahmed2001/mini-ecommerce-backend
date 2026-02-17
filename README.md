# Mini E-Commerce

A full-stack e-commerce application built with ASP.NET Core Web API backend and React + TypeScript frontend.

## 🎯 Features

### Backend (ASP.NET Core)
- **Product Management**: Create products with name, price, and stock.
- **Order Management**: Create orders with customer information and multiple items
- **Stock Validation**: Real-time stock checking when creating orders
- **Discount System**:
  - 2-4 items → 5% discount
  - 5+ items → 10% discount
- **Order Details**: View complete order information
- **Entity Framework Core**: SQL Server database with migrations
- **RESTful API**: Clean API design following REST principles

### Frontend (React + Vite + Tailwind CSS)
- **Modern UI**: Responsive design with Tailwind CSS v4
- **Product List**: View all products with stock status badges
- **Create Product**: Form with validation for adding new products
- **Create Order**: Shopping cart interface with real-time discount preview
- **Order Details**: Complete order view with discount breakdown
- **Type Safety**: Full TypeScript support
- **Fast Development**: Vite for instant HMR

## 🏗️ Project Structure

```
mini-ecommerce-backend/
├── mini-ecommerce-backend/          # ASP.NET Core Web API
│   ├── Controllers/
│   │   ├── ProductsController.cs    # Product CRUD endpoints
│   │   └── OrdersController.cs      # Order creation & retrieval
│   ├── Models/
│   │   ├── Product.cs               # Product entity
│   │   ├── Order.cs                 # Order entity
│   │   └── OrderItem.cs             # Order item entity
│   ├── DTOs/
│   │   └── CreateOrderDto.cs        # Order creation DTO
│   ├── Data/
│   │   └── MyContext.cs             # Entity Framework DbContext
│   └── Program.cs                   # App configuration with CORS
│
└── mini-ecommerce-frontend/         # React + TypeScript Frontend
    ├── src/
    │   ├── api/
    │   │   ├── client.ts            # API client with fetch
    │   │   └── interfaces.ts        # TypeScript interfaces
    │   ├── pages/
    │   │   ├── ProductList.tsx      # Products listing page
    │   │   ├── CreateProduct.tsx    # Add product form
    │   │   ├── CreateOrder.tsx      # Shopping cart page
    │   │   └── OrderDetails.tsx     # Order view page
    │   ├── App.tsx                  # Main app with routing
    │   ├── main.tsx                 # React entry point
    │   └── index.css                # Tailwind styles
    └── index.html                   # HTML template
```

## 🚀 Getting Started

### Prerequisites
- .NET 7.0 SDK
- Node.js 18+
- SQL Server (or SQL Server Express)

### Backend Setup

1. **Navigate to backend folder:**
   ```bash
   cd mini-ecommerce-backend
   ```

2. **Update database connection string** in `appsettings.json` if needed.

3. **Run migrations** (optional - database will be created automatically):
   ```bash
   dotnet ef database update
   ```

4. **Start the backend:**
   ```bash
   dotnet run
   ```

   The API will be available at `http://localhost:5101`

### Frontend Setup

1. **Navigate to frontend folder:**
   ```bash
   cd mini-ecommerce-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   The app will open at `http://localhost:5173` (or next available port)

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List all products |
| POST | `/api/products` | Create new product |
| POST | `/api/orders` | Create new order |
| GET | `/api/orders/{id}` | Get order details |

## 🛠️ Technologies Used

### Backend
- ASP.NET Core 7.0
- Entity Framework Core
- SQL Server
- Swagger/OpenAPI

### Frontend
- React 19
- TypeScript
- Vite 7
- Tailwind CSS v4
- React Router v7
- Lucide React Icons

## 📝 Development Notes

### CORS Configuration
The backend is configured to accept requests from `http://localhost:5173` and `http://localhost:5174` (Vite default ports). If your frontend runs on a different port, update the CORS policy in `Program.cs`.

### Database
- The application uses Entity Framework Core with SQL Server
- Database is created automatically on first run
- Connection string is configured in `appsettings.json`

### Screenshots
<img width="1000" height="961" alt="image" src="https://github.com/user-attachments/assets/ead84f9c-f9f1-4460-8a89-777f9d0e8e0e" />
<img width="1000" height="970" alt="image" src="https://github.com/user-attachments/assets/9e22c1cd-f5d4-4926-b95e-b3649e0148ee" />
<img width="1000" height="964" alt="image" src="https://github.com/user-attachments/assets/d2b4fb9b-7e15-4eb1-8f2f-ad17ca8cce80" />

