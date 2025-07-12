import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './Components/Navbar/Navbar';
import Hero from './Components/Hero/Hero';
import Aboutme from './Components/Aboutme/Aboutme';
import CareerGraph from './Components/CareerGraph/CareerGraph';
import CareerHighlights from './Components/CareerHighlights/CareerHighlights';
import Project from './Components/Project/Project';
import Certifications from './Components/Certifications/Certifications';
import BlogPreview from './Components/Blog/BlogPreview'; // New component
import BlogsPage from './Components/Blog/BlogsPage'; // New page component
import BlogAdmin from './Components/Blog/BlogAdmin'; // New admin component
import Footer from './Components/Footer/Footer';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <div>
            <Hero />
            <Aboutme />
            <CareerGraph />
            <CareerHighlights />
            <Project />
            <Certifications />
            <BlogPreview /> {/* Blog section on home page */}
            <Footer />
          </div>
        } />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/admin" element={<BlogAdmin />} />
      </Routes>
    </Router>
  );
};

export default App;