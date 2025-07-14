import React, { useState, useEffect } from 'react'
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { FaUserPlus } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import Avatar from './Avatar.jsx';
import { useDispatch, useSelector } from 'react-redux';
import EditProfile from './EditProfile.jsx';
import { editProfileOpen, logout } from '../redux/userSlice.js';
import Cookies from 'js-cookie';
import axios from 'axios';
import Search from './Search.jsx';
import { FaImage } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa6";
import { FiArrowUpLeft } from "react-icons/fi";

const SideBar = () => {

  const user = useSelector(state => state?.user)
  const [openSearchUser, setOpenSearchUser] = useState(false)
  const socketConnections = useSelector(state => state?.user?.socketConnections)
  const [allUser, setAllUser] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const url = 'http://localhost:4000/api/logout'
      const response = await axios.get(url, { withCredentials: true })
      if (response.data.success) {
        dispatch(logout())
        localStorage.removeItem('token')
        Cookies.remove('token')
        navigate('/login', { replace: true })
      }
    } catch (error) {
      console.log(error)
      dispatch(logout())
      localStorage.removeItem('token')
      Cookies.remove('token')
      navigate('/login', { replace: true })
    }
  }
  
  useEffect(() => {
    if (socketConnections) {
      socketConnections.emit('sidebar', user._id)

      socketConnections.on('conversation', (data) => {
        const conversationUserData = data.map((conversationUser, index) => {
          if (conversationUser?.sender?._id === conversationUser?.receiver?._id) {
            return {
              ...conversationUser,
              userDetails: conversationUser?.sender
            }
          }
          else if (conversationUser?.receiver?._id !== user?._id) {
            return {
              ...conversationUser,
              userDetails: conversationUser.receiver
            }
          } else {
            return {
              ...conversationUser,
              userDetails: conversationUser.sender
            }
          }
        })

        setAllUser(conversationUserData)
      })
    }
  }, [socketConnections, user])

  return (
    <div className='w-full h-full flex bg-gradient-dark'>
      {/* Left Navigation */}
      <div className='bg-dark-200 border-r border-dark-300 w-16 h-full py-4 flex flex-col justify-between shadow-dark'>
        <div className='flex flex-col gap-2'>
          <NavLink 
            className={({ isActive }) => `
              w-12 h-12 mx-auto rounded-xl flex justify-center items-center transition-all duration-200
              ${isActive 
                ? 'bg-gradient-primary text-white shadow-glow' 
                : 'text-dark-600 hover:text-white hover:bg-dark-300'
              }
            `}
          >
            <IoChatbubbleEllipsesSharp size={24} />
          </NavLink>
          
          <button 
            onClick={() => setOpenSearchUser(true)} 
            className='w-12 h-12 mx-auto rounded-xl flex justify-center items-center text-dark-600 hover:text-white hover:bg-dark-300 transition-all duration-200'
          >
            <FaUserPlus size={22} />
          </button>
        </div>
        
        <div className='flex flex-col items-center gap-3'>
          <button 
            className='relative group' 
            onClick={() => { dispatch(editProfileOpen({ editProfile: true })) }}
          > 
            <Avatar width={40} height={40} name={user?.name} imageUrl={user?.profile_pic} userId={user?._id} />
            <div className='absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20 rounded-full transition-opacity duration-200'></div>
          </button>
          
          <button 
            className='w-12 h-12 rounded-xl flex justify-center items-center text-dark-600 hover:text-red-400 hover:bg-dark-300 transition-all duration-200 group'
            onClick={handleLogout}
          >
            <IoIosLogOut size={24} className='group-hover:scale-110 transition-transform duration-200' />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {openSearchUser ? (
        <div className='flex-1 bg-dark-100 relative'>
          <Search onClose={() => setOpenSearchUser(false)} />
        </div>
      ) : (
        <div className='flex-1 bg-dark-100 flex flex-col'>
          {/* Header */}
          <div className='bg-dark-200 border-b border-dark-300 px-6 py-4 shadow-dark'>
            <h2 className='text-xl font-bold text-white flex items-center gap-2'>
              <IoChatbubbleEllipsesSharp className='text-primary-400' />
              Messages
            </h2>
          </div>

          {/* Conversations List */}
          <div className='flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-dark-400 scrollbar-track-dark-200'>
            {allUser.length === 0 ? (
              <div className='flex flex-col items-center justify-center h-full p-8 text-center'>
                <div className='bg-dark-200 rounded-full p-6 mb-4'>
                  <FiArrowUpLeft className='text-dark-600' size={40} />
                </div>
                <h3 className='text-lg font-semibold text-white mb-2'>No conversations yet</h3>
                <p className='text-dark-600 text-sm max-w-xs'>
                  Click the + button above to search for users and start a conversation
                </p>
              </div>
            ) : (
              <div className='p-2'>
                {allUser.map((conv, index) => (
                  <NavLink 
                    to={"/home/" + conv?.userDetails?._id} 
                    key={conv?._id} 
                    className={({ isActive }) => `
                      flex items-center gap-3 p-3 mx-2 my-1 rounded-xl transition-all duration-200 group
                      ${isActive 
                        ? 'bg-gradient-primary text-white shadow-glow' 
                        : 'text-white hover:bg-dark-200 border border-transparent hover:border-dark-300'
                      }
                    `}
                  >
                    <div className='relative'>
                      <Avatar
                        imageUrl={conv?.userDetails?.profile_pic}
                        name={conv?.userDetails?.name}
                        width={50}
                        height={50}
                        userId={conv?.userDetails?._id}
                      />
                    </div>
                    
                    <div className='flex-1 min-w-0'>
                      <h3 className='font-semibold text-base truncate mb-1'>
                        {conv?.userDetails?.name}
                      </h3>
                      
                      <div className='flex items-center gap-2 text-xs opacity-75'>
                        {conv?.lastMsg?.imageUrl && (
                          <div className='flex items-center gap-1'>
                            <FaImage size={12} />
                            {!conv?.lastMsg?.text && <span>Image</span>}
                          </div>
                        )}
                        {conv?.lastMsg?.videoUrl && (
                          <div className='flex items-center gap-1'>
                            <FaVideo size={12} />
                            {!conv?.lastMsg?.text && <span>Video</span>}
                          </div>
                        )}
                        <p className='truncate flex-1'>
                          {conv?.lastMsg?.text || 'No messages yet'}
                        </p>
                      </div>
                    </div>

                    {Boolean(conv?.unseenMsg) && (
                      <div className='bg-accent-cyan text-white text-xs font-semibold rounded-full min-w-[20px] h-5 flex items-center justify-center px-2'>
                        {conv.unseenMsg > 99 ? '99+' : conv.unseenMsg}
                      </div>
                    )}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default SideBar