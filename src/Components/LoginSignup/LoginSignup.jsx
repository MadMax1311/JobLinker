import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./loginsignup.css";
// import React, { PureComponent } from 'react';

// import { faGoogle, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';


function LoginPage() {

  const handleSignUpClick = () => {
    setIsSignUpMode(true);
  };

  const handleSignInClick = () => {
    setIsSignUpMode(false);
  };

  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState(''); 
  
  const logInUser = (e) => {
    e.preventDefault();

    if (email.length === 0 ) {
      alert("Enter Email")
    }
    else if (password.length === 0){
      alert("Enter Password")
    }
    else{
      axios.post("http://localhost:5000/login",{
        email: email,
        password: password
      })
      .then(function (response){
        console.log(response)
        navigate('/home')
      })
      .catch( function(error) {
        console.log(error, 'error');
        if (error.response.status === 401){
          alert("Invalid Credentials")
        }
      });
    }
  };

  const signupUser = (e) => {
    console.log("hellow")
    e.preventDefault();

    if (email.length === 0 ) {
      alert("Enter Email")
    }
    else if (password.length === 0){
      alert("Enter Password")
    }
    else if (confirmpassword !== password){
      alert("Passwords do not matched!")
    }
    else{
      axios.post("http://localhost:5000/signup",{
        email: email,
        password: password,
        confirmpassword :confirmpassword
      })
      .then(function (response){
        console.log(response)
        // onclick = handleSignInClick
        // alert("User Successfully Signed up")
        handleSignInClick();


      })
      .catch( function(error) {
        console.log(error, 'error');
        if (error.response.status === 401){
          alert("Invalid Credentials")
        }
        else if (error.response.status === 409){
          alert("User already exists!")
        }
      });
    }
  };

  // const handleSignUpClick = () => {
  //   setIsSignUpMode(true);
  // };

  // const handleSignInClick = () => {
  //   setIsSignUpMode(false);
  // };
  

  return (
    <div className={`loginContainer ${isSignUpMode ? 'sign-up-mode' : ''}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form action="/home" className="sign-in-form loginForm" method='POST'>
            <h2 className="title">Log In</h2>

            {/* <div className="input-field">
              <FontAwesomeIcon icon={faUser} className='my-auto mx-auto'/>
              <input className='LoginInput' type="text" placeholder="Username" />
            </div> */}
            <div className="input-field">
              <FontAwesomeIcon icon={faEnvelope} className='my-auto mx-auto'/>
              <input
                className="LoginInput"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faLock} className='my-auto mx-auto'/>
              <input
                className="LoginInput"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              /> 
            </div>
            <button className='button' onClick={logInUser}>Log In</button>
           
            {/* <p className="social-text loginp"> Sign in with social platforms</p> */}
            <div className="social-media">
              
              {/* <a href="#" className="social-icon">
                <FontAwesomeIcon icon={faGoogle} className='my-auto mx-auto'/>
              </a>
              <a href="#" className="social-icon">
                <FontAwesomeIcon icon={faLinkedinIn} className='my-auto mx-auto'/>
              </a> */}
            </div>
          </form>
          <form action="/" className="sign-up-form loginForm" method='POST'>
            <h2 className="title">Sign up</h2>
            {/* <div className="input-field">
              <FontAwesomeIcon icon={faUser} className='my-auto mx-auto'/>
              <input className='LoginInput' type="text" placeholder="Username" />
            </div> */}
            <div className="input-field">
              <FontAwesomeIcon icon={faEnvelope} className='my-auto mx-auto'/>
              <input
                className="LoginInput"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faLock} className='my-auto mx-auto'/>
              <input
                className="LoginInput"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faLock} className='my-auto mx-auto'/>
              <input 
                className='LoginInput' 
                type="password" 
                placeholder="Confirm Password" 
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button className='button' onClick={signupUser} >Sign Up</button>
            {/* <p className="social-text loginp">Or Sign up with social platforms</p> */}
            <div className="social-media">
             
              {/* <a href="#" className="social-icon">
                <FontAwesomeIcon icon={faGoogle} className='my-auto mx-auto'/>
              </a>
              <a href="#" className="social-icon">
                <FontAwesomeIcon icon={faLinkedinIn} className='my-auto mx-auto'/>
              </a> */}
            </div>
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3 className='loginh3'>New here?</h3>
            <p className='loginp'>
            Join us to create personalized job application emails!
            </p>
            <button className="button transparent" onClick={handleSignUpClick}>
              Sign up
              </button>
          </div>
          <img src="/img/dogLogin1.svg" className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3 className='loginh3'>Welcome back!</h3>
            <p className='loginp'>
            Log in for quick access to your customized email features.
            </p>
            <button onClick={handleSignInClick} className="button transparent" id="sign-in-btn">
              Log In
            </button>
          </div>
          <img src="/img/dogLogin.svg" className="image" alt="" />
        </div>
      </div>
    </div>
  )}

  export default LoginPage;