import API from "./api"

/* Start interview */

export const startInterview = async(data)=>{

const res = await API.post("/interview/start",data)

return res.data

}

/* Submit interview */

export const submitInterview = async(data)=>{

const res = await API.post("/interview/submit",data)

return res.data

}

/* Get interview history */

export const getInterviewHistory = async()=>{

const res = await API.get("/interview/history")

return res.data

}