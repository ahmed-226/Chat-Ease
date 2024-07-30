import React from 'react'
import Avatar from './Avatar'
import { IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom';


const UserSearchCard = ({user}) => {
return (
    <div className='w-full h-16  p-2'>
        <Link to={`${user._id}`}>
            <div className='flex justify-between items-center'>
                    <div className='flex items-center'>
                    <Avatar width={40} height={40} name={user?.name} imageUrl={user?.profile_pic} userId={user?._id} />
                    <div className='ml-2'>
                            <p className='text-lg font-semibold'>{user?.name}</p>
                            <p className='text-sm text-gray-500'>{user?.email.length > 20 ? `${user?.email.slice(0, 20)}...` : user?.email}</p>
                    </div>
                    </div>

            </div>
        </Link>
    </div>
)
}

export default UserSearchCard
