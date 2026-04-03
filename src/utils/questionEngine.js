export const fetchQuestions = async () => {
  const res = await fetch("http://localhost:5000/api/interview/questions")
  const data = await res.json()

  console.log("API RESPONSE:", data)

  // ✅ FORMAT DATA FOR UI
  return data.map((q) => ({
    question: q.title,
    company: "Tech Company",
    role: "Developer"
  }))
}