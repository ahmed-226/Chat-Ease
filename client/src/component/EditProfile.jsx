import React, { useState, useRef, useEffect } from 'react';
import Avatar from './Avatar';
import { MdOutlineEdit } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import axios from 'axios';
import uploadFile from '../helpers/uploadFile';
import { IoMdClose } from "react-icons/io";
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setUser, editProfileOpen } from '../redux/userSlice';

const EditProfile = ({ user }) => {

  const [data, setData] = useState({
    name: user?.name,
    profile_pic: user?.profile_pic
  });

  const uploadPhotoRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      ...user
    }));
  }, [user]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUploadPhoto = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const uploadPhoto = await uploadFile(file);
      setData((prev) => ({
        ...prev,
        profile_pic: uploadPhoto?.url
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const URL = `http://localhost:4000/api/update`;

      const response = await axios({
        method: 'PATCH',
        url: URL,
        data: data,
        withCredentials: true
      });

      toast.success(response?.data?.message);

      if (response.data.success) {
        dispatch(setUser(response.data.data));
        dispatch(editProfileOpen({ editProfile: false }));
      }

    } catch (error) {
      console.log(error);
      toast.error(error?.response?.message || error.message);
    }
  };

  return (
    <div className='bg-slate-100 w-full h-full flex flex-col items-center'>
      <button
        className={`absolute ml-[340px] mt-2 p-2 rounded-full hover:bg-slate-600`}
        onClick={() => dispatch(editProfileOpen({ editProfile: false }))}
      >
        <IoMdClose size={25} />
      </button>
      <div className='w-full'>
        <form onSubmit={handleSubmit} className='flex flex-col w-full'>
          <div className='p-12 bg-green-100 w-full flex justify-center'>
            <Avatar width={150} height={150} name={data?.name} imageUrl={data?.profile_pic} />
            <div className='relative right-7 top-3 bg-slate-700 rounded-full w-8 h-8 p-2 text-white'>
              <label htmlFor='profile_pic'>
                <MdOutlineEdit />
              </label>
              <input
                type='file'
                id='profile_pic'
                name='profile_pic'
                ref={uploadPhotoRef}
                onChange={handleUploadPhoto}
                className='focus:outline-primary hidden'
              />
            </div>
          </div>
          <div className='w-[300px] ml-5 mt-10'>
            <p className='text-2xl mt-6 ml-2 mb-10 flex items-center text-slate-600'>
              <FaUser size={20} className='mr-2' />
              Personal Info
            </p>
            <div>
              <label htmlFor='name' className='block mb-1 ml-2'>Name :</label>
              <input
                type='text'
                name='name'
                id='name'
                value={data?.name}
                onChange={handleOnChange}
                className='w-full p-2 bg-transparent border-b-[3px] border-green-300 focus:outline-none'
              />
            </div>
          </div>
          <div className='bottom-0'>
            <button
              type='submit'
              onClick={handleSubmit}
              className='mt-[410px] ml-[270px] h-[50px] w-[100px] py-2 bg-green-500 hover:bg-green-600 text-black rounded-lg'
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
