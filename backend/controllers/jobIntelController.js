import axios from "axios"

export const getJobs = async(req,res)=>{

  const response = await axios.get(
    "https://www.arbeitnow.com/api/job-board-api"
  )

  res.json(response.data)

}