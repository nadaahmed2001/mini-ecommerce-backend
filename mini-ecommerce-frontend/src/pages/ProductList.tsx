import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Package, AlertCircle, Loader2 } from 'lucide-react';
import { api } from '../api/client';
import type { Product } from '../api/interfaces';

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await api.getProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="card bg-red-50 border-red-200">
        <div className="flex items-center gap-3 text-red-700">
          <AlertCircle className="w-5 h-5" />
          <p>{error}</p>
        </div>
        <button onClick={loadProducts} className="btn-secondary mt-4">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">Manage your product inventory</p>
        </div>
        <Link to="/products/new" className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="card text-center py-12">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No products yet</h3>
          <p className="text-gray-500 mt-1">Get started by adding your first product</p>
          <Link to="/products/new" className="btn-primary inline-flex items-center gap-2 mt-4">
            <Plus className="w-5 h-5" />
            Add Product
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div key={product.id} className="card hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                  <p className="text-2xl font-bold text-primary-600 mt-2">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${product.stock > 10
                  ? 'bg-green-100 text-green-800'
                  : product.stock > 0
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                  }`}>
                  {product.stock} in stock
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
