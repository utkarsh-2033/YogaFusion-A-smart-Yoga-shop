import dbConnect from '@/lib/mongoose';
import Product from '@/models/product';

export default async function handler(req, res) {
  await dbConnect();
  const { method, query } = req;

  switch (method) {
    case 'GET':
      try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    
    case 'POST':
      try {
        console.log("Request body:", req.body);
        const product = await Product.create(req.body);
        res.status(201).json({ success: true, data: product });
      } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case 'PUT':
      try {
        const { id } = query;
        const product = await Product.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!product) {
          return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ success: true, data: product });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case 'DELETE':
      try {
        const { id } = query;
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
          return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false, message: 'Method not allowed' });
      break;
  }
}