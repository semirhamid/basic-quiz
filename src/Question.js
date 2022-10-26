import React from "react";

export default function Question(props){
let answer = ""
    if(props.answers.length >0){
        answer = props.answers.map((ans=>{
        let color = "transparent"
        if(ans.choosed === true){
            color="#D6DBF5"
            if(ans.answerType==="correct"){
                color="#94D7A2"
            }else if(ans.answerType==="incorrect"){
                color = "#F8BCBC"
            }}
        
        return(
        <p key={ans.id} style={{backgroundColor: `${color}`, cursor:"pointer"}} onClick={()=> props.selectAnswer(ans.id)} className="answer-item">{ans.answer}</p>
        )
            }))
    }
                    

    return (
        <div className="question-item">
            <h3 className="question">{props.question}</h3>
            <div className="answer-container">
                {answer}
            </div>
        </div>
    )
}