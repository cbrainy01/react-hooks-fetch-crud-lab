import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({questions, onDeleteQuestion, onChangeAnswer}) {
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{
      /* display QuestionItem components here after fetching */
      questions.map( (question) => {return  <QuestionItem  key={question.id} onDeleteQuestion={onDeleteQuestion} onChangeAnswer={onChangeAnswer} question={question}/>} )
      }
      </ul>
    </section>
  );
}

export default QuestionList;
