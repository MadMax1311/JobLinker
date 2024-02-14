import React, {useState, useEffect} from "react";
import "./home.css";
import img from "../../Assets/Home_Bg.png"
import { FaUpload } from "react-icons/fa";
import { Link } from 'react-scroll';
import Navbar from "../Navbar/Navbar";
import Job from '../Job/Job'
// / / import Popular from './Components/Popular/Popular'
import About from '../About/About'
import Aboutus from '../Aboutus/Aboutus'
import Footer from '../Footer/Footer'
// import { useNavigate } from "react-router-dom";
import Aos from 'aos'
import 'aos/dist/aos.css'
// import


const Home = () => {
  const [fileUploaded, setFileUploaded] = useState(false);
  // const navigate = useNavigate();
  const [jobRole, setJobRole] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [fetchData, setFetchData] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFetchData(!fetchData); // Toggle the state to trigger fetching data
  };

    const handleReset = () => {
    setJobRole('');
    setJobLocation('');
    setSubmitted(false);
  };
  
  useEffect(()=>{
    Aos.init({duration: 2000})
  }, [])
  
  
  const uploadFiles = () => {
    document.getElementById('selectFiles').click();
  };


  // const navigateLogin = () => {
  //   navigate('/login')
  // };
  //  setTimeout(() => {
  //     setFileUploaded(true);
  //   }, 1000);
  // };
  
  return (
    <>
    <Navbar />
    <section className="home" id="Home">
          <div data-aos="fade-up" data-aos-duration="4000" className="img">
            <img src={img} alt="" />
          </div>
      <div className="secContainer container">
        <div className="homeText">
          <h1 data-aos="fade-up"  className="title">Place your Job role & <br />Generate E-mail</h1>

          <p data-aos="fade-up" data-aos-duration="4000" className="subTitle">
          Job Linker is a streamlined web application that revolutionizes the job application 
          process by focusing on personalized email generation.
          </p>

          <button data-aos="fade-up" data-aos-duration="3000" className="btn">
            <Link to="About" spy={true} smooth={true} offset={-100} duration={500} >Explore Now</Link>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
        <div className="homeCard grid">
          <div data-aos="fade-right" data-aos-duration="2000" className="locationDiv">
            <label htmlFor="jobRole">Job Role</label>
            <input type="text" id="jobRole" value={jobRole} onChange={(e) => setJobRole(e.target.value)} placeholder="Job Role" />
          </div>

          <div data-aos="fade-right" data-aos-duration="2500" className="distDiv">
            <label htmlFor="jobLocation">City</label>
            <input type="text" id="jobLocation" value={jobLocation} onChange={(e) => setJobLocation(e.target.value)} placeholder="City"/>
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

          <button data-aos="fade-up" data-aos-duration="3000" type="submit" className="btn" >Submit</button>
        </div>
        </form>
      </div>
    </section>
    {submitted && (
        <Job
          jobRole={jobRole}
          jobLocation={jobLocation}
          fetchData={fetchData}
        />
      )}
    {/* <Job/> */}
    <Aboutus/>
    <About/>
    <Footer/> 
    </>
  );
};

export default Home;
