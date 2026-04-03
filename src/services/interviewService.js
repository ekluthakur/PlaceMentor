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

export const getInterviewHistory = async () => {
    try {
  const res = await fetch("http://localhost:5000/api/interview/my", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })
    const data = await res.json()

        if (!res.ok) {
      throw new Error(data.message)
    }

    return data

  } catch (err) {
    console.error("History fetch error:", err)
    return []
  }
}