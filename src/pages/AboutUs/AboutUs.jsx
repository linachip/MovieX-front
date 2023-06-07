import React from "react"
import './AboutUs.css';

export const AboutUs = () => {
  return (
    <>
      <div className='about'>
        <div className='containerFlex'>
            <h1>About Us</h1>
            <p>Every year, an overwhelming multitude of films, TV series, and shows are released, contributing to an
              astonishing accumulation of movie and TV titles. Movies, along with streaming services, play a monumental role
              in shaping the landscape of media and entertainment culture.
            </p>

            <p>As the film industry undergoes rapid development and the number of movies continues to grow exponentially,
                a challenge has emerged in the realm of film discovery and recognition. In the light of this situation,
                we have made the decision to develop our own platfom that addresses the need for swift movie search and recognition.</p>
                
            <p>MovieX is built upon the foundation of using phrases or text from a movie as search quieries, along with
                employing a highly accurate algorithm that recommends similar movies based on genre, ensuring enhanced
                selection and recommendation capabilities.</p>
        </div>
      </div>
    </>
  )
}

export default AboutUs
