import mongoose from "mongoose";
const youth={
name:{
    type:String,
    required:true,
    trim:true
},
contact:{
  type:String,
  required:true

},
email:{
    type:String,
    required:true
},
comments:{
    type:String,
    default:"good"
    
}

}
const youthschem=new mongoose.Schema(youth,{timestamps:true});
export const youthmodel=mongoose.model("youth",youthschem);


