import express from "express"
import axios from "axios"

const router = express.Router()

router.post("/parse", async (req,res)=>{

try{

const { fileUrl } = req.body

const response = await axios.post(
"https://api.affinda.com/v2/resumes",
{
url: fileUrl
},
{
headers:{
Authorization:"Bearer YOUR_AFFINDA_KEY"
}
}
)

res.json(response.data)

}catch(err){
res.status(500).json({msg:"Resume parse failed"})
}

})

export default router