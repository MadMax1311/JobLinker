import React, {useEffect} from "react";
import "./footer.css";
import { Link } from 'react-scroll';

// import { BsArrowRightShort } from "react-icons/bs";
import { ImFacebook } from "react-icons/im";
import { ImTwitter } from "react-icons/im";
import { ImInstagram } from "react-icons/im";

import Aos from 'aos'
import 'aos/dist/aos.css'

const Footer = () => {

  useEffect(()=>{
    Aos.init({duration: 2000})
  }, [])


  return (
    <div className="footer" id="Contacts">
      <div className="secContainer container grid">
        <div data-aos="fade-up" data-aos-duration="2000" className="logoDiv">

          <div data-aos="fade-up" data-aos-duration="2000" className="footerLogo">
            <a href="#" className="logo flex">
              <Link to="Home" spy={true} smooth={true} offset={-100} duration={2000} className="flex">
                {/* <BsArrowRightShort className="icon" /> */}
                 Job<h1 id="fl">Linker</h1>             
                </Link>
            </a>
          </div>

          <div data-aos="fade-up" data-aos-duration="2000" className="socials flex">
          <ImFacebook className="icon" />
          <ImTwitter className="icon"/>
          <ImInstagram className="icon"/>
          </div>

        </div>

        <div data-aos="fade-up" data-aos-duration="3000" className="footerLinks">
          <span className="linkTitke">
            Information
          </span>
        <li>
          <Link to="Home" spy={true} smooth={true} offset={-100} duration={2000}>Home</Link>
        </li>
        {/* <li>
          <Link  to="E-mail" spy={true} smooth={true} offset={-100} duration={500}>Mail Ganerate</Link>
        </li>
        <li>
          <Link  to="Blog" spy={true} smooth={true} offset={-100} duration={500}>Blog</Link>
        </li> */}
        <li>
          <Link  to="About" spy={true} smooth={true} offset={-100} duration={500}>About</Link>
        </li>


        </div>

        <div data-aos="fade-up" data-aos-duration="4000" className="footerLinks">
          <span className="linkTitke">
            Helpful Links
          </span>
        <li>
          <a href="#">Help</a>
        </li>
        <li>
          <a href="#">Support</a>
        </li>
        <li>
          <a href="#">Term & Condition</a>
        </li>
        <li>
          <a href="#">Privacy</a>
        </li>
    </div>

        <div data-aos="fade-up" data-aos-duration="2000" className="footerLinks">
          <span className="linkTitke">
            Contact us
          </span>

          <span className="phone">+444 445 4849</span>
          <span className="email">abc@gmail.com</span>
       
      </div>

         



      </div>
    </div>
  );
};

export default Footer;
