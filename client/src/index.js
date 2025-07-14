import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Register from './views/Register.jsx';
import Home from './views/Home.jsx';
import Login from './views/Login.jsx';
import Forgotpassword from './views/Forgotpassword.jsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import Chat from './component/Chat.jsx';
import ProtectedRoute from './component/ProtectedRoute.jsx';
import PublicRoute from './component/PublicRoute.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="register" element={<PublicRoute><Register /></PublicRoute>} />
            <Route path="login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="forgot-password" element={<PublicRoute><Forgotpassword /></PublicRoute>} />
            <Route path="home" element={<ProtectedRoute><Home /></ProtectedRoute>}>
              <Route path=":userId" element={<Chat />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();