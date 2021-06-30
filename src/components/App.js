import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);
/*AdminNavBar component is passing a callback function as a prop. When that callback
is called in a child component, the argument is going to be used to set page(a state variable)
The AdminNavBar component contains two buttons. One sets page to form(displays new question) 
and the other sets page to list*/
/**if page is currently a form, Questionform component is rendered, if not, 
 * QuestionList component is rendered.
 */
  useEffect(()=> {
    fetch("http://localhost:4000/questions")
    .then( (response)=> response.json() )
    .then((responseData)=>{
      setQuestions(responseData)
      
    } )
  }, []);

  function handleNewQuestionSubmit(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  function handleDeleteQuestion(deleteId) {
  
    //create delete request by using deleteId
    fetch(`http://localhost:4000/questions/${deleteId}`, {method: "DELETE"})
    .then( ()=>{
    console.log(deleteId);
     const filteredQuestions = questions.filter( (question)=> question.id !== deleteId);
     setQuestions(filteredQuestions);

    } );
  
  }

  function handleChangeAnswer(questionId, newAnswerIndex) {
    fetch(`http://localhost:4000/questions/${questionId}`, 
      {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({"correctIndex": newAnswerIndex})
      }
    )
     .then( (resp)=>resp.json() )
     .then( (responseData)=> {
     const respIndex = questions.findIndex( (q)=> q.id === responseData.id );
     const beforeQuestionArray = questions.slice(0,respIndex) 
     const afterQuestionArray = questions.slice(respIndex + 1) 
      setQuestions([...beforeQuestionArray, responseData, ...afterQuestionArray ])
     });
  }
  console.log("UPDATED QUESTIONS: ", questions); 
  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onNewQuestionSubmit={handleNewQuestionSubmit}/> : <QuestionList onDeleteQuestion={handleDeleteQuestion} onChangeAnswer={handleChangeAnswer} questions={questions} />}
    </main>
  );
}

export default App;
