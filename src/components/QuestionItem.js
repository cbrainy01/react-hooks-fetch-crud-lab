import React from "react";

function QuestionItem({ question, onDeleteQuestion, onChangeAnswer}) {
  const { id, prompt, answers, correctIndex } = question;
  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));
    
    function handleClick(event) {
      //in the parent element, acess the first childs inner text. It looks like "Question {id}". get the id
      // const innerHTML = event.target.parentElement.firstChild.innerHTML;
      // const questionId = parseInt(innerHTML.split(" ")[1], 10);
      onDeleteQuestion(id);
    }

    function handleChange(event) {
      //get id of selected element
      // const innerHTML = event.target.parentElement.parentElement.firstChild.innerHTML
      // const questionId = parseInt(innerHTML.split(" ")[1], 10);
      //get index of user selected answer
      //the event.target.value is going to be an answer index
      const newAnswerIndex = parseInt(event.target.value, 10);
      onChangeAnswer(id, newAnswerIndex);
    }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={handleChange} value={correctIndex}>{options}</select>
      </label>
      <button onClick={handleClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
