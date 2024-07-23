import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter,Route,Routes } from 'react-router-dom'; // Import BrowserRouter
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Register from './views/Register.jsx';
import Home from './views/Home.jsx';
import Login from './views/Login.jsx';
import 'dotenv/config'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* Wrap App component with BrowserRouter */}
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="register" element={<Register/>} />
        <Route path="login" element={<Login/> } />
        <Route path='home' element={<Home/>}/>
      </Routes>
      
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();