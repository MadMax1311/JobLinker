import logo from './logo.svg';
import './App.css';
import Home from './Components/Home/Home'
import LoginSignup from './Components/LoginSignup/LoginSignup';
import { BrowserRouter, Routes , Route } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
         <Route path='/' element={<Home />} />
         <Route path='/login' element={<LoginSignup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
