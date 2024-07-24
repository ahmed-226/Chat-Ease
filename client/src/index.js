import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Import BrowserRouter
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Register from './views/Register.jsx';
import Home from './views/Home.jsx';
import Login from './views/Login.jsx';
import Forgotpassword from './views/Forgotpassword.jsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter > {/* Wrap App component with BrowserRouter */}
        <Routes>
          <Route path="/" element={<App />} >
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path='home' element={<Home />} />
            <Route path="forgot-password" element={<Forgotpassword />} />
          </Route>
        </Routes>

      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();