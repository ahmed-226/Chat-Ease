import React, { useState } from 'react'
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { FaUserPlus } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import Avatar from './Avatar.jsx';
import { useDispatch, useSelector } from 'react-redux';
import EditProfile from './EditProfile.jsx';
import { editProfileOpen } from '../redux/userSlice.js';

const SideBar = () => {
  const user = useSelector(state => state?.user)
  const dispatch = useDispatch()

  return (
    <div className='w-full h-full'>
      <div className='bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-green-600 flex flex-col justify-between'>
        <div>
          <NavLink className={({ isActive }) => `w-12 h-12 hover:bg-green-300 text-green-600 flex justify-center items-center ${isActive && 'bg-green-300'}`}>
            <IoChatbubbleEllipsesSharp size={25} />
          </NavLink>
          <NavLink className='w-12 h-12 hover:bg-green-300 text-green-600 flex justify-center items-center '>
            <FaUserPlus size={25} />
          </NavLink>
        </div>
        <div className='flex flex-col items-center'>
          <button className='mx-auto' onClick={() => { dispatch(editProfileOpen({ editProfile: true })) }}> {/* Corrected line */}
          <Avatar width={35} height={35} name={user?.name} imageUrl={user?.profile_pic} />
          </button>
          <button className='w-12 h-12 hover:bg-green-300 text-green-600 flex justify-center items-center '>
            <IoIosLogOut size={25} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default SideBar