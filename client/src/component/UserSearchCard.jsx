import React from 'react'
import Avatar from './Avatar'
import { IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom';

const UserSearchCard = ({user}) => {
    return (
        <Link to={`${user._id}`}>
            <div className='bg-dark-200 border border-dark-300 rounded-xl p-4 hover:bg-dark-300 hover:border-primary-500 transition-all duration-200 group'>
                <div className='flex items-center gap-3'>
                    <Avatar 
                        width={50} 
                        height={50} 
                        name={user?.name} 
                        imageUrl={user?.profile_pic} 
                        userId={user?._id} 
                    />
                    <div className='flex-1 min-w-0'>
                        <h3 className='text-lg font-semibold text-white group-hover:text-primary-400 transition-colors truncate'>
                            {user?.name}
                        </h3>
                        <p className='text-sm text-dark-600 truncate'>
                            {user?.email}
                        </p>
                    </div>
                    <div className='text-dark-600 group-hover:text-primary-400 transition-colors'>
                        <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                            <path fillRule='evenodd' d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z' clipRule='evenodd' />
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default UserSearchCard