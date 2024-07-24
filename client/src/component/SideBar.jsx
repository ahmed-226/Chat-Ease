import React ,{useState}from 'react'
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { FaUserPlus } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import Avatar from './Avatar.jsx';
import { useSelector } from 'react-redux';
import EditProfile from './EditProfile.jsx';


const SideBar = () => {

  const user = useSelector(state => state?.user)
  


  return (
    <div className='w-full h-full'>
      <div className='bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-slate-600 flex flex-col justify-between'>
        <div>

            <NavLink className={({isActive})=>`w-12 h-12 hover:bg-slate-300 text-slate-600 flex justify-center items-center ${isActive && 'bg-slate-300'}`}>
                <IoChatbubbleEllipsesSharp size={25} />
            </NavLink>

            <NavLink className='w-12 h-12 hover:bg-slate-300 text-slate-600 flex justify-center items-center '>
                <FaUserPlus size={25} />
            </NavLink>
        </div>
        <div className='flex flex-col items-center'>
        <button className='mx-auto' >
                        <Avatar

                            width={35}
                            height={35}
                            name={user?.name}
                            // imageUrl={user?.profile_pic}
                            // userId={user?._id}
                        />
                    </button>

          <button className='w-12 h-12 hover:bg-slate-300 text-slate-600 flex justify-center items-center '>
                <IoIosLogOut size={25} />
          </button>
        </div>
      </div>
      
    </div>
  )
}

export default SideBar
