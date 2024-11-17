import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const router = useRouter();
  const { productId } = router.query;

  useEffect(() => {
    const checkAdmin = () => {
      const isAdmin = localStorage.getItem('isAdmin') === 'true';
      if (!isAdmin) {
        router.push('/');
        return false;
      }
      return true;
    };

    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/product/${productId}`);
        if (!res.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data = await res.json();
        const product = data.data;

        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setImage(product.image);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    if (checkAdmin() && productId) {
      fetchProduct();
    }
  }, [productId, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = { name, description, price: parseFloat(price), image };

    try {
      const res = await fetch(`/api/product${productId ? `?id=${productId}` : ''}`, {
        method: productId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (res.ok) {
        router.push('/admin/manage-product');
      } else {
        console.error('Failed to save product');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">{productId ? 'Edit Product' : 'Add New Product'}</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            ></textarea>
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input
              type="text"
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
          >
            {productId ? 'Update Product' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
