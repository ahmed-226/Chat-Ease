import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { logout, setUser } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'
import SideBar from '../component/SideBar'
import EditProfile from '../component/EditProfile.jsx'


const Home = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  console.log('dummy console', user)
  const navigate = useNavigate()
  const [editUserOpen, setEditUserOpen] = useState(true)

  const fetchUserDetails = async (req, res) => {
    try {
      const response = await axios({
        method: 'GET',
        url: 'http://localhost:4000/api/user-details',
        headers: {
          'Content-Type': 'application'
        },
        withCredentials: true
      })

      dispatch(setUser(response.data.data))

      if (response.data.logout) {
        dispatch(logout())
        navigate('/login')
      }

      console.log('user details', response)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchUserDetails()
  }, [])


  return (
    <div className='bg-slate-400 grid lg:grid-cols-[400px,1fr] h-screen max-h-screen'>
      <section className='bg-white'>
        {!editUserOpen ? (
          <SideBar />
        ) : (
          <EditProfile user={user} />

        )}
      </section>
    
    </div>
  )
}

export default Home
