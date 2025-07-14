import { Outlet } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setOnlineUsers, setSocketConnections, setUser } from './redux/userSlice';
import io from 'socket.io-client'

function App() {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const fetchUserDetails = async () => {
    try {
      const URL = `http://localhost:4000/api/user-details`
      const response = await axios({
        url: URL,
        withCredentials: true
      })

      dispatch(setUser(response.data.data))

      if (response.data.data.logout) {
        dispatch(logout())
      }
      console.log("current user Details", response)
    } catch (error) {
      console.log("error", error)
    }
  }

  useEffect(() => {
    fetchUserDetails()
  }, [])

  // Socket connection
  useEffect(() => {
    if (user._id) {
      const socketConnections = io('http://localhost:4000', {
        auth: {
          token: localStorage.getItem('token')
        },
      })

      socketConnections.on('onlineUsers', (data) => {
        console.log(data)
        dispatch(setOnlineUsers(data))
      })

      dispatch(setSocketConnections(socketConnections))

      return () => {
        socketConnections.disconnect()
      }
    }
  }, [user._id, dispatch])

  return (
    <>
      <Toaster />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;