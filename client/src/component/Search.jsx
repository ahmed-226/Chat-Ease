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

    console.log("searchUser", searchUser);

    return (
        <div className='flex flex-col w-full'>
            <div className='text-2xl px-5 py-3 mt-2 w-full lg:text-4xl hover:text-white' onClick={onClose}>
                <button>
                    <FaArrowLeft />
                </button>
            </div>
            <div className='w-full h-full px-5'>
                {/* input search user */}
                <div className='bg-white rounded-full h-14 overflow-hidden flex'>
                    <input
                        type='text'
                        placeholder='Search user by name, email....'
                        className='w-full bg-white outline-none py-1 h-full px-4'
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    />
                    <div className='h-14 w-14 pr-3 flex justify-center items-center'>
                        <IoSearchOutline size={25} />
                    </div>
                </div>

                {/* display search user */}
                { !loading && searchUser.length === 0 ? null : (
                    <div className='mt-2 w-full p-1 bg-white rounded'>
                        {/* no user found */}
                        {
                            searchUser.length === 0 && !loading && (
                                <p className='text-center text-slate-500'>no user found!</p>
                            )
                        }

                        {
                            loading && (
                                <p><Loading /></p>
                            )
                        }

                        {
                            searchUser.length !== 0 && !loading && (
                                searchUser.map((user, index) => {
                                    return (
                                        <div className='mb-1' key={user._id}>
                                            <UserSearchCard user={user} />
                                        </div>
                                    );
                                })
                            )
                        }
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;
