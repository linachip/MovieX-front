import React, { useState, useEffect } from 'react';
import "./Feedback.css"
import Button from '@mui/material/Button';

const SubmitButton = {
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  fontWeight: 800,
  fontFamily: 'Inter',
  marginTop: '20px',
  padding: '10px 60px',
  border: 'none',
  borderRadius: '5px',
  lineHeight: 1.5,
  backgroundColor: '#ff0000',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#000',
  },
};

const Feedback = () => {
  const [feedback, setFeedback] = useState('');
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    const savedFeedbacks = localStorage.getItem('feedbacks');
    if (savedFeedbacks) {
      setFeedbackList(JSON.parse(savedFeedbacks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('feedbacks', JSON.stringify(feedbackList));
  }, [feedbackList]);

  const handleClear = () => {
    localStorage.removeItem('feedbacks');
    setFeedbackList([]);
  };

  const handleInputChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (feedback.trim() !== '') {
      setFeedbackList((prevFeedbackList) => [...prevFeedbackList, feedback]);
      setFeedback('');
    }
  };

  return (
    <>
      <div className='feedback-container'>
        <div className='welcome-container'>
            <h1>FeedBack</h1>
            <p>Should you have face any issue or just want to leave feedback, feel free to contact us.</p>
        </div>
      </div>
      <div className="feedback-form">
      <form onSubmit={handleSubmit}>
        <textarea
          type='text'
          value={feedback}
          onChange={handleInputChange}
          placeholder="Enter your feedback"
          cols={60}
          rows={10}
        />
        <br />
        <Button sx={SubmitButton} type='submit'>Submit</Button>
        {/* <Button onClick={handleClear} variant="outlined" color="secondary">Clear Feedbacks</Button> */}
      </form>
      </div>
      {feedbackList.length > 0 && (
        <div className="feedbacks">
          <h1>Entered Feedbacks:</h1>
          {feedbackList.map((feedbackEntry, index) => (
            <p key={index}>
              {feedbackEntry}
            </p>
          ))}
        </div>
      )}
    </>
  );
};

export default Feedback