import mongoose from "mongoose";
let mongodbUrl=process.env.MONGODB_URL;

let cached=global.mongoose;

if(!cached){
    cached=global.mongoose={conn:null , promise: null};
}

const dbconnect=async()=>{
    if(cached.conn){
        return cached.conn;
    }
    if(!cached.promise){
        const opts={
            bufferCommands:false
        }

        cached.promise=mongoose.connect(mongodbUrl,opts).then(mongoose=>{
            return mongoose;
        })
    }
    console.log("connected succesfully")
    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbconnect;


