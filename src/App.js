import React from 'react';
import ReactDOM from 'react-dom';  
import './index.css';
import reportWebVitals from './reportWebVitals';
import LogIn from './login';
import SignUp from './signup';
import Home from './home';
import Calc from './calc';
import Interest from './interest';
import Countries from './countries';
import Countriesedit from './CountriesEdit';
import Flow from './reactFlow';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'  
const routing = (  
  <Router>  
    <Routes>   
      <Route exact path="/App" element={<App />} />  
      <Route exact path="/" element={<LogIn />} />  
      <Route exact path="/signup" element={<SignUp />} />  
      <Route exact path="/home" element={<Home />} /> 
      <Route exact path="/calc" element={<Calc />}/>
      <Route exact path="/interest" element={<Interest />}/>
      <Route exact path="/countries" element={<Countries />}/>
      <Route exact path="/cEdit" element={<Countriesedit />}/>
      <Route exact path='/reactflow' element = {<Flow />}/>
    </Routes>  
  </Router>  
) 
export default function App() {
  return (routing );
}