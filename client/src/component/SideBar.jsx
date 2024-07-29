import React, { useState } from 'react'
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { FaUserPlus } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import Avatar from './Avatar.jsx';
import { useDispatch, useSelector } from 'react-redux';
import EditProfile from './EditProfile.jsx';
import { editProfileOpen, logout } from '../redux/userSlice.js';
import Cookies from 'js-cookie';
import axios from 'axios';
import Search from './Search.jsx';

const SideBar = () => {
  const user = useSelector(state => state?.user)
  const dispatch = useDispatch()
  const [openSearchUser, setOpenSearchUser] = useState(false)

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

  return (
    <div className='w-full h-full flex '>
      <div className='bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-green-600 flex flex-col justify-between'>
        <div>
          <NavLink className={({ isActive }) => `w-12 h-12 hover:bg-green-300 text-green-600 flex justify-center items-center ${isActive && 'bg-green-300'}`}>
            <IoChatbubbleEllipsesSharp size={25} />
          </NavLink>
          <div onClick={()=>setOpenSearchUser(true)} className='w-12 h-12 hover:bg-green-300 text-green-600 flex justify-center items-center '>
            <FaUserPlus size={25} />
          </div>

        </div>
        <div className='flex flex-col items-center'>
          <button className='mx-auto mb-2' onClick={() => { dispatch(editProfileOpen({ editProfile: true })) }}> {/* Corrected line */}
            <Avatar width={35} height={35} name={user?.name} imageUrl={user?.profile_pic} />
          </button>
          <button className='w-12 h-12 hover:bg-green-300 text-green-600 flex justify-center items-center ' onClick={handleLogout}>
            <IoIosLogOut size={25} />
          </button>
        </div>
      </div>
      <div
        className='flex justify-center w-full h-full bg-slate-200'
      >
        {
          openSearchUser && (
            <Search onClose={() => setOpenSearchUser(false)} />
          )
        }
      </div>
    </div>
  )
}

export default SideBar