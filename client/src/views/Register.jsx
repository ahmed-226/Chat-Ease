import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { FaEye, FaEyeSlash, FaUser, FaCamera } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import uploadFile from '../helpers/uploadFile';
import axios from 'axios';
import toast from 'react-hot-toast';

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: ""
  });
  const [uploadPhoto, setUploadPhoto] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleOnPhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const uploadPhoto = await uploadFile(file)
      setUploadPhoto(file)
      setData((prev) => ({
        ...prev,
        profile_pic: uploadPhoto?.url
      }))
      toast.success('Photo uploaded successfully!');
    } catch (error) {
      toast.error('Failed to upload photo');
      console.error(error);
    } finally {
      setUploading(false);
    }
  }

  const handleClearUploadPhoto = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setUploadPhoto(null)
    setData((prev) => ({
      ...prev,
      profile_pic: ""
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    e.stopPropagation();
    
    if (loading) return;
    
    try {
      setLoading(true);
      const url = 'http://localhost:4000/api/register'
      const response = await axios.post(url, data)
      toast.success(response?.data?.message)
      
      if (response.data.success) {
        setData({
          name: "",
          email: "",
          password: "",
          profile_pic: ""
        })
        setUploadPhoto(null);
        navigate('/login')
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
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.02\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'1\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className='relative z-10 w-full max-w-md'>
        {/* Logo Section */}
        <div className='text-center mb-8'>
          <div className='flex items-center justify-center mb-4'>
            <div className='bg-gradient-primary p-3 rounded-2xl shadow-glow'>
              <IoChatboxEllipsesOutline className='text-white text-3xl' />
            </div>
          </div>
          <h1 className='text-3xl font-bold text-white mb-2'>Chat Ease</h1>
          <p className='text-dark-600 text-sm'>Create your account to get started</p>
        </div>

        {/* Register Form */}
        <div className='bg-dark-200 backdrop-blur-lg border border-dark-300 rounded-2xl p-8 shadow-dark'>
          <div className='text-center mb-6'>
            <h2 className='text-2xl font-bold text-white mb-2'>Sign Up</h2>
            <p className='text-dark-600 text-sm'>Join our community today</p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Profile Picture Upload */}
            <div className='flex justify-center mb-6'>
              <div className='relative'>
                <div className='w-24 h-24 bg-dark-300 border-2 border-dashed border-dark-400 rounded-full flex items-center justify-center overflow-hidden hover:border-primary-500 transition-colors cursor-pointer group'>
                  <label htmlFor='profile_pic' className='cursor-pointer w-full h-full flex items-center justify-center'>
                    {data.profile_pic ? (
                      <img
                        src={data.profile_pic}
                        alt='Profile'
                        className='w-full h-full object-cover'
                      />
                    ) : (
                      <div className='text-center'>
                        {uploading ? (
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                        ) : (
                          <>
                            <FaCamera className='text-2xl text-dark-600 group-hover:text-primary-500 transition-colors' />
                            <p className='text-xs text-dark-600 mt-1'>Photo</p>
                          </>
                        )}
                      </div>
                    )}
                  </label>
                  <input
                    type='file'
                    id='profile_pic'
                    name='profile_pic'
                    onChange={handleOnPhotoUpload}
                    accept="image/*"
                    className='hidden'
                    disabled={uploading}
                  />
                </div>
                {data.profile_pic && (
                  <button
                    type='button'
                    onClick={handleClearUploadPhoto}
                    className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors'
                  >
                    <IoMdClose size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Name Field */}
            <div>
              <label htmlFor='name' className='block text-sm font-medium text-dark-600 mb-2'>
                Full Name
              </label>
              <input
                type='text'
                id='name'
                name='name'
                placeholder='Enter your full name'
                value={data.name}
                onChange={handleOnChange}
                required
                className='w-full px-4 py-3 bg-dark-300 border border-dark-400 rounded-xl text-white placeholder-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200'
              />
            </div>

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
                  placeholder='Create a strong password'
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

            {/* Submit Button */}
            <button
              type='submit'
              disabled={loading || uploading}
              className='w-full bg-gradient-primary text-white py-3 px-4 rounded-xl font-semibold hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <div className='mt-6 text-center'>
            <p className='text-dark-600 text-sm'>
              Already have an account?{' '}
              <Link to="/login" className='text-primary-400 hover:text-primary-300 font-semibold transition-colors'>
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className='text-center mt-8'>
          <p className='text-dark-700 text-xs'>
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register