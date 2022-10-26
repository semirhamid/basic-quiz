import React, { useState, useEffect } from "react";
import Question from "./Question"
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'


export default function App(){
    const [reset, setReset] = useState(false)
    let correctAnswer = 0
    const [selected, setSelected] = useState(0)
    const [data , setData] = React.useState([])

    useEffect(()=>{
        fetch("https://opentdb.com/api.php?amount=10")
        .then(res => res.json())
        .then(data => {const newData = data.results.map(item => {
            let newanswe = [
                {id:nanoid(),
                    answerType: "none",
                    choosed:false,
                    isCorrect:false,
                    answer: `${item.incorrect_answers[0]}`},
                {id:nanoid(),
                    answerType: "none",
                    choosed:false,
                    isCorrect:false,
                    answer: `${item.incorrect_answers[1]}`},
                {id:nanoid(),
                    answerType: "none",
                    choosed:false,
                    isCorrect:false,
                    answer: `${item.incorrect_answers[2]}`},
                {id:nanoid(),
                    answerType: "none",
                    choosed:false,
                    isCorrect:true,
                    answer: `${item.correct_answer}`}
                ]
                
            return{qnid:nanoid(),
                question: `${item.question}`,
                answers: shuffle(newanswe)
            }
        })
        setData(newData)})
    },[reset])


    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;

        while (currentIndex !== 0) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
        }


    function countCorrectAnswer(){
        for(let i=0; i<data.length; i++){
            let arr = data[i].answers
            for(let j=0;j<arr.length;j++){
                let annwe = arr[j]
                if(annwe.isCorrect && annwe.choosed){
                    correctAnswer+=1
                }
            }
        }
        return correctAnswer
    }

    function countSelected(){
        let select = 0
        for(let i=0; i<data.length; i++){
            let arr = data[i].answers
            for(let j=0;j<arr.length;j++){
                let annwe = arr[j]
                if(annwe.choosed){
                    select+=1
                }
            }
        }
        return select
    }

    function disableClick(){
        window.alert("Click reset to play again")

    }

    function revealAnswers(){
        if(countSelected()===data.length ){let update = data.map(itemParent =>{ 
            let newAnswer =  itemParent.answers.map(item => {return item.isCorrect ? {...item, answerType:"correct"}:{...item, answerType:"incorrect"}})
            return {...itemParent,answers: newAnswer }
        })
        setData(update)
        setSelected(()=>countSelected())
        correctAnswer = 0

    }else{
            window.alert("Please answer all questions")
        }
    
    }

    function resetGame(){
        setSelected(0)
        setReset(prev=>!prev)
        correctAnswer = 0
        
    }
    function selectAnswer(id){
        let update = data.map(itemParent =>{
            let idExist = false
            let currentArray = itemParent.answers
            for(let i = 0; i <currentArray.length;i++){
                if(currentArray[i].id===id){
                    idExist = true
                }
            }
            if(idExist){let newInfo = currentArray.map(item => {return item.id===id ? {...item, choosed:true}:{...item, choosed:false}})
            return {...itemParent , answers:newInfo}}else{
                return itemParent
            }
            
        })
        setData(update)
        
        
    }
    

    return(
        <div>
            {countCorrectAnswer()=== data.length && <Confetti/>}
            {data.map(item => (
        <Question key= {item.qnid} answers = {item.answers} question={item.question} selectAnswer = {selected=== data.length ? disableClick : selectAnswer}/>
    ))}
            
            {selected === data.length && <p>You have scored {correctAnswer}/{data.length}</p>}
            {selected !== data.length && <button onClick={revealAnswers}>Submit</button>}
            {selected === data.length && <button onClick={resetGame}>Reset</button>}
        </div>
    )
}