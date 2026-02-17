import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Calendar, User, Loader2, AlertCircle } from 'lucide-react';
import { api } from '../api/client';
import type { Order } from '../api/interfaces';

export default function OrderDetails() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadOrder(parseInt(id));
    }
  }, [id]);

  const loadOrder = async (orderId: number) => {
    try {
      setLoading(true);
      const data = await api.getOrder(orderId);
      setOrder(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load order');
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

  if (error || !order) {
    return (
      <div className="max-w-2xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-5 h-5" />
          Back to Products
        </Link>
        <div className="card bg-red-50 border-red-200">
          <div className="flex items-center gap-3 text-red-700">
            <AlertCircle className="w-5 h-5" />
            <p>{error || 'Order not found'}</p>
          </div>
        </div>
      </div>
    );
  }

  const orderDate = new Date(order.createdAt).toLocaleString();
  const hasDiscount = order.discount > 0;

  return (
    <div className="max-w-3xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="w-5 h-5" />
        Back to Products
      </Link>

      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-green-100 rounded-lg">
            <ShoppingBag className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Order #{order.id}</h1>
            <p className="text-gray-600">Order details and summary</p>
          </div>
        </div>

        {/* Order Info */}
        <div className="grid gap-4 md:grid-cols-2 mb-6">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <User className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-600">Customer</p>
              <p className="font-medium text-gray-900">{order.customerName}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <Calendar className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-600">Order Date</p>
              <p className="font-medium text-gray-900">{orderDate}</p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h2>
          <div className="space-y-3">
            {order.items.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{item.product.name}</p>
                  <p className="text-sm text-gray-600">
                    ${item.product.price.toFixed(2)} x {item.quantity}
                  </p>
                </div>
                <p className="font-semibold text-gray-900">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${(order.totalAmount + order.discount).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Total Items</span>
              <span>{order.items.reduce((sum, item) => sum + item.quantity, 0)}</span>
            </div>

            {hasDiscount && (
              <div className="flex justify-between text-green-600">
                <span>Discount ({(order.discount).toFixed(2)}$)</span>
              </div>
            )}

            <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t border-gray-200">
              <span>Final Total</span>
              <span className="text-primary-600">${order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
          <Link to="/" className="btn-secondary flex-1 text-center">
            Continue Shopping
          </Link>
          <Link to="/orders/new" className="btn-primary flex-1 text-center">
            Create New Order
          </Link>
        </div>
      </div>
    </div>
  );
}
