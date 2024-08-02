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
  const socketConnections = useSelector(state => state?.user?.socketConnection)
  const [allUser, setAllUser] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleLogout = async () => {
    try {
      const url = 'http://localhost:4000/api/logout'
      const response = await axios.get(url, { withCredentials: true })
      if (response.data.success) {
        dispatch(logout())
        Cookies.remove('token')
      }
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    if (socketConnections) {
      socketConnections.emit('sidebar', user._id)

      socketConnections.on('conversation', (data) => {
        console.log('conversation', data)

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
    <div className='w-full h-full flex '>
      <div className='bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-green-600 flex flex-col justify-between'>
        <div>
          <NavLink className={({ isActive }) => `w-12 h-12 hover:bg-green-300 text-green-600 flex justify-center items-center ${isActive && 'bg-green-300'}`}>
            <IoChatbubbleEllipsesSharp size={25} />
          </NavLink>
          <div onClick={() => setOpenSearchUser(true)} className='w-12 h-12 hover:bg-green-300 text-green-600 flex justify-center items-center '>
            <FaUserPlus size={25} />
          </div>

        </div>
        <div className='flex flex-col items-center'>
          <button className='mx-auto mb-2' onClick={() => { dispatch(editProfileOpen({ editProfile: true })) }}> {/* Corrected line */}
            <Avatar width={35} height={35} name={user?.name} imageUrl={user?.profile_pic} userId={user?._id} />
          </button>
          <button className='w-12 h-12 hover:bg-green-300 text-green-600 flex justify-center items-center ' onClick={handleLogout}>
            <IoIosLogOut size={25} />
          </button>
        </div>
      </div>

      {
        openSearchUser ? (
          <div
            className=' flex justify-center w-full h-full bg-slate-200'
          >

            <Search onClose={() => setOpenSearchUser(false)} />
          </div>
        ) : (
          <div className='w-full'>
            <div className='h-16 flex items-center'>
              <h2 className='text-xl font-bold p-4 text-slate-800'>Message</h2>
            </div>
            <div className='bg-slate-200 p-[0.5px]'></div>

            <div className=' h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto scrollbar'>
              {
                allUser.length === 0 && (
                  <div className='mt-12'>
                    <div className='flex justify-center items-center my-4 text-slate-500'>
                      <FiArrowUpLeft
                        size={50}
                      />
                    </div>
                    <p className='text-lg text-center text-slate-400'>Explore users to start a conversation with.</p>
                  </div>
                )
              }

              {
                allUser.map((conv, index) => {
                  return (
                    <NavLink to={"/" + conv?.userDetails?._id} key={conv?._id} className='flex items-center gap-2 py-3 px-2 border border-transparent hover:border-primary rounded hover:bg-slate-100 cursor-pointer'>
                      <div>
                        <Avatar
                          imageUrl={conv?.userDetails?.profile_pic}
                          name={conv?.userDetails?.name}
                          width={40}
                          height={40}
                        />
                      </div>
                      <div>
                        <h3 className='text-ellipsis line-clamp-1 font-semibold text-base'>{conv?.userDetails?.name}</h3>
                        <div className='text-slate-500 text-xs flex items-center gap-1'>
                          <div className='flex items-center gap-1'>
                            {
                              conv?.lastMsg?.imageUrl && (
                                <div className='flex items-center gap-1'>
                                  <span><FaImage /></span>
                                  {!conv?.lastMsg?.text && <span>Image</span>}
                                </div>
                              )
                            }
                            {
                              conv?.lastMsg?.videoUrl && (
                                <div className='flex items-center gap-1'>
                                  <span><FaVideo /></span>
                                  {!conv?.lastMsg?.text && <span>Video</span>}
                                </div>
                              )
                            }
                          </div>
                          <p className='text-ellipsis line-clamp-1'>{conv?.lastMsg?.text}</p>
                        </div>
                      </div>
                      {
                        Boolean(conv?.unseenMsg) && (
                          <p className='text-xs w-6 h-6 flex justify-center items-center ml-auto p-1 bg-primary text-white font-semibold rounded-full'>{conv?.unseenMsg}</p>
                        )
                      }

                    </NavLink>
                  )
                })
              }
            </div>
          </div>
        )
      }




    </div>
  )
}

export default SideBar