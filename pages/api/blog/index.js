
import dbconnect from "@/lib/mongoose";
import Blog from "@/models/blog";

export default async function handler(req,res){
    await dbconnect();
    const {method} =req;
    switch(method){
        case 'GET':
            try{
                const blogs=await Blog.find({});
            res.status(200).json({success:true, data:blogs})
            }catch(error){
                console.log(error);
                res.status(400).json({success:false});
            }
            break;
            default: res.status(400).json({sucsess:false})
    }
}