import React, { useState } from 'react';

function QuestionForm({ onSubmit }) {
  const [prompt, setPrompt] = useState('');
  const [answers, setAnswers] = useState(['', '', '', '']);
  const [correctIndex, setCorrectIndex] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQuestion = {
      prompt,
      answers,
      correctIndex: parseInt(correctIndex),
    };
    onSubmit(newQuestion);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Prompt:
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </label>
      {answers.map((answer, index) => (
        <label key={index}>
          Answer {index + 1}:
          <input
            type="text"
            value={answer}
            onChange={(e) => {
              const newAnswers = [...answers];
              newAnswers[index] = e.target.value;
              setAnswers(newAnswers);
            }}
          />
        </label>
      ))}
      <label>
        Correct Answer:
        <select
          value={correctIndex}
          onChange={(e) => setCorrectIndex(e.target.value)}
        >
          {answers.map((_, index) => (
            <option key={index} value={index}>
              Answer {index + 1}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default QuestionForm;