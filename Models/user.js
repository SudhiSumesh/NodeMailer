const mongoose=require('mongoose')

// user schema
const user=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    otp:{
        type:Number
    }
})
module.exports=mongoose.model("user",user)