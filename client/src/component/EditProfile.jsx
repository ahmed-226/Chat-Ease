import React, { useState,useEffect} from 'react'
import Avatar from './Avatar'
import { MdOutlineEdit } from "react-icons/md";
import uploadFile from '../helpers/uploadFile';

const EditProfile = ({ user }) => {

    const [data, setData] = useState({
        name: user?.name,
        profile_pic: user?.profile_pic
    })
    const [uploadPhoto, setUploadPhoto] = useState("")

    useEffect(() => {
        setData((preve) => {
            return {
                ...preve,
                ...user
            }
        })
    }, [user])

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    
    }

    const handleOnPhotoUpload = async(e) => {
        const file = e.target.files[0];
        const uploadPhoto = await uploadFile(file)
        setUploadPhoto(file)
        setData((preve) => {
          return {
            ...preve,
            profile_pic: uploadPhoto?.url
          }
        })
      }

    const handleSubmit = (e) => {
        e.preventDefault()
        e.stopPropagation();
        console.log(data);
    }


    return (
        <div className=' bg-slate-200 w-full h-full flex flex-col items-center'>
            <div className=' p-12 bg-slate-300 w-full flex justify-center'>
                <Avatar
                    width={150}
                    height={150}
                    name={data?.name}
                    imageUrl={data?.profile_pic}
                />
                <div size={30} className=' relative right-7 top-3 bg-slate-700 rounded-full w-8 h-8 p-2 text-white '>
                <label htmlFor='profile_pic'>
                    <MdOutlineEdit   />
                </label>
                <input 
                    type='file'
                    id='profile_pic'
                    name='profile_pic'
                    onChange={handleOnPhotoUpload}
                    className='focus:outline-primary hidden '
                    />
                    </div>
            </div>
            <p className=' text-2xl mt-4 text-slate-600'>
                Personal Info
            </p>
            <div className=' w-full'>
                <form  
                    onSubmit={handleSubmit}
                    className=' bg-slate-500 w-[300px] ml-5 mt-10'>
                    <div>

                    <label 
                        htmlFor="name"
                        className='block mb-1 ml-2'    
                        >Name :</label>
                    <input 
                    type="text"
                    name='name'
                    id='name'
                    value={data?.name}
                    onChange={handleOnChange}
                    className='w-full p-2 border border-gray-300 '
                    />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProfile
