export const calculatePRS = (data)=>{

  const {
    interviewScore,
    skillMatch,
    resumeScore,
    marketDemand
  } = data

  const prs =
    interviewScore*0.4 +
    skillMatch*0.3 +
    resumeScore*0.2 +
    marketDemand*0.1

  return Math.round(prs)

}