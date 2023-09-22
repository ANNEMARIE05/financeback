import { Schema, model } from "mongoose";

const payementSchema = new Schema({
    username:{
        type:String,
        require: true
    },
    contact:{
        type: Number,
        require: true
    },
    moyenDePayement:{
        type:String,
        require: true
    },
    montant:{
        type: Number,
        require: true
    }
},{
    timestamps: true
})
export default model("User", payementSchema)