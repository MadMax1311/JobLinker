import React, { useState } from 'react'
import './navbar.css'
import { Link } from 'react-scroll';
// import { MdMarkEmailRead } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import { IoReorderThreeOutline } from "react-icons/io5";
import { Link as Code } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";

const Navbar = () => {
    // Code to show/Toggle navbar
    const [active, setActive] = useState('navBar')
    const showNav =()=>{
        setActive('navBar activeNavbar')
    }

    // code to remove navbar
    const removeNav =()=>{
        setActive('navBar')
    }

    // function submit(e) {
    //     e.preventDefault();
    //     // const { id } = e;
    //     // console.log(id)
    //     document.querySelector(".homeCard").scrollIntoView();
    //  }

    // Code to add background color to the header
    const [transparent, setTransparent] = useState('header')
    const addBg = ()=>{
        if(window.scrollY >= 10){
            setTransparent('header activeHeader')
        }
        else{
            setTransparent('header')
        }
    }
    window.addEventListener('scroll', addBg)

  return (
    <section className='navBarSection'>
        {/* <Link to='/login'></Link> */}
        <div className={transparent}>
            <div className='logoDiv'>
                <a href='#' className='logo'>
                    <h1 className='flex'>
                        {/* <MdMarkEmailRead className="icon"/> */}
                    Job
                    <h1 className='fl'>Linker</h1>
                    </h1>
                </a>
            </div>

            <div className= {active}>
            <ul className='navLists flex'>

        {/* Here use the id for the scroll and in ever file it can help */}
                <li className='navItem'>
                    <Link  to="Home" spy={true} smooth={true} offset={-100} duration={2000} className='navLink'>Home</Link>
                </li>

                {/* <li className='navItem'>
                    <Link  to="E-mail" spy={true} smooth={true} offset={-100} duration={500} className='navLink'>E-mail</Link>
                </li> */}

                {/* <li className='navItem'>
                    <Link  to="Blog" spy={true} smooth={true} offset={-100} duration={500} className='navLink'>Blog</Link>
                </li> */}

                <li className='navItem'>
                    <Link  to="About" spy={true} smooth={true} offset={-100} duration={500} className='navLink'>About</Link>
                </li>

                <li className='navItem'>
                    <Link  to="Contacts" spy={true} smooth={true} offset={-120} duration={2000} className='navLink'>Contacts</Link>
                </li>

                <div className='headerBtns flex'>

                    <div className='btn loginBtn'>
                        {/* <a href='#'>Login</a> */}
                        <FaRegUser />
                        {/* <Code to='/login'>Login</Code> */}
                        
                    </div>

                    {/* <button className='btn loginBtn'>
                        <Link to='/login'>Sign Up</Link>
                        
                        <Code to='/login'>Sign  Up</Code>
                    </button> */}
                </div>
                
                </ul>

                <div onClick = {removeNav} className='closeNavbar'>
                    <AiFillCloseCircle className='icon' />
                </div>
            </div>
            <div onClick={showNav} className='toggleNavbar'>
                    <IoReorderThreeOutline className='ic'/>
            </div>
        </div>
    </section>
  )
}

export default Navbar