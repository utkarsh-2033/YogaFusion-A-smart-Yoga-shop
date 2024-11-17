import Link from "next/link";
import { FaInstagram, FaShoppingCart } from "react-icons/fa";
import ProductCard from "@/components/Product/ProductCard";
import dbconnect from "@/lib/mongoose";


const  Home=({products})=> {
 
  return (
    <div className="bg-gray-100 min-h-screen">
      <header
        className="bg-cover bg-center h-screen"
        style={{
          backgroundImage:
            "url('assets/hero.png')",
        }}
      >
        <div className="bg-black bg-opacity-50 h-full flex items-center justify-center">
          <div className="text-center text-white max-w-2xl">
            <h1 className="text-3xl md:text-6xl font-bold mb-6 mx-1">
              Welcome to YogaFusion-Smart Yoga Shop
            </h1>
            <p className="text-2xl mb-8">
              Discover the best smart yoga products to enhance your practice.
            </p>
            <Link href="/products">
              <div className="inline-block bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
                Shop Now <FaShoppingCart className="inline-block ml-2" />
              </div>
            </Link>
          </div>
        </div>
      </header>
      <main className="py-16">
        <section className="mb-16 px-4 md:px-8 lg:px-16 xl:px-32">
          {" "}
          <h2 className="text-4xl font-bold text-center mb-8">
            Our Products
          </h2>{" "}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {" "}
            {products.slice(0, 3).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}{" "}
          </div>
        </section>
        <section className="mb-16 px-4 md:px-8 lg:px-16 xl:px-32">
          <h2 className="text-4xl font-bold text-center mb-8">
            Benefits of Smart Yoga Products
          </h2>
          <p className="text-lg leading-relaxed text-center mx-auto max-w-3xl">
            Our smart yoga products are designed to enhance your practice,
            providing real-time feedback, improving your posture, and helping
            you achieve your fitness goals more efficiently.
          </p>
        </section>
        <section className="text-center px-4 md:px-8 lg:px-16 xl:px-32">
          <h2 className="text-4xl font-bold mb-8">Join Our Community</h2>
          <p className="text-lg leading-relaxed mb-6">
            Follow us on social media for the latest updates, tips, and
            exclusive offers.
          </p>
          <Link href="/instagram">
            <div className="inline-block bg-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-pink-700 transition duration-300">
              Follow Us on Instagram{" "}
              <FaInstagram className="inline-block ml-2" />
            </div>
          </Link>
        </section>
      </main>
    </div>
  );
}

export async function getServerSideProps(){
   const baseUrl=process.env.BASE_URL;
  try{
    const res = await fetch(`${baseUrl ? baseUrl : 'http://localhost:3000'}/api/product`);
    const data=await res.json();
    const products=data.data || [];
  
    return {
      props: {products}
    }
  }
  catch(error){
    console.log(error);
    return {
      props: {products:[]}
    }
  }

}

export default Home;
