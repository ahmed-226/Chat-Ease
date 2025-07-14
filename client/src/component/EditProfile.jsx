import React, { useState, useRef, useEffect } from 'react';
import Avatar from './Avatar';
import { MdOutlineEdit } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import axios from 'axios';
import uploadFile from '../helpers/uploadFile';
import { IoMdClose } from "react-icons/io";
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setUser, editProfileOpen, setOnlineUsers } from '../redux/userSlice';

const EditProfile = ({ user }) => {

  const [data, setData] = useState({
    name: user?.name || "",
    profile_pic: user?.profile_pic || ""
  });

  const [uploading, setUploading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const uploadPhotoRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    setData({
      name: user?.name || "",
      profile_pic: user?.profile_pic || ""
    });
  }, [user]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    
    e.target.value = '';

    try {
      setUploading(true);
      console.log('Starting upload for file:', file.name, 'Size:', file.size);
      
      
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }

      
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }
      
      const uploadPhoto = await uploadFile(file);
      console.log('Upload result:', uploadPhoto);
      
      if (uploadPhoto?.url) {
        setData((prev) => ({
          ...prev,
          profile_pic: uploadPhoto.url
        }));
        toast.success('Image uploaded successfully');
      } else {
        toast.error('Failed to upload image - no URL returned');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(`Upload failed: ${error.message || 'Unknown error'}`);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (updating) {
      toast.error('Update already in progress');
      return;
    }

    try {
      setUpdating(true);
      console.log('Submitting data:', { 
        name: data.name, 
        profile_pic: data.profile_pic ? 'URL provided' : 'No URL' 
      });
      
      const URL = `http://localhost:4000/api/update`;
      const response = await axios({
        method: 'PATCH',
        url: URL,
        data: {
          name: data.name.trim(),
          profile_pic: data.profile_pic
        },
        withCredentials: true,
        timeout: 15000,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Update response:', response.data);

      if (response.data.success) {
        toast.success(response?.data?.message || 'Profile updated successfully');
        
        
        dispatch(setUser(response.data.data));
        
        
        dispatch(editProfileOpen({ editProfile: false }));
      } else {
        toast.error(response?.data?.message || 'Failed to update profile');
      }

    } catch (error) {
      console.error('Update error:', error);
      
      if (error.code === 'ECONNABORTED') {
        toast.error('Request timeout - please check your connection and try again');
      } else if (error.response) {
        const message = error.response.data?.message || `Server error: ${error.response.status}`;
        toast.error(message);
      } else if (error.request) {
        toast.error('Network error - please check your connection');
      } else {
        toast.error(`Error: ${error.message}`);
      }
    } finally {
      setUpdating(false);
    }
  };

  const handleCancel = () => {
    setData({
      name: user?.name || "",
      profile_pic: user?.profile_pic || ""
    });
    dispatch(editProfileOpen({ editProfile: false }));
  };

  return (
    <div className='bg-gradient-dark w-full h-full flex flex-col relative'>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2760%27%20height%3D%2760%27%20viewBox%3D%270%200%2060%2060%27%20xmlns%3D%27http://www.w3.org/2000/svg%27%3E%3Cg%20fill%3D%27none%27%20fill-rule%3D%27evenodd%27%3E%3Cg%20fill%3D%27%23ffffff%27%20fill-opacity%3D%270.02%27%3E%3Ccircle%20cx%3D%2730%27%20cy%3D%2730%27%20r%3D%271%27/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      {/* Close Button */}
      <button
        className='absolute top-4 right-4 z-20 text-dark-600 hover:text-white bg-dark-200 hover:bg-dark-300 rounded-full p-2 transition-colors border border-dark-300 shadow-dark'
        onClick={handleCancel}
        disabled={uploading || updating}
      >
        <IoMdClose size={20} />
      </button>
      
      <div className='relative z-10 w-full h-full overflow-y-auto scrollbar-thin scrollbar-thumb-dark-400 scrollbar-track-dark-200'>
        <form onSubmit={handleSubmit} className='flex flex-col min-h-full'>
          {/* Header Section */}
          <div className='bg-dark-200 border-b border-dark-300 px-6 py-8 text-center shadow-dark'>
            <h1 className='text-2xl font-bold text-white mb-2'>Edit Profile</h1>
            <p className='text-dark-600 text-sm'>Update your personal information</p>
          </div>

          {/* Profile Picture Section */}
          <div className='bg-dark-200 border-b border-dark-300 px-6 py-8 flex justify-center relative'>
            <div className='relative'>
              <Avatar width={120} height={120} name={data?.name} imageUrl={data?.profile_pic} />
              
              {/* Edit Button */}
              <div className='absolute -bottom-2 -right-2 bg-primary-500 hover:bg-primary-600 rounded-full p-3 text-white shadow-glow transition-all duration-200 cursor-pointer'>
                <label htmlFor='profile_pic' className='cursor-pointer'>
                  {uploading ? (
                    <div className="animate-spin">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                    </div>
                  ) : (
                    <MdOutlineEdit size={20} />
                  )}
                </label>
                <input
                  type='file'
                  id='profile_pic'
                  name='profile_pic'
                  ref={uploadPhotoRef}
                  onChange={handleUploadPhoto}
                  accept="image/*"
                  disabled={uploading || updating}
                  className='hidden'
                />
              </div>

              {/* Upload Overlay */}
              {uploading && (
                <div className='absolute inset-0 bg-dark-100 bg-opacity-80 rounded-full flex items-center justify-center'>
                  <div className='text-white text-center'>
                    <div className="animate-spin mb-2 mx-auto">
                      <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full"></div>
                    </div>
                    <p className='text-xs'>Uploading...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Form Section */}
          <div className='flex-1 px-6 py-8'>
            <div className='max-w-md mx-auto'>
              {/* Personal Info Header */}
              <div className='flex items-center gap-3 mb-8'>
                <div className='bg-primary-500 p-2 rounded-lg'>
                  <FaUser className='text-white' size={20} />
                </div>
                <h2 className='text-xl font-semibold text-white'>Personal Information</h2>
              </div>

              {/* Name Field */}
              <div className='mb-6'>
                <label htmlFor='name' className='block text-sm font-medium text-dark-600 mb-2'>
                  Full Name
                </label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  value={data?.name}
                  onChange={handleOnChange}
                  disabled={uploading || updating}
                  placeholder='Enter your full name'
                  className='w-full px-4 py-3 bg-dark-300 border border-dark-400 rounded-xl text-white placeholder-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 disabled:opacity-50'
                  required
                  minLength="2"
                  maxLength="50"
                />
              </div>

              {/* Email Field (Read Only) */}
              <div className='mb-8'>
                <label htmlFor='email' className='block text-sm font-medium text-dark-600 mb-2'>
                  Email Address
                </label>
                <input
                  type='email'
                  id='email'
                  value={user?.email || ''}
                  disabled
                  className='w-full px-4 py-3 bg-dark-400 border border-dark-500 rounded-xl text-dark-600 cursor-not-allowed'
                />
                <p className='text-xs text-dark-600 mt-1'>Email cannot be changed</p>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className='bg-dark-200 border-t border-dark-300 px-6 py-6'>
            <div className='max-w-md mx-auto flex gap-4'>
              <button
                type='button'
                onClick={handleCancel}
                disabled={uploading || updating}
                className='flex-1 py-3 px-4 bg-dark-400 hover:bg-dark-500 disabled:bg-dark-500 text-white rounded-xl transition-colors font-medium'
              >
                Cancel
              </button>
              <button
                type='submit'
                disabled={uploading || updating || !data.name.trim()}
                className='flex-1 py-3 px-4 bg-gradient-primary text-white rounded-xl font-medium hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
              >
                {updating ? (
                  <div className="animate-spin">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                  </div>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;