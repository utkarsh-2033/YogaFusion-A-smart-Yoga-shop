import { useState, useEffect } from "react";
import ProductCard from "@/components/Product/AdminProductCard";
import { useRouter } from "next/router";

const ManageProducts = ({ products }) => {
  const [productList, setProductList] = useState(products);
  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    if (!isAdmin) {
      router.push("/");
      return;
    }
  }, [router]);
  const handleEdit = (id) => {
    router.push(`/admin/add-product?productId=${id}`);
  };

  const handleDelete = async (productId) => {
    try {
      const res = await fetch(`/api/product?id=${productId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProductList(
          productList.filter((product) => product._id !== productId)
        );
      } else {
        console.error("Failed to delete product");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="container mx-auto py-16 px-4 md:px-8 lg:px-16 xl:px-32">
        <h1 className="text-5xl font-bold text-center mb-12 text-gray-800">
          Manage Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-8">
          {productList.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const res = await fetch("http://localhost:3000/api/product");
    const data = await res.json();
    const products = data.data;
    return { props: { products } };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { props: { products: [] } };
  }
}

export default ManageProducts;
