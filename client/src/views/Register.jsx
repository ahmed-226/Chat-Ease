import React, { useState } from 'react'
import NavBar from '../component/NavBar'
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import uploadFile from '../helpers/uploadFile';


const Register = () => {

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: ""
  });
  const [uploadPhoto, setUploadPhoto] = useState("")

  const navigate = useNavigate();


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

  const handleClearUploadPhoto = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setUploadPhoto(null)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation();
    console.log(data)
  }

  return (
    <>
      <img src="/auth-img.9302755e73810f6c27d2.png" alt="myImage" style={{ position: 'absolute', width: "700px", bottom: "0px" }} />
      <div className='500 h-[100vh] flex justify-end ' style={{ backgroundColor: "rgb(78 ,172, 109)" }}>
        <div className='bg-white h-[90vh] w-[70vw] flex justify-center items-center mr-10 mt-10 rounded-lg mx-auto'>
          <div className='flex justify-center items-center h-[80vh]'>
            <div className='flex flex-col justify-center items-center'>
              <h1 className='text-3xl font-bold mb-20 ' style={{ color: "#4f4f4f" }}>Welcome to Chat Ease!</h1>
              <div className='w-[530px] bg-white p-5 shadow-md rounded-lg'>
                <div className='flex justify-between items-center'>
                  <h1 className='text-2xl font-bold'>Register</h1>
                </div>
                <form className='mt-5' onSubmit={handleSubmit}>
                  <div className='mb-4'>
                    <label htmlFor='name' >Name</label>
                    <input
                      type='text'
                      id='name'
                      name='name'
                      placeholder='enter your name'
                      value={data.name}
                      onChange={handleOnChange}
                      required
                      className='w-full p-2 border border-gray-300 rounded-lg' />
                  </div>
                  <div className='mb-4'>
                    <label htmlFor='email' className='block mb-2'>email</label>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      placeholder='enter your email'
                      value={data.email}
                      onChange={handleOnChange}
                      required
                      className='w-full p-2 border border-gray-300 rounded-lg' />
                  </div>
                  <div className='mb-4'>
                    <label htmlFor='password' className='block mb-2'>password</label>
                    <input
                      type='password'
                      id='password'
                      name='password'
                      placeholder='enter your password'
                      value={data.password}
                      onChange={handleOnChange}
                      required
                      className='w-full p-2 border border-gray-300 rounded-lg' />
                  </div>
                  <div>
                    <label htmlFor='profile_pic'>Photo :
                      <div className='h-20  border-gray-300 flex justify-center items-center border rounded hover:border-primary cursor-pointer'>
                        <p className='text-sm max-w-[300px] text-ellipsis line-clamp-1'>
                          {
                            uploadPhoto?.name ? uploadPhoto?.name : "Upload profile photo"
                          }
                        </p>
                        {
                          uploadPhoto?.name && (
                            <button className='text-lg ml-2 hover:text-red-600' onClick={handleClearUploadPhoto}>
                              <IoMdClose />
                            </button>
                          )
                        }

                      </div>

                    </label>
                    <input
                      type='file'
                      id='profile_pic'
                      name='profile_pic'
                      onChange={handleOnPhotoUpload}
                      className='bg-slate-100 px-2 py-1 focus:outline-primary hidden' />
                  </div>
                  <button type='submit' className='mt-5 h-[60px] w-full py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg'>Register</button>
                </form>
                <p
                  className='mt-5 text-sm text-center'
                >Already had an accound ? <Link to={"/login"} className='font-bold hover:text-green-500 hover:underline'>Login</Link></p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>

  )
}

export default Register
