import frontend from "../data/questions/frontend.json"
import hr from "../data/questions/hr.json"
import aptitude from "../data/questions/aptitude.json"
import reasoning from "../data/questions/reasoning.json"

export function generateQuestions(type){

switch(type){

case "technical":
return frontend

case "hr":
return hr

case "aptitude":
return aptitude

case "reasoning":
return reasoning

default:
return frontend

}

}