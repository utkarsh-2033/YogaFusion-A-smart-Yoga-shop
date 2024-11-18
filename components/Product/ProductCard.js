// import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product }) {
  const router = useRouter();
  const addtocartHandler = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    try {
      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: product._id }),
      });
      const data = await res.json();
      if (res.ok) {
        console.log("Product added to cart:", data);
      } else {
        console.error("Error adding product to cart:", data.message);
      }
    } catch (error) {
      console.error("addtocartHandler error:", error);
    }
  };
  return (
    <div className={styles.card}>
      <img
        src={product.image}
        alt={product.name}
        // width={500} // Specify width (or use layout="intrinsic")
        // height={300} // Specify height (or use layout="intrinsic")
        className={styles.image}
      />
      <div className={styles.info}>
        <h3 className={styles.title}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>
        <p className={styles.price}>${product.price}</p>
        <Link href={`/products/${product._id}`} className={styles.link}>
          View Details
        </Link>
        <button
          onClick={addtocartHandler}
          className="ml-1 mt-1 px-6 py-3 bg-green-600 text-white text-sm font-bold uppercase rounded hover:bg-green-400 transition duration-200"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
