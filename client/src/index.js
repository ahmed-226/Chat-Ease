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
import { Provider, useSelector } from 'react-redux';
import { store } from './redux/store.js';
import Chat from './component/Chat.jsx';
import Cookies from 'js-cookie';




const auth=localStorage.getItem('token')



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="forgot-password" element={<Forgotpassword />} />
            <Route path="home" element={auth?<Home />:<Login />}>
              <Route path=":userId" element={<Chat />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
