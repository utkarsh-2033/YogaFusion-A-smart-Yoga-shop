import ProductCard from "@/components/Product/ProductCard";
const ProductList = ({ products }) => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {" "}
      <main className="container mx-auto py-16 px-4 md:px-8 lg:px-16 xl:px-32">
        {" "}
        <h1 className="text-5xl font-bold text-center mb-12 text-gray-800">
          Our Products
        </h1>{" "}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-8">
          {" "}
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}{" "}
        </div>{" "}
      </main>
    </div>
  );
};

export async function getServerSideProps() {
  const baseUrl=process.env.BASE_URL;
  try{
    const res = await fetch(`${baseUrl ? baseUrl : 'http://localhost:3000'}/api/product`);
    const data = await res.json();
    const products = data.data;
    return { props: { products } };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { props: { products: [] } };
  }
}

export default ProductList;
