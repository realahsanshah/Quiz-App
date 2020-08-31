import React,{useState} from 'react';
import './App.css';
import QuestionCard from './components/QuestionCard';


function App() {

  const startQuiz=async()=>{

  }

  const checkAnswer=(e:React.MouseEvent<HTMLButtonElement>)=>{
    
  }

  const nextQuestion=()=>{

  }

  return (
    <div>
      <h1>React Quiz</h1>
      <button className='startBtn' onClick={startQuiz}>Start Quiz</button>
      <p className='score'>Score: </p>
      <p>Loading Questions...</p>
      <QuestionCard  />
      <button className='nextBtn' onClick={nextQuestion}>Next Question</button>
    </div>
  );
}

export default App;
