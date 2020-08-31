import React from 'react'
import {AnswerObject} from '../App';

type props={
    question:string;
    answers:string[];
    callback:(e:React.MouseEvent<HTMLButtonElement>)=>void;
    userAnswer:AnswerObject|undefined;
    questionNumber:number;
    totalQuestions:number;
}

const QuestionCard:React.FC<props> = ({
    question,
    answers,
    callback,
    userAnswer,
    questionNumber,
    totalQuestions
}) => {
    return (
        <div>
            <p className="number">
                Question:{questionNumber} / {totalQuestions}
            </p>
            <p dangerouslySetInnerHTML={{__html:question}} />
            <div>
                {answers.map(answer=>(
                    <div key={answer}>
                        <button disabled={userAnswer?true:false} value={answer} onClick={callback}>
                            <span dangerouslySetInnerHTML={{__html:answer}} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default QuestionCard