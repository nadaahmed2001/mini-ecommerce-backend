import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Plus, Trash2, Loader2 } from 'lucide-react';
import { api } from '../api/client';
import type { OrderItemDto, Product } from '../api/interfaces';

interface CartItem extends OrderItemDto {
  productName: string;
  productPrice: number;
}

export default function CreateOrder() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState('1');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await api.getProducts();
      setProducts(data.filter(p => p.stock > 0));
    } catch (err) {
      setError('Failed to load products');
    }
  };

  const addToCart = () => {
    if (!customerName.trim()) {
      setError('Please enter customer name');
      return;
    }
    const productId = parseInt(selectedProduct);
    const qty = parseInt(quantity);
    const product = products.find(p => p.id === productId);



    if (!product || qty <= 0) return;

    const existingItem = cart.find(item => item.productId === productId);
    if (existingItem) {
      setCart(cart.map(item =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + qty }
          : item
      ));
    } else {
      setCart([...cart, {
        productId,
        quantity: qty,
        productName: product.name,
        productPrice: product.price
      }]);
    }

    setSelectedProduct('');
    setQuantity('1');
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.productId !== productId));
  };

  const calculateTotals = () => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);//sum all quantities
    const subtotal = cart.reduce((sum, item) => sum + (item.productPrice * item.quantity), 0);

    let discount = 0;
    if (totalItems >= 5) discount = 0.10;
    else if (totalItems >= 2) discount = 0.05;

    const discountAmount = subtotal * discount;
    const finalTotal = subtotal - discountAmount;

    return { subtotal, discount, discountAmount, finalTotal, totalItems };
  };

  const handleSubmit = async () => {


    if (cart.length === 0) {
      setError('Please add items to the order');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const orderItems: OrderItemDto[] = cart.map(({ productId, quantity }) => ({
        productId,
        quantity
      }));

      const order = await api.createOrder({
        customerName: customerName.trim(),
        items: orderItems
      });

      navigate(`/orders/${order.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  const totals = calculateTotals();

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="w-5 h-5" />
        Back to Products
      </Link>

      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-primary-100 rounded-lg">
          <ShoppingCart className="w-6 h-6 text-primary-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create Order</h1>
          <p className="text-gray-600">Add items to create a new order</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Add Items Section */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Add Items</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product</label>
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="input-field"
              >
                <option value="">Select a product</option>
                {products.map(product => (
                  <option key={product.id} value={product.id}>
                    {product.name} - ${product.price.toFixed(2)} ({product.stock} in stock)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter customer name"
                className="input-field"
              />
            </div>

            <button
              onClick={addToCart}
              disabled={!selectedProduct || !customerName.trim()}
              className="btn-primary mt-6 w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-5 h-5" />
              Add to Order
            </button>
          </div>


        </div>

        {/* Order Summary Section */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>

          {cart.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No items added yet</p>
          ) : (
            <>
              <div className="space-y-3 mb-6">
                {cart.map((item) => (
                  <div key={item.productId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{item.productName}</p>
                      <p className="text-sm text-gray-600">
                        ${item.productPrice.toFixed(2)} x {item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="font-medium text-gray-900">
                        ${(item.productPrice * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${totals.subtotal.toFixed(2)}</span>
                </div>

                {totals.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({(totals.discount * 100).toFixed(0)}%)</span>
                    <span>-${totals.discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>${totals.finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading || !customerName.trim()}
                className="btn-primary w-full mt-6 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Order'
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
