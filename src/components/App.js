import React, { useState, useEffect } from 'react';
import QuestionList from './QuestionList';
import QuestionForm from './QuestionForm';

function App() {
  const [questions, setQuestions] = useState([]);

  // Fetch all questions on mount (GET /questions)
  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error('Error fetching questions:', err));
  }, []);

  // Add a new question (POST /questions)
  const addQuestion = (newQuestion) => {
    if (!newQuestion.prompt || newQuestion.answers.includes('')) {
      alert('All fields are required');
      return;
    }
    fetch('http://localhost:4000/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newQuestion),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to add question');
        return res.json();
      })
      .then((savedQuestion) => setQuestions([...questions, savedQuestion]))
      .catch((err) => {
        console.error('Error adding question:', err);
        alert('Failed to add question');
      });
  };

  // Delete a question (DELETE /questions/:id)
  const deleteQuestion = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to delete question');
        setQuestions(questions.filter((q) => q.id !== id));
      })
      .catch((err) => {
        console.error('Error deleting question:', err);
        alert('Failed to delete question');
      });
  };

  // Update a question's correct answer (PATCH /questions/:id)
  const updateQuestion = (id, correctIndex) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correctIndex }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to update question');
        return res.json();
      })
      .then((updatedQuestion) =>
        setQuestions(questions.map((q) => (q.id === id ? updatedQuestion : q)))
      )
      .catch((err) => {
        console.error('Error updating question:', err);
        alert('Failed to update question');
      });
  };

  return (
    <div>
      <h1>Quiz Admin</h1>
      <QuestionForm onSubmit={addQuestion} />
      <QuestionList
        questions={questions}
        onDelete={deleteQuestion}
        onUpdate={updateQuestion}
      />
    </div>
  );
}

export default App;