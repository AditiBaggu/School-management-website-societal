const mongoose=require("mongoose")
const Schema=mongoose.Schema

const detailsSchema=new Schema({
    mission:{type:String,required:true},
    vision:{type:String,required:true},
    description:{type:String,required:true},
    classes:{type:String,required:true},
    classNumber:[{type:String,required:true}],
    awards:{type:String,required:true},
    studentNumber:{type:String,required:true}, 
    image:{type:String,required:true} 
})
module.exports=mongoose.model("Detail",detailsSchema)