import React from "react";
export function detectSkillGap(userSkills,requiredSkills){

return requiredSkills.filter(
skill => !userSkills.includes(skill)
)

}

export function generateLearningPath(gaps){

return gaps.map(skill=>({

skill,

course:`Learn ${skill} fundamentals`,
platform:"YouTube / Docs"

}))

}