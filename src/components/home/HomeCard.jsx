import React from "react"
import "./home.css"
import { useHistory } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';


const StartButton = {
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  fontWeight: 800,
  fontFamily: 'Inter',
  padding: '20px 60px',
  border: 'none',
  borderRadius: '5px',
  lineHeight: 1.5,
  backgroundColor: '#ff0000',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#000',
  },
};

const HomeCard = () => {

  const navigate = useHistory();

  const handleGetStarted = () => {
    navigate.push('/reco');
  }

  return (
    <>
      <div className='box'>
        <div className='content flex'>
          <div className='details row'>
            <h1>Welcome to MovieX</h1>
            <p>We are a new, improved solution to the problem of finding movies and recommendations. 
                Fast, simple and accurate, now everything is available in one click. Read the instructions.</p>
            <div className='types'>
              <h4>1. Type your desired phrase or quote from movie</h4>
              <h4>2. Click the Submit button</h4>
              <h4>3. Enjoy the desired movies</h4>
            </div>
          </div>
          <div className='typeField row'>
          <Button sx={StartButton} onClick={handleGetStarted}>Get Started</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomeCard