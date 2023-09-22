import mongoose from "mongoose";


export const ConnectDB = async ()=>{
    const uri = process.env.MONGODB_URL;
    if(!uri) throw new Error('error')
    await mongoose.connect(uri, {
        dbName: "financeDB"
    })

}