import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    preview: { type: String, required: true },
    content: { type: String, required: true }, 
    author: { type: String, required: true },
    image: { type: String, required: true }
});

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
