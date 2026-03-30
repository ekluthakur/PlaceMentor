import API from "./api"

export const saveInterview = (data) =>
  API.post("/interviews", data)