import React from 'react'
import Hero from './Components/Hero/Hero'
import Navbar from './Components/Navbar/Navbar'
import Aboutme from './Components/Aboutme/Aboutme'
import CareerGraph from './Components/CareerGraph/CareerGraph'
import CareerHighlights from './Components/CareerHighlights/CareerHighlights'
import Project from './Components/Project/Project'
import Certifications from './Components/Certifications/Certifications'
import ContactForm from './Components/ContactForm/ContactForm'
import Footer from './Components/Footer/Footer'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Aboutme/>
      <CareerGraph/>
      <CareerHighlights/>
      <Project/>
      <Certifications/>
      <ContactForm/>
      <Footer/>
      
    </div>
  )
}

export default App
