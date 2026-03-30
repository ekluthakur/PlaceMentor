import mongoose from "mongoose"

const interviewSchema = new mongoose.Schema({

  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  interviewScore:Number,
  skillMatch:Number,
  resumeScore:Number,
  marketDemand:Number,

  prs:Number,

  createdAt:{
    type:Date,
    default:Date.now
  }

})

export default mongoose.model("Interview",interviewSchema)