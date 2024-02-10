import React from 'react'
import './App.css'
import LoginPage from './Components/LoginSignup/LoginSignup';
import Home from './Components/Home/Home'
import LandingPage from './Components/LandingPage/LandingPage';
// import Navbar from './Components/Navbar/Navbar'
// import Job from './Components/Job/Job'
// import About from './Components/About/About'
// import Blog from './Components/Blog/Blog'
// import Footer from './Components/Footer/Footer'
import { BrowserRouter, Route, Routes} from "react-router-dom"

const App = () => {
  return (    
    <>
    {/* <LoginPage/> */}
    {/* <Home/>
    <Job/>
    <Blog/>
    <About/>
  <Footer/>  */}

    {/* Login & Signup Browser  */}
    <BrowserRouter>
      <Routes>
        {/* <Route path='' element={<Navbar />}/> */}
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </BrowserRouter> 
    </>
  )
}

export default App;