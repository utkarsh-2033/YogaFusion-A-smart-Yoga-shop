
import dbConnect from "@/lib/mongoose";
import User from "@/models/user";
import authMiddleware from "@/middleware/auth";
import Product from "@/models/product";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    await new Promise((resolve, reject) => {
      authMiddleware(req, res, (result) => (result instanceof Error ? reject(result) : resolve(result)));
    });

    await dbConnect();
    const { productId } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    const product=await Product.findById(productId);

    const existingCartItem = user.cart.find(item => item.product.toString() === productId);

    if (existingCartItem) {
      existingCartItem.quantity += 1;
    } else {
      user.cart.push({ product: product._id, quantity: 1 });
    }

    await user.save();
    res.status(200).json({ success: true, data: user.cart });
  } catch (error) {
    console.log("api/cart/add error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}
