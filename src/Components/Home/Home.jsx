import React, { useState, useEffect } from "react";
import "./home.css";
import img from "../../Assets/Home_Bg.png";
import { FaUpload } from "react-icons/fa";

import Aos from "aos";
import "aos/dist/aos.css";

const Home = ({ change }) => {
  const [fileUploaded, setFileUploaded] = useState(false);
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
    setJobRole("");
    setJobLocation("");
    setSubmitted(false);
  };

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const uploadFiles = () => {
    document.getElementById("selectFiles").click();
  };

  //  setTimeout(() => {
  //     setFileUploaded(true);
  //   }, 1000);
  // };

  return (
    <section className="home">
      <div data-aos="fade-up" data-aos-duration="4000" className="img">
        <img src={img} alt="" />
      </div>
      <div className="secContainer container">
        <div className="homeText">
          <h1 data-aos="fade-up" className="title">
            Place your Job role & <br />
            Generate E-mail
          </h1>

          <p data-aos="fade-up" data-aos-duration="4000" className="subTitle">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo,
            perferendis.
          </p>

          <button data-aos="fade-up" data-aos-duration="3000" className="btn">
            <a href="#">Explore Now</a>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="homeCard grid">
            <div
              data-aos="fade-right"
              data-aos-duration="2000"
              className="locationDiv"
            >
              <label htmlFor="jobRole">Job Role</label>
              <input type="text" id="jobRole" value={jobRole} onChange={(e) => setJobRole(e.target.value)} placeholder="Job Role" />
            </div>

            <div
              data-aos="fade-right"
              data-aos-duration="2500"
              className="distDiv"
            >
              <label htmlFor="jobLocation">City</label>
              <input
                type="text"
                id="jobLocation"
                value={jobLocation}
                onChange={(e) => setJobLocation(e.target.value)}
                placeholder="city"
              />
            </div>

            <div
              data-aos="fade-right"
              data-aos-duration="3000"
              className="priceDiv"
            >
              <label For="uploadBtn">Upload Resume</label>
              <button className="upload" onClick={uploadFiles}>
                <FaUpload className="hi" />
              </button>
              <input
                type="file"
                id="selectFiles"
                name="upload"
                accept="application/pdf,application/, image/jpeg"
              />
            </div>
            {/* {fileUploaded && (
        <div style={{ marginTop: '10px', color: 'green' }}>
          File uploaded successfully!
        </div>
      )} */}

            <button
              data-aos="fade-left"
              data-aos-duration="2000"
              className="btn"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Home;
