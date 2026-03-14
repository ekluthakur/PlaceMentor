import React from 'react';
export default function RecentActivity(){

  const activities = [
    "Completed Google Frontend Interview",
    "Improved PRS Score to 74",
    "Solved 5 DSA Questions",
    "Started Amazon Mock Interview"
  ]

  return(

    <div className="space-y-3">

      {activities.map((a,i)=>(
        <div
          key={i}
          className="bg-white/60 backdrop-blur p-3 rounded-lg hover:translate-x-1 transition"
        >
          {a}
        </div>
      ))}

    </div>

  )

}