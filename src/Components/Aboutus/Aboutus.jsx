import React, {useEffect} from "react";
import "./Aboutus.css";
import { BsArrowRightShort } from "react-icons/bs";
import img1 from '../../Assets/Feature.jpeg'
import img2 from '../../Assets/im1.jpeg'
import img3 from '../../Assets/Future_scope.png'


import Aos from 'aos'
import 'aos/dist/aos.css'

const Posts = [
{
    id:1,
    postImage:img1,
    title:'Let us have an adventure outside India',
    desc:'One day she developed a skin disease. Slowly she started to lose her beauty. It so happened that one day her husband left for a tou'
},

{
    id:2,
    postImage:img2,
    title:'Let us have an adventure outside India',
    desc:'One day she developed a skin disease. Slowly she started to lose her beauty. It so happened that one day her husband left for a tou'
},
{
    id:3,
    postImage:img3,
    title:'Let us have an adventure outside India',
    desc:'One day she developed a skin disease. Slowly she started to lose her beauty. It so happened that one day her husband left for a tou'
}
]

const Blog = () => {


    useEffect(()=>{
        Aos.init({duration: 2000})
      }, [])

  return (
   <section className="blog container section" id="About">
        <div className="secContainer">

            <div className="secIntro">
                <h2 data-aos="fade-up" data-aos-duration="2000" className="secTitle">
                    About us
                </h2>
                <p data-aos="fade-up" data-aos-duration="2500">
                Love is not breathlessness, it is not excitement, it is not the promulgation of promises of eternal passion. 
                </p>
            </div>

            <div className="mainContainer grid">
               {
                Posts.map(({id,postImage,title,desc})=>{
                    return(
                        <div data-aos="fade-up" data-aos-duration="2000" className="singlePost grid">
                        <div className="imgDiv">
                            <img src={postImage} alt={title} />   
                        </div>
    
                        <div className="postDetails">
                            <h3 data-aos="fade-up" data-aos-duration="3000">
                                {title}
                            </h3>
                            <p data-aos="fade-up" data-aos-duration="4000">
                                {desc}
                            </p>
                        <a href="#" className="flex" data-aos="fade-up" data-aos-duration="4500">
                            Read More
                            <BsArrowRightShort className="icon"/>
                        </a>
                        </div>
    
                    </div>
                    )
                })
               }
            </div>
        </div>
   </section>
  )
}
export default Blog