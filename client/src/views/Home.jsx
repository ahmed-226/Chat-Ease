import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { logout, setUser,setOnlineUsers,setSocketConnections } from '../redux/userSlice'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import SideBar from '../component/SideBar'
import EditProfile from '../component/EditProfile.jsx'
import Chat from '../component/Chat.jsx'
import io from 'socket.io-client'
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";

const Home = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const editProfile = useSelector(state => state.user.editProfile)
  const navigate = useNavigate()
  const location = useLocation()

  const fetchUserDetails = async (req, res) => {
    try {
      const response = await axios({
        method: 'GET',
        url: 'http://localhost:4000/api/user-details',
        headers: {
          'Content-Type': 'application'
        },
        withCredentials: true
      })

      dispatch(setUser(response.data.data))

      if (response.data.logout) {
        dispatch(logout())
        navigate('/login')
      }

      
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchUserDetails()
  }, [])

  useEffect(() => {
    const socketConnections = io('http://localhost:4000',{
      auth: {
        token:localStorage.getItem('token')
      }
    })

    socketConnections.on('onlineUsers', (data) => {
      dispatch(setOnlineUsers(data))
    })

    dispatch(setSocketConnections(socketConnections))

    return () => {
      socketConnections.disconnect()
    }
  }, [])

  const basePath = location.pathname === '/home'

  return (
    <div className='bg-gradient-dark grid grid-cols-[400px,1fr] h-screen max-h-screen overflow-hidden'>
      {/* Sidebar Section */}
      <section className='bg-dark-100 border-r border-dark-300'>
        {!editProfile ? (
          <SideBar />
        ) : (
          <EditProfile user={user} />
        )}
      </section>

      {/* Main Content Section */}
      <section className='bg-dark-100 flex-1'>
        {basePath ? (
          
          <div className='flex-1 flex flex-col items-center justify-center text-center p-8 relative h-full'>
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
            
            <div className='relative z-10'>
              {/* Logo */}
              <div className='mb-8'>
                <div className='bg-gradient-primary p-6 rounded-full shadow-glow mx-auto w-fit mb-6'>
                  <IoChatbubbleEllipsesSharp className='text-white text-6xl' />
                </div>
                <h1 className='text-4xl font-bold text-white mb-4'>Welcome to Chat Ease</h1>
                <p className='text-dark-600 text-lg max-w-md mx-auto'>
                  Select a conversation from the sidebar to start chatting, or search for new users to connect with.
                </p>
              </div>

              {/* Features */}
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-12'>
                <div className='bg-dark-200 border border-dark-300 rounded-xl p-6 hover:border-primary-500 transition-colors'>
                  <div className='bg-primary-500 p-3 rounded-lg w-fit mb-4'>
                    <svg className='w-6 h-6 text-white' fill='currentColor' viewBox='0 0 20 20'>
                      <path fillRule='evenodd' d='M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z' clipRule='evenodd' />
                    </svg>
                  </div>
                  <h3 className='text-lg font-semibold text-white mb-2'>Real-time Messaging</h3>
                  <p className='text-dark-600 text-sm'>Send and receive messages instantly with real-time updates.</p>
                </div>

                <div className='bg-dark-200 border border-dark-300 rounded-xl p-6 hover:border-primary-500 transition-colors'>
                  <div className='bg-accent-cyan p-3 rounded-lg w-fit mb-4'>
                    <svg className='w-6 h-6 text-white' fill='currentColor' viewBox='0 0 20 20'>
                      <path fillRule='evenodd' d='M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z' clipRule='evenodd' />
                    </svg>
                  </div>
                  <h3 className='text-lg font-semibold text-white mb-2'>Media Sharing</h3>
                  <p className='text-dark-600 text-sm'>Share images and videos seamlessly with your contacts.</p>
                </div>

                <div className='bg-dark-200 border border-dark-300 rounded-xl p-6 hover:border-primary-500 transition-colors'>
                  <div className='bg-accent-green p-3 rounded-lg w-fit mb-4'>
                    <svg className='w-6 h-6 text-white' fill='currentColor' viewBox='0 0 20 20'>
                      <path d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                    </svg>
                  </div>
                  <h3 className='text-lg font-semibold text-white mb-2'>Online Status</h3>
                  <p className='text-dark-600 text-sm'>See who's online and available for instant communication.</p>
                </div>
              </div>

              {/* Call to Action */}
              <div className='mt-12'>
                <p className='text-dark-600 text-sm mb-4'>Ready to start chatting?</p>
                <div className='flex items-center justify-center gap-2 text-primary-400'>
                  <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                    <path fillRule='evenodd' d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z' clipRule='evenodd' />
                  </svg>
                  <span className='text-sm font-medium'>Click on a conversation or search for users</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          
          <Outlet />
        )}
      </section>
    </div>
  )
}

export default Home