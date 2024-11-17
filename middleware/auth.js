import jwt from "jsonwebtoken";
import User from "@/models/user";
import dbconnect from "@/lib/mongoose";

const authmiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(400).json({ success: false, message: 'unauthorized' });
  }
  const token = authorization.split(' ')[1];
  try {
    await dbconnect();
    const decoder = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoder.userId });
    if (!user) {
      return res.status(400).json({ success: false, message: 'unauthorized' });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log('authmiddleware', error);
    return res.status(400).json({ success: false, message: 'unauthorized' });
  }
};


export const adminCheck = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ success: false, message: 'Admin access required' });
  }
  next();
};

export default authmiddleware;
