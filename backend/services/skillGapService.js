export const detectSkillGap = (userSkills,marketSkills)=>{

  const missing = marketSkills.filter(
    skill=>!userSkills.includes(skill)
  )

  return missing

}