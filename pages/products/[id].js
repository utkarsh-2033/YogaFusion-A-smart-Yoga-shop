const ProductDetail = ({ product }) => {
  const addtocartHandler = async () => {
    try {
      const res = await fetch('/api/cart/add', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify({ productId: product._id })
      });
      const data = await res.json();
      if (res.ok) {
        console.log('Product added to cart:', data);
      } else {
        console.error('Error adding product to cart:', data.message);
      }
    } catch (error) {
      console.error('addtocart from productdetail', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-16 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden md:flex md:items-center">
        <div className="md:w-1/2">
          <img
            src={product.image || "/default-image.jpg"}
            alt={product.name || "Product Image"}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-8 md:w-1/2">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <p className="text-2xl font-semibold text-red-600 mb-6">${product.price}</p>
          <button
            onClick={addtocartHandler}
            className="px-6 py-3 bg-blue-600 text-white text-sm font-bold uppercase rounded hover:bg-blue-500 transition duration-200"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const baseUrl=process.env.BASE_URL;
  try{
    const res = await fetch(`${baseUrl ? baseUrl : 'http://localhost:3000'}/api/product/${params.id}`);
    const data = await res.json();
    console.log("Fetched product:", data);
    const product = data.data;

    if (!product) {
      return { notFound: true }; 
    }

    return { props: { product } };
  } catch (error) {
    console.error("Error fetching product:", error);
    return { props: { product: null } }; 
  }
}

export default ProductDetail;
