import User from "@/models/user";
import dbconnect from "@/lib/mongoose";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  await dbconnect();
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exist!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashedPassword,isAdmin: false });
    console.log(user);
    await user.save();
    console.log(user);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error in saving user" });
  }
}
