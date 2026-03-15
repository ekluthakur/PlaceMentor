import API from "./api"

/* Upload resume */

export const uploadResume = async(file)=>{

const formData = new FormData()

formData.append("resume",file)

const res = await API.post("/resume/upload",formData)

return res.data

}

/* Get ATS analysis */

export const getResumeAnalysis = async(id)=>{

const res = await API.get(`/resume/${id}`)

return res.data

}