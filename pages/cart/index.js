import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchCartItems = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }
      try {
        const res = await fetch('/api/cart', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        if (data.success) {
          setCartItems(data.data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError('Error fetching cart data');
      } finally {
        setLoading(false);
      }
    };
    fetchCartItems();
  }, [router]);

  const handleRemoveItem = async (productId) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('/api/cart/remove', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      if (data.success) {
        setCartItems(cartItems.filter(item => item.product._id !== productId));
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Error removing item from cart');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. <Link href="/products">Continue shopping</Link></p>
      ) : (
        <ul className="space-y-4">
          {cartItems.map(item => (
            <li key={item._id} className="border p-4 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">{item.product.name}</h2>
                <p>{item.product.description}</p>
                <p className="font-bold">{item.product.price} INR</p>
                <p className='font-semibold'>Quantity: {item.quantity}</p>
              </div>
              <button
                onClick={() => handleRemoveItem(item.product._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400 transition duration-200"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
