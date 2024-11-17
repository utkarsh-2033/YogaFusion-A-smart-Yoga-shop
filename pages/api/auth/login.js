import dbconnect from "@/lib/mongoose";
import User from "@/models/user";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  await dbconnect();
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Email doesnot exist!" });
    }
    const isMatch =  user.matchPassword(password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Password" });
    }
    const token = jwt.sign({ userId: user._id ,isAdmin: user.isAdmin}, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log(user.isAdmin)
    res.status(200).json({ success: true, token });
  } catch (error) {
    console.log("auth/login",error);
    res.status(500).json({success:false,message:"servor error"});
  }
}
