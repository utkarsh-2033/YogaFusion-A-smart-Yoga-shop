import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  FaHome,
  FaProductHunt,
  FaBlog,
  FaInstagram,
  FaSignInAlt,
  FaUserPlus,
  FaShoppingCart,
  FaUserCog,
} from "react-icons/fa";

const Navbar = () => {
  const [isLoggedIn, setisLoggedin] = useState(false);
  const [isAdmin, setisAdmin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const Admin = localStorage.getItem("isAdmin");
    if (!!token) {
      setisLoggedin(true);
    }
    if (Admin === "true") {
      setisAdmin(true);
    }
  }, [router]);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    setisLoggedin(false);
    setisAdmin(false);
    router.push("/login");
  };

  const getLinkClass = (path) => {
    return router.pathname === path
      ? "py-2 px-3 flex items-center bg-blue-600 text-white rounded-lg"
      : "py-2 px-3 flex items-center text-white hover:bg-gray-700 rounded-lg transition duration-200";
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-900 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <div>
              <Link href="/" className="flex items-center py-5 px-2 text-white">
                <img
                  src="/assets/logo.jpg"
                  alt="YogaFusion"
                  className="h-8 w-8 mr-2"
                />
                <span className="font-bold">YogaFusion</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <Link href="/" className={getLinkClass("/")}>
                <FaHome className="mr-1" /> Home
              </Link>
              <Link href="/products" className={getLinkClass("/products")}>
                <FaProductHunt className="mr-1" /> Products
              </Link>
              <Link href="/blogs" className={getLinkClass("/blogs")}>
                <FaBlog className="mr-1" /> Blog
              </Link>
              <Link
                href="/instagram-feed"
                className={getLinkClass("/instagram-feed")}
              >
                <FaInstagram className="mr-1" /> Instagram Feed
              </Link>
              {isLoggedIn  && (
                <Link href="/cart" className={getLinkClass("/cart")}>
                  <FaShoppingCart className="mr-1" /> Cart
                </Link>
              )}
              {isAdmin && isLoggedIn && (
                <div className="relative inline-block text-left">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    <FaUserCog className="mr-1" /> Admin
                  </button>
                  {isOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                      <Link href="/admin/add-product" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                        Add Product
                      </Link>
                      <Link href="/admin/manage-product" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                        Manage Products
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            {!isLoggedIn && (
              <Link
                href="/login"
                className="py-2 px-3 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition duration-200 flex items-center"
              >
                <FaSignInAlt className="mr-1" /> Login
              </Link>
            )}
            {!isLoggedIn && (
              <Link
                href="/signup"
                className="py-2 px-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition duration-200 flex items-center"
              >
                <FaUserPlus className="mr-1" /> Sign Up
              </Link>
            )}
            {isLoggedIn && (
              <button
                onClick={logoutHandler}
                className="py-2 px-3 bg-red-600 text-white rounded-lg hover:bg-red-400 transition duration-200 flex items-center"
              >
                <FaSignInAlt className="mr-1" /> Logout
              </button>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="mobile-menu-button">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div
        className={`md:hidden ${isMenuOpen ? "block" : "hidden"} mt-4 space-y-2`}
      >
        <Link
          href="/"
          className="py-2 px-4 text-sm text-white flex items-center hover:bg-gray-700 rounded-lg transition duration-200"
        >
          <FaHome className="mr-1" /> Home
        </Link>
        <Link
          href="/products"
          className="py-2 px-4 text-sm text-white flex items-center hover:bg-gray-700 rounded-lg transition duration-200"
        >
          <FaProductHunt className="mr-1" /> Products
        </Link>
        <Link
          href="/blogs"
          className="py-2 px-4 text-sm text-white flex items-center hover:bg-gray-700 rounded-lg transition duration-200"
        >
          <FaBlog className="mr-1" /> Blog
        </Link>
        <Link
          href="/instagram-feed"
          className="py-2 px-4 text-sm text-white flex items-center hover:bg-gray-700 rounded-lg transition duration-200"
        >
          <FaInstagram className="mr-1" /> Instagram Feed
        </Link>
        {isLoggedIn && (
          <Link
            href="/cart"
            className="py-2 px-4 text-sm text-white flex items-center hover:bg-gray-700 rounded-lg transition duration-200"
          >
            <FaShoppingCart className="mr-1" /> Cart
          </Link>
        )}
        {isAdmin && isLoggedIn && (
          <div className="relative ml-32 inline-block text-right">
            <button
              onClick={toggleDropdown}
              className="flex items-center py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              <FaUserCog className="mr-1" /> Admin
            </button>
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                <Link href="/admin/add-product" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                  Add Product
                </Link>
                <Link href="/admin/manage-product" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                  Manage Products
                </Link>
              </div>
            )}
          </div>
        )}
        {!isLoggedIn && (
          <Link
            href="/login"
            className="py-2 px-4 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-400 transition duration-200 flex items-center mt-2"
          >
            <FaSignInAlt className="mr-1" /> Login
          </Link>
        )}
        {!isLoggedIn && (
          <Link
            href="/signup"
            className="py-2 px-4 text-sm text-white bg-gray-600 rounded-lg hover:bg-gray-500 transition duration-200 flex items-center mt-2"
          >
            <FaUserPlus className="mr-1" /> Sign Up
          </Link>
        )}
        {isLoggedIn && (
          <button
            onClick={logoutHandler}
            className="py-2 px-4 text-sm text-white bg-red-600 rounded-lg hover:bg-red-400 transition duration-200 flex items-center mt-2"
          >
            <FaSignInAlt className="mr-1" /> Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
