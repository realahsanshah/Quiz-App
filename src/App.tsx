import React,{useState} from 'react';
import './App.css';
import QuestionCard from './components/QuestionCard';
import {fetchQuizQuestions} from './components/API'
import {QuestionState} from './components/API';

type AnswerObject={
  question:string;
  answer:string;
  correct:boolean;
  correctAnswer:string;
}

const TOTAL_QUESTIONS=10;

function App() {

  const [loading,setLoading]=useState(false);
  const [questions,setQuestions]=useState<QuestionState[]>([]);
  const [number,setNumber]=useState(0);
  const [userAnswers,setUserAnswers]=useState<AnswerObject[]>([]);
  const [score,setScore]=useState(0);
  const [gameOver,setGameOver]=useState(true);

  


  const startQuiz=async()=>{
    setLoading(true);
    setGameOver(false);
    
    const newQuestions=await fetchQuizQuestions(TOTAL_QUESTIONS);
    
    console.log(newQuestions);
    
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);

  }

  const checkAnswer=(e:React.MouseEvent<HTMLButtonElement>)=>{
    if(!gameOver){
      const answer=e.currentTarget.value;
      //Check answer against correct
      const correct=questions[number].correct_answer===answer;

      if(correct) setScore(score+1);
      
      const answerObject={
        question:questions[number].question,
        answer,
        correct,
        correctAnswer:questions[number].correct_answer
      }
      setUserAnswers(prev=>[...prev,answerObject]);

    }
  }

  const nextQuestion=()=>{
    const nextQuestion=number+1;

    if(nextQuestion===TOTAL_QUESTIONS){
      setGameOver(true)
    }
    else{
      setNumber(nextQuestion);
    }
  }

  return (
    <div>
      <h1>React Quiz</h1>
      {gameOver||userAnswers.length===TOTAL_QUESTIONS?(
        <button className='startBtn' onClick={startQuiz}>Start Quiz</button>
      ):null}
      
      
      {!gameOver?<p className='score'>Score:{score} </p>:null}
      {loading&&<p>Loading Questions...</p>}
      {!loading&&!gameOver&&( 
      <QuestionCard 
        questionNumber={number+1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswers?userAnswers[number]:undefined}
        callback={checkAnswer}
      />)
    }
    {!gameOver&&!loading&&userAnswers.length===number+1&&number!==TOTAL_QUESTIONS-1?(
      <button className='nextBtn' onClick={nextQuestion}>Next Question</button>
    ):null}
      
    </div>
  );
}

export default App;
