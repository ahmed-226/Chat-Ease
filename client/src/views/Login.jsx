import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setToken } from '../redux/userSlice';

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    e.stopPropagation();
    
    if (loading) return;
    
    try {
      setLoading(true);
      const url = 'http://localhost:4000/api/login'
      const response = await axios.post(url, data, { withCredentials: true })
      toast.success(response?.data?.message)

      if (response.data.success) {
        dispatch(setToken(response?.data?.token))
        localStorage.setItem('token', response?.data?.token)
        
        setData({
          email: "",
          password: ""
        })
        
        navigate('/home', { replace: true })
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='min-h-screen bg-gradient-dark flex items-center justify-center p-4'>
      {/* Background Pattern */}
      <div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23ffffff%22%20fill-opacity=%220.02%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-20'></div>
      
      <div className='relative z-10 w-full max-w-md'>
        {/* Logo Section */}
        <div className='text-center mb-8'>
          <div className='flex items-center justify-center mb-4'>
            <div className='bg-gradient-primary p-3 rounded-2xl shadow-glow'>
              <IoChatboxEllipsesOutline className='text-white text-3xl' />
            </div>
          </div>
          <h1 className='text-3xl font-bold text-white mb-2'>Chat Ease</h1>
          <p className='text-dark-600 text-sm'>Welcome back! Please sign in to continue</p>
        </div>

        {/* Login Form */}
        <div className='bg-dark-200 backdrop-blur-lg border border-dark-300 rounded-2xl p-8 shadow-dark'>
          <div className='text-center mb-6'>
            <h2 className='text-2xl font-bold text-white mb-2'>Sign In</h2>
            <p className='text-dark-600 text-sm'>Access your account</p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Email Field */}
            <div>
              <label htmlFor='email' className='block text-sm font-medium text-dark-600 mb-2'>
                Email Address
              </label>
              <input
                type='email'
                id='email'
                name='email'
                placeholder='Enter your email'
                value={data.email}
                onChange={handleOnChange}
                required
                className='w-full px-4 py-3 bg-dark-300 border border-dark-400 rounded-xl text-white placeholder-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200'
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor='password' className='block text-sm font-medium text-dark-600 mb-2'>
                Password
              </label>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id='password'
                  name='password'
                  placeholder='Enter your password'
                  value={data.password}
                  onChange={handleOnChange}
                  required
                  className='w-full px-4 py-3 bg-dark-300 border border-dark-400 rounded-xl text-white placeholder-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 pr-12'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-4 top-1/2 transform -translate-y-1/2 text-dark-600 hover:text-white transition-colors'
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className='flex justify-end'>
              <Link
                to="/forgot-password"
                className='text-sm text-primary-400 hover:text-primary-300 transition-colors'
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              disabled={loading}
              className='w-full bg-gradient-primary text-white py-3 px-4 rounded-xl font-semibold hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className='mt-6 text-center'>
            <p className='text-dark-600 text-sm'>
              Don't have an account?{' '}
              <Link to="/register" className='text-primary-400 hover:text-primary-300 font-semibold transition-colors'>
                Sign Up
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className='text-center mt-8'>
          <p className='text-dark-700 text-xs'>
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login