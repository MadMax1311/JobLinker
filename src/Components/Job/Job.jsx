import React, {useEffect, useState , FC} from 'react'
import './job.css'
import { FaBusinessTime } from "react-icons/fa";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { GiFlexibleLamp } from "react-icons/gi";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
// import img1 from '../../Assets/im1.jpeg'
// import img2 from '../../Assets/im2.png'
// import img3 from '../../Assets/im3.jpeg'
// import logo from '../../Assets/Job_Video.mp4'
// import img from '../../Assets/4.jpeg'
// import img from '../../Assets/5.jpeg'

import Aos from 'aos'
import 'aos/dist/aos.css'

const Job = ({ jobRole, jobLocation ,selectedFil,fetchData}) => {
  const api_url = "http://localhost:5000/get_jobs";
  const create_row_data = {
    job_role: jobRole ?? "",
    job_location: jobLocation ?? "",
  };

function CopyButton({ text }) {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Text copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <button onClick={copyToClipboard}>Copy</button>
  );
}

  const [jobData, setJobData] = useState([]);
  // const [modal, setModal] = useState(false);
  const [emailDetails, setEmailDetails] = useState(null);
 
 
  // const CopyToClipboard = ({ textData }) => {
  //   const [copied, setcopied] = useState(false);
  
  //   const copyToClipboard = () => {
  //     setcopied(true);
  
  //     navigator.clipboard.writeText(textData).then(
  //       () => {
  //         // console.log('copied');
  //       },
  //       (err) => {
  //         console.error(err);
  //       }
  //     );
  
  //     setTimeout(() => {
  //       setcopied(false);
  //     }, 500);
  //   };

 
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };
  
  



 



  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  useEffect(()=>{
    // Aos.init({duration: 2000})
     // Check if both jobRole and jobLocation are not empty
     if (
      create_row_data.job_role !== "" &&
      create_row_data.job_location !== ""
    ) {
      const fetchData = async () => {
        try {
          const response = await fetch(api_url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(create_row_data),
          });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();

          // Access the 'details' property of the response
          const newData = data.details;

          setJobData(newData);
          console.log(newData);
        } catch (error) {
          console.error("Error:", error);
        }
      };

     

      // Cleanup function to abort previous fetch request
      const controller = new AbortController();
      const signal = controller.signal;

      fetchData();

      return () => controller.abort();
    }
  }, [create_row_data.job_role, create_row_data.job_location]);

  const handleGenerateEmail = async (jobUrl) => {
    try {
      // Send job URL to the backend for email generation
      const response = await fetch("http://localhost:5000/generate_email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ job_url: jobUrl }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const email = await response.json();
      const newemail = email.email;
      setEmailDetails(newemail);
      console.log(newemail);
    } catch (error) {
      console.error("Error generating email:", error);
    }
  };

  

  return (
    <section className='offer container section'>
      <div className="secContainer" id="E-mail">
        <br />
        <br />
        <br />
        <br />
        <div data-aos="fade-up" data-aos-duration="3000" className="secIntro">
          <h2 className="secTitle">
            Jobs
          </h2>
          <p>
            We are help to generate the Job email using varoius field
          </p>
        </div>

        <div className="mainContent">
        {jobData.map((job) => {

          
  const handleButtonClick = () => {
    toggleModal();
    handleGenerateEmail(job["Job URL"]);
  };

            return (
              <div
                // key={index}
                data-aos="fade-up"
                data-aos-duration="5000"
                className="singleOffer"
              >
                <div className="offerBody">
                  <div className="price flex">
                    <h4>{job["Company Name"]}</h4>
                  </div>

                  <div className="amenities flex">
                    <div className="singleAmenity">
                      <FaBusinessTime  className="icon" />
                      <p>Date: {job.Date}</p>
                    </div>

                    <div className="singleAmenity">
                      <HiBuildingOffice2 className="icon" />
                      <p>Job Description: {job["Job Description"]}</p>
                    </div>

                    <div className="singleAmenity">
                      <FaBusinessTime Office className="icon" />
                      <p>Experience: {job.Experience}</p>
                    </div>
                  </div>

                  <div className="location flex">
                    <GiFlexibleLamp className="icon" />
                    <p>Job Role: {job["Job Role"]}</p>
                  </div>

                  <button
                    className="btn flex"
                    // onClick={() => {toggleModal;
                    // handleGenerateEmail(job["Job URL"])}}
                    onClick={handleButtonClick}
                  >
                    Generate E-mail
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <div>
            <h2 className='hading'>E-mail</h2>
            </div>
            <hr />
            {emailDetails ? (
              <>
                <p>
                   {emailDetails.sender_name}
                </p>
                <p>
                   {emailDetails.sender_email}
                </p>
                <p>
                  {emailDetails.subject}
                </p>
                <p>
                   {emailDetails.salutation}
                </p>
                <p>
                   {emailDetails.body}
                </p>
              </>
            ) : (
              <p> <b>Subject: Application for Web Developer Position - Nikunj Rameshbhai Makwana</b>
              <br />
                <br />

              Dear HR Manager,

              <br />
              <br />
              
              I trust this email finds you well. My name is Nikunj Rameshbhai Makwana, and I am writing to express my sincere interest in the Web Developer position at [Company Name] in Pune, as recently advertised. With a strong background in web development and a passion for creating innovative and user-friendly websites, I am confident in my ability to contribute effectively to your dynamic team.
              <br />
              <br />
              I have attached my resume, which provides a comprehensive overview of my skills, experience, and projects. Having worked on various web development projects, I have honed my proficiency in HTML, CSS, JavaScript, React.js, Nodejs, enabling me to deliver high-quality solutions tailored to meet the specific needs of clients and users.
              <br />
              <br />
              I am particularly drawn to [Company Name] because of its reputation for fostering creativity and embracing cutting-edge technologies in the field of [mention any specific industry or sector focus]. I am eager to bring my technical expertise and collaborative mindset to contribute to the continued success of your projects.
              <br />
              <br />
              Thank you for considering my application. I look forward to the possibility of contributing to the success of [Company Name] and being a valuable member of your team.
              <br />
              <br />
              Sincerely,
              <br />
              
              Nikunj Rameshbhai Makwana
              </p>
            )}
            <button className="close-modal" onClick={toggleModal}>
            <AiFillCloseCircle className='icon' />
            </button>
          </div>
        </div>

        
      )}
    </section>
  )}

export default Job;