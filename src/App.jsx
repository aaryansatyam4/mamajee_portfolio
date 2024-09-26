import React from 'react'
import Hero from './Components/Hero/Hero'
import Navbar from './Components/Navbar/Navbar'
import Aboutme from './Components/Aboutme/Aboutme'
import CareerGraph from './Components/CareerGraph/CareerGraph'
import CareerHighlights from './Components/CareerHighlights/CareerHighlights'
import Project from './Components/Project/Project'
import Certifications from './Components/Certifications/Certifications'

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
   
      <Footer/>
      
    </div>
  )
}

export default App
