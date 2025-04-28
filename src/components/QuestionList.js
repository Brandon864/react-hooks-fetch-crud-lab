import React from 'react';

function QuestionList({ questions, onDelete, onUpdate }) {
  return (
    <div>
      <h2>Questions</h2>
      {questions.map((question) => (
        <div key={question.id}>
          <p>{question.prompt}</p>
          <ul>
            {question.answers.map((answer, index) => (
              <li key={index}>
                {answer} {question.correctIndex === index ? '(Correct)' : ''}
              </li>
            ))}
          </ul>
          <label>
            Correct Answer:
            <select
              value={question.correctIndex}
              onChange={(e) => onUpdate(question.id, parseInt(e.target.value))}
            >
              {question.answers.map((_, index) => (
                <option key={index} value={index}>
                  Answer {index + 1}
                </option>
              ))}
            </select>
          </label>
          <button onClick={() => onDelete(question.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default QuestionList;