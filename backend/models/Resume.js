import mongoose from "mongoose"

const resumeSchema = new mongoose.Schema({

  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  file:String,

  skills:[String]

})

export default mongoose.model("Resume",resumeSchema)