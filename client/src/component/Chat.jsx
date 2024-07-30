import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const Chat = () => {

  const params=useParams()
  const socketConnections=useSelector(state=>state?.user?.socketConnections)

  console.log('params:',params.userId);

  useEffect(() => {
    if (socketConnections){
      socketConnections.emit('chat-page', params.userId )

      socketConnections.on('chat-user',(data)=>{
        console.log("user details",data);
      })
    }
  }, [socketConnections,params?.userId])

  return (
    <h1>
      chat areadsdsdsd
    </h1>
  )
}

export default Chat