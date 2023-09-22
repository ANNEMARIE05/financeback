import { Schema , model} from "mongoose";

const UserSchema = new Schema({
    username:{
        type:String,
        require: true
    },
    contact:{
        type: Number,
        require: true
    },
    email:{
        type:String,
        require: true
    },
    password:{
        type: String,
        require: true
    }
})
    
export default model("User", UserSchema) 