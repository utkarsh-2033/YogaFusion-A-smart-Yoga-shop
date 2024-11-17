import dbconnect from "@/lib/mongoose";
import User from "@/models/user";
import authmiddleware from "@/middleware/auth";
import Product from "@/models/product";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }
  
  const { productId } = req.body;
  await authmiddleware(req, res, async () => {
    try {
      await dbconnect();
      const user = await User.findOne({ _id: req.user._id });
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "user not found" });
      }
      const product = await Product.findById(productId);
      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "product not found" });
      }
      user.cart.filter((id)=>{id.toString()!==productId})
      await user.save();
      res.status(200).json({ success: true, data: user.cart });
    } catch (error) {
      console.log("api/cart/remove", error);
      return res.status(500).json({ success: false, message: "sevor error" });
    }
  });
}
