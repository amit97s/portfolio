import React from 'react'
import SmoothScroll from  './components/SmoothScroll'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
const Home = () => {
  return (
    <div>
         <SmoothScroll>
        <Hero />
       <About/>
       <Skills/>
       <Projects/>
       <Contact/>
    </SmoothScroll>
    </div>
  )
}

export default Home