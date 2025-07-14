import React, { useEffect, useState } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import Loading from './Loading.jsx';
import UserSearchCard from './UserSearchCard';
import toast from 'react-hot-toast';
import axios from 'axios';
import { FaArrowLeft } from "react-icons/fa6";

const Search = ({onClose}) => {

    const [searchUser, setSearchUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");

    const handleSearchUser = async () => {
        if (search.trim() === "") {
            setSearchUser([]);
            return;
        }

        const URL = `http://localhost:4000/api/search`;
        try {
            setLoading(true);
            const response = await axios.post(URL, {
                search: search
            });
            setLoading(false);

            setSearchUser(response.data.data);
        } catch (error) {
            setLoading(false);
            toast.error(error?.response?.data?.message);
        }
    };

    useEffect(() => {
        handleSearchUser();
    }, [search]);

    return (
        <div className='flex flex-col w-full h-full bg-dark-100 relative'>
            {/* Background Pattern */}
            <div 
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}
            ></div>
            
            <div className='relative z-10 flex flex-col h-full'>
                {/* Header */}
                <div className='bg-dark-200 border-b border-dark-300 px-6 py-4 flex items-center gap-4 shadow-dark'>
                    <button
                        onClick={onClose}
                        className='text-dark-600 hover:text-white transition-colors p-2 rounded-lg hover:bg-dark-300'
                    >
                        <FaArrowLeft size={20} />
                    </button>
                    <h2 className='text-xl font-bold text-white'>Find Users</h2>
                </div>

                {/* Search Bar */}
                <div className='p-6'>
                    <div className='relative'>
                        <input
                            type='text'
                            placeholder='Search by name or email...'
                            className='w-full px-4 py-3 pl-12 bg-dark-300 border border-dark-400 rounded-xl text-white placeholder-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200'
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                        />
                        <IoSearchOutline 
                            className='absolute left-4 top-1/2 transform -translate-y-1/2 text-dark-600' 
                            size={20} 
                        />
                    </div>
                </div>

                {/* Search Results */}
                <div className='flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-dark-400 scrollbar-track-dark-200 px-6 pb-6'>
                    {!loading && searchUser.length === 0 && search.trim() === "" ? (
                        <div className='flex flex-col items-center justify-center h-full text-center'>
                            <div className='bg-dark-200 rounded-full p-6 mb-4'>
                                <IoSearchOutline className='text-dark-600' size={40} />
                            </div>
                            <h3 className='text-lg font-semibold text-white mb-2'>Search for users</h3>
                            <p className='text-dark-600 text-sm max-w-xs'>
                                Enter a name or email to find users and start chatting
                            </p>
                        </div>
                    ) : (
                        <div className='space-y-2'>
                            {/* Loading State */}
                            {loading && (
                                <div className='flex justify-center py-8'>
                                    <Loading />
                                </div>
                            )}

                            {/* No Results */}
                            {!loading && searchUser.length === 0 && search.trim() !== "" && (
                                <div className='text-center py-8'>
                                    <div className='bg-dark-200 rounded-full p-6 mx-auto mb-4 w-fit'>
                                        <IoSearchOutline className='text-dark-600' size={40} />
                                    </div>
                                    <h3 className='text-lg font-semibold text-white mb-2'>No users found</h3>
                                    <p className='text-dark-600 text-sm'>
                                        Try searching with a different name or email
                                    </p>
                                </div>
                            )}

                            {/* Search Results */}
                            {!loading && searchUser.length > 0 && (
                                searchUser.map((user, index) => (
                                    <UserSearchCard key={user._id} user={user} />
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Search;