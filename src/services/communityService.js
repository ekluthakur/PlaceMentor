import API from "./api"

export const getPosts = async()=>{

const res = await API.get("/community/posts")

return res.data

}

export const createPost = async(data)=>{

const res = await API.post("/community/create",data)

return res.data

}

export const likePost = async(id)=>{

const res = await API.post(`/community/like/${id}`)

return res.data

}

export const commentPost = async(id,comment)=>{

const res = await API.post(`/community/comment/${id}`,{
comment
})

return res.data

}