import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Package } from 'lucide-react';
import ProductList from './pages/ProductList';
import CreateProduct from './pages/CreateProduct';
import CreateOrder from './pages/CreateOrder';
import OrderDetails from './pages/OrderDetails';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center gap-8">
                <Link to="/" className="flex items-center gap-2 text-primary-600 font-bold text-xl">
                  <Package className="w-8 h-8" />
                  <span>MiniEcommerce</span>
                </Link>
                <div className="hidden md:flex items-center gap-4">
                  <Link to="/" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
                    Products
                  </Link>
                  <Link to="/orders/new" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
                    New Order
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/products/new" element={<CreateProduct />} />
            <Route path="/orders/new" element={<CreateOrder />} />
            <Route path="/orders/:id" element={<OrderDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
