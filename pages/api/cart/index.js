import authmiddleware from "@/middleware/auth";
import User from "@/models/user";
import dbconnect from "@/lib/mongoose";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  await authmiddleware(req, res, async () => {
    try {
      await dbconnect(); 
      const user = await User.findById(req.user._id).populate("cart.product"); 
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" }); 
      }

      const cart = user.cart;
      return res.status(200).json({ success: true, data: cart }); 
    } catch (error) {
      console.error("/api/cart", error); 
      return res.status(500).json({ success: false, message: "Server error" });
    }
  });
}
