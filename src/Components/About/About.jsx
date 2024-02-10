import React, {useEffect} from 'react'
import './about.css'


// import img from '../../Assets/im1.jpeg'
// import img2 from '../../Assets/im2.png'
// import img3 from '../../Assets/im3.jpeg'

import video from '../../Assets/About_Video.mp4'

import Aos from 'aos'
import 'aos/dist/aos.css'

const About = () => {

  useEffect(()=>{
    Aos.init({duration: 2000})
  }, [])

  return (
    <section className='about section'>
      <div className="secContainer" id='About'>
        {/* <h2 className="title">
          About Us
        </h2> */}

      {/* <div className="mainContent container grid">
        <div data-aos="fade-up" data-aos-duration="2000" className="singleItem">
          <img src={img} alt="Image name" />

        <h3>100+ Job option</h3>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus nihil, obcaecati assumenda autem maiores saepe quibusdam, ab ipsam voluptatem sint fugiat, consequatur eos cumque nisi animi nulla dolore tenetur? Rerum!
        </p>

        </div>

        <div data-aos="fade-up" data-aos-duration="2500" className="singleItem">
          <img src={img} alt="Image name" />

        <h3>100+ Job option</h3>

        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus nihil, obcaecati assumenda autem maiores saepe quibusdam, ab ipsam voluptatem sint fugiat, consequatur eos cumque nisi animi nulla dolore tenetur? Rerum!
        </p>


        </div>

        <div data-aos="fade-up" data-aos-duration="3000" className="singleItem">
          <img src={img} alt="Image name" />

        <h3>100+ Job option</h3>

        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus nihil, obcaecati assumenda autem maiores saepe quibusdam, ab ipsam voluptatem sint fugiat, consequatur eos cumque nisi animi nulla dolore tenetur? Rerum!
        </p>


        </div>

      </div> */}


      <div className="videoCard container">
        <div className="cardContent grid">

          <div data-aos="fade-right" data-aos-duration="2000" className="cardText">
            <h2>I can show my money in my time</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus ipsum ipsam accusamus velit quasi quos sed consectetur iste beatae, eos nulla quam eius deserunt dolorum repudiandae a ducimus porro nam!
            </p>

          </div>

          <div data-aos="fade-left" data-aos-duration="2000" className="cardVideo">
            <video src={video} autoPlay loop muted type="video/mp4"></video>
          </div>


        </div>
      </div>

      </div>
    </section>
  )
}

export default About