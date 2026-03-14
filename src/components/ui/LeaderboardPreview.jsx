import React from 'react';
export default function LeaderboardPreview() {

  const users = [
    {name:"Aman", score:95},
    {name:"Riya", score:90},
    {name:"Karan", score:88}
  ]

  return (

    <div className="space-y-4">

      {users.map((u,i)=>(
        <div
          key={i}
          className="flex justify-between items-center bg-white/60 backdrop-blur rounded-lg p-3 hover:scale-[1.02] transition"
        >

          <span className="font-medium">
            {i+1}. {u.name}
          </span>

          <span className="text-blue-600 font-semibold">
            {u.score}
          </span>

        </div>
      ))}

    </div>

  )

}