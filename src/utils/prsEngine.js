import React from "react";
export function calculatePRS({

questionsAnswered,
totalQuestions,
answerLength

}){

const completionScore =
Math.round((questionsAnswered/totalQuestions)*40)

const answerScore =
Math.min(Math.round(answerLength/5),40)

const confidenceScore = 10

const communicationScore = 10

const overallScore =
completionScore +
answerScore +
confidenceScore +
communicationScore

const prsScore =
Math.min(overallScore,100)

return {
overallScore,
prsScore
}

}