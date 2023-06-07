import React from "react"
import './AboutUs.css';

export const AboutUs = () => {
  return (
    <>
      <div className='about'>
        <div className='containerFlex'>
            <h1>About Us</h1>
            <p>We are a new, improved solution to the problem of finding movies and recommendations.
                Fast, simple and accurate, now everything is available in one click. Read the instructions.</p>
              <div className='aboutTypes'>
              <h4>1. Click on the "Get Strated" button</h4>
              <h4>2. Type your desired phrase or quote from movie</h4>
              <h4>3. Click on the "Submit" button</h4>
              <h4>4. Enjoy the desired movies</h4>
            </div>
        </div>
      </div>
    </>
  )
}

export default AboutUs
