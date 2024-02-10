import React, {useState, useEffect} from "react";
import "./landingpage.css";
import img from "../../Assets/Home_Bg.png"
import { FaUpload } from "react-icons/fa";
import LandingNavbar from "./LandingNavbar";
import Job from '../Job/Job'
// / / import Popular from './Components/Popular/Popular'
import About from '../About/About'
import Aboutus from '../Aboutus/Aboutus'
import Footer from '../Footer/Footer'
import { useNavigate } from "react-router-dom";
import Aos from 'aos'
import 'aos/dist/aos.css'


const LandingPage = () => {
  const [fileUploaded, setFileUploaded] = useState(false);
  const navigate = useNavigate();
  
  useEffect(()=>{
    Aos.init({duration: 2000})
  }, [])
  
  
  const uploadFiles = () => {
    document.getElementById('selectFiles').click();
  };


  const navigateLogin = () => {
    navigate('/login')
  };
  //  setTimeout(() => {
  //     setFileUploaded(true);
  //   }, 1000);
  // };
  
  return (
    <>
    <LandingNavbar />
    <section className="home" id="Home">
          <div data-aos="fade-up" data-aos-duration="4000" className="img">
            <img src={img} alt="" />
          </div>
      <div className="secContainer container">
        <div className="homeText">
          <h1 data-aos="fade-up"  className="title">Place your Job role & <br />Generate E-mail</h1>

          <p data-aos="fade-up" data-aos-duration="4000" className="subTitle">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo,
            perferendis.
          </p>

          <button data-aos="fade-up" data-aos-duration="3000" className="btn">
            <a href="#">Explore Now</a>
          </button>
        </div>

        <div className="homeCard grid">
          <div data-aos="fade-right" data-aos-duration="2000" className="locationDiv">
            <label htmlFor="location">Job Role</label>
            <input type="text" placeholder="Job Role" />
          </div>

          <div data-aos="fade-right" data-aos-duration="2500" className="distDiv">
            <label htmlFor="distance">City</label>
            <input type="text" placeholder="City"/>
          </div>

          <div data-aos="fade-right" data-aos-duration="3000" className="priceDiv">
            <label For="uploadBtn">Upload Resume</label>
            <button className="upload" onClick={uploadFiles}>
            <FaUpload className="hi" />
          </button>
          <input type="file" id="selectFiles" name="upload" accept="application/pdf,application/" />
          </div>
          {/* {fileUploaded && (
        <div style={{ marginTop: '10px', color: 'green' }}>
          File uploaded successfully!
        </div>
      )} */}

          <button data-aos="fade-up" data-aos-duration="3000" className="btn" onClick={navigateLogin} >Submit</button>
        </div>
      </div>
    </section>
    <Job/>
    <Aboutus/>
    <About/>
  <Footer/> 
    </>
  );
};

export default LandingPage;
