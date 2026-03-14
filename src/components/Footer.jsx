import React from "react"

export default function Footer(){

return(

<footer className="mt-32 bg-gray-900 text-white py-10">

<div className="max-w-7xl mx-auto px-10 grid md:grid-cols-3 gap-8">

<div>

<h3 className="text-xl font-bold mb-3">
PlaceMentor
</h3>

<p className="text-gray-400 text-sm">
AI powered platform to practice interviews and improve placement readiness.
</p>

</div>

<div>

<h4 className="font-semibold mb-3">
Platform
</h4>

<ul className="space-y-2 text-gray-400 text-sm">

<li>AI Interviews</li>
<li>Resume Analyzer</li>
<li>Analytics</li>
<li>Community</li>

</ul>

</div>

<div>

<h4 className="font-semibold mb-3">
Company
</h4>

<ul className="space-y-2 text-gray-400 text-sm">

<li>About</li>
<li>Privacy</li>
<li>Terms</li>

</ul>

</div>

</div>

<div className="text-center text-gray-500 mt-10 text-sm">
© 2026 PlaceMentor. All rights reserved.
</div>

</footer>

)

}