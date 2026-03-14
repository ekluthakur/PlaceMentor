import React from "react"

export default function HowItWorks(){

const steps=[

{
title:"Upload Resume",
desc:"Upload your resume and analyze it with AI."
},

{
title:"Start Mock Interview",
desc:"Practice interview questions based on your role."
},

{
title:"Get AI Feedback",
desc:"Receive detailed feedback on answers."
},

{
title:"Track Improvement",
desc:"Monitor performance and improve PRS score."
}

]

return(

<section className="mt-32 px-10 max-w-7xl mx-auto text-center">

<h2 className="text-4xl font-bold mb-16">
How PlaceMentor Works
</h2>

<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

{steps.map((step,index)=>(

<div
key={index}
className="p-8 bg-white rounded-xl shadow hover:shadow-lg transition"
>

<div className="text-3xl font-bold text-blue-600 mb-4">
{index+1}
</div>

<h3 className="text-xl font-semibold mb-2">
{step.title}
</h3>

<p className="text-gray-600 text-sm">
{step.desc}
</p>

</div>

))}

</div>

</section>

)

}