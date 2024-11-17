import dbconnect from '@/lib/mongoose';
import Product from '@/models/product';

export default async function handler(req, res) {
  const { id } = req.query;
  
  await dbconnect();

  try {
    const product = await Product.findById(id);
    console.log(id)

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    console.log('Fetched product:', product);
    console.log('Response status:', res.status);
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}
