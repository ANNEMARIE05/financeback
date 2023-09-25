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
    numeroCNI:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    compte:{
        balance:{
            type: Number,
            require: true
        },
        dateCreation:{
            type: Number,
            require: true
        },
        dateModification:{
            type: Number,
            require: true
        },
        transactions:[
            {
                idTransaction:{
                type: Number,
                require: true
                },
                type:{
                    type : String,
                    require:true
                },
                montant:{
                    type:Number,
                    require:true
                },
                status:{
                    type: String,
                    require: true
                },
                date: {
                    type: Number,
                    require: true
                },
                balanceAvant:{
                    type: Number,
                    require: true
                }
            }
        ]
    }
})
    
export default model("User", UserSchema) 