export function parseResume(text){

const skills = [
"React",
"JavaScript",
"Python",
"Node",
"MongoDB",
"AWS"
]

const foundSkills = skills.filter(skill =>
text.toLowerCase().includes(skill.toLowerCase())
)

return {

skills:foundSkills,

experience:"2 years",

projects:2

}

}