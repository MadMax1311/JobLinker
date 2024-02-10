import React, {useEffect, useState} from 'react'
import './job.css'
import { MdLocalPostOffice } from "react-icons/md";
import { GiOfficeChair } from "react-icons/gi";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { FaLocationDot } from "react-icons/fa6";
import { BsArrowRight } from "react-icons/bs";
// import img1 from '../../Assets/im1.jpeg'
// import img2 from '../../Assets/im2.png'
// import img3 from '../../Assets/im3.jpeg'
// import logo from '../../Assets/Job_Video.mp4'
// import img from '../../Assets/4.jpeg'
// import img from '../../Assets/5.jpeg'


import Aos from 'aos'
import 'aos/dist/aos.css'

const Job = ({ jobRole, jobLocation }) => {
  const api_url = "http://localhost:5000/get_jobs";
  const create_row_data = {
    job_role: jobRole ?? "",
    job_location: jobLocation ?? "",
  };

  const [jobData, setJobData] = useState([]);


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

      const result = await response.json();
      console.log(result);
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
                      <MdLocalPostOffice className="icon" />
                      <p>Date: {job.Date}</p>
                    </div>

                    <div className="singleAmenity">
                      <HiBuildingOffice2 className="icon" />
                      <p>Job Description: {job["Job Description"]}</p>
                    </div>

                    <div className="singleAmenity">
                      <MdLocalPostOffice className="icon" />
                      <p>Experience: {job.Experience}</p>
                    </div>
                  </div>

                  <div className="location flex">
                    <FaLocationDot className="icon" />
                    <p>Job Role: {job["Job Role"]}</p>
                  </div>

                  <button
                    className="btn flex"
                    onClick={() => handleGenerateEmail(job["Job URL"])}
                  >
                    Generate E-mail
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  )
}


export default Job;