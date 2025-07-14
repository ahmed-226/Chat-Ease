/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Avatar from './Avatar'
import { FaAngleLeft } from "react-icons/fa6";
import { IoMdSend } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { FaImage } from "react-icons/fa6";
import uploadFile from '../helpers/uploadFile.js'
import { FaVideo } from "react-icons/fa6";
import Loading from './Loading.jsx'
import moment from 'moment'
import { IoClose } from "react-icons/io5";
import Modal from 'react-modal';
import EmojiPicker from 'emoji-picker-react';
import { BsEmojiSmile } from "react-icons/bs";

const Chat = () => {

  const params = useParams()
  const socketConnections = useSelector(state => state?.user?.socketConnections)
  const user = useSelector(state => state?.user)
  const [loading, setLoading] = useState(false)
  const [allMessage, setAllMessage] = useState([])
  const currentMessage = useRef(null)

  useEffect(() => {
    if (currentMessage.current) {
      currentMessage.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [allMessage])

  const [dataUser, setDataUser] = useState({
    _id: "",
    name: "",
    email: "",
    profile_pic: "",
    online: false,
  })
  const [openImageVideoUpload, setOpenImageVideoUpload] = useState(false)
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false)
  const [message, setMessage] = useState({
    text: "",
    imageUrl: "",
    videoUrl: ""
  })

  
  const [modalImage, setModalImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUploadImageVideoOpen = () => {
    setOpenImageVideoUpload(preve => !preve)
    setOpenEmojiPicker(false) 
  }

  const handleEmojiPickerOpen = () => {
    setOpenEmojiPicker(preve => !preve)
    setOpenImageVideoUpload(false) 
  }

  const handleEmojiClick = (emojiData) => {
    setMessage(preve => ({
      ...preve,
      text: preve.text + emojiData.emoji
    }))
  }

  const handleUploadImage = async (e) => {
    const file = e.target.files[0]

    setLoading(true)
    const uploadPhoto = await uploadFile(file)
    setLoading(false)
    setOpenImageVideoUpload(false)

    setMessage(preve => {
      return {
        ...preve,
        imageUrl: uploadPhoto.url
      }
    })
  }
  const handleClearUploadImage = () => {
    setMessage(preve => {
      return {
        ...preve,
        imageUrl: ""
      }
    })
  }

  useEffect(() => {
    if (socketConnections) {
      socketConnections.emit('chat-page', params.userId)

      socketConnections.emit('seen', params.userId)

      socketConnections.on('chat-user', (data) => {
        setDataUser(data)
      })
    }
  }, [socketConnections, params?.userId])

  const handleOnChange = (e) => {
    const { name, value } = e.target

    setMessage(preve => {
      return {
        ...preve,
        text: value
      }
    })
  }

  const handleUploadVideo = async (e) => {
    const file = e.target.files[0]

    setLoading(true)
    const uploadPhoto = await uploadFile(file)
    setLoading(false)
    setOpenImageVideoUpload(false)

    setMessage(preve => {
      return {
        ...preve,
        videoUrl: uploadPhoto.url
      }
    })
  }

  const handleClearUploadVideo = () => {
    setMessage(preve => {
      return {
        ...preve,
        videoUrl: ""
      }
    })
  }

  const handleSendMessage = (e) => {
    e.preventDefault()

    if (message.text || message.imageUrl || message.videoUrl) {
      if (socketConnections) {
        socketConnections.emit('new message', {
          sender: user?._id,
          receiver: params.userId,
          text: message.text,
          imageUrl: message.imageUrl,
          videoUrl: message.videoUrl,
          msgByUserId: user?._id
        })
        setMessage({
          text: "",
          imageUrl: "",
          videoUrl: ""
        })
      }
    }
  }

  
  const openImageModal = (imageUrl) => {
    setModalImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
  };

  useEffect(() => {
    if (socketConnections) {
      socketConnections.emit('message-page', params.userId)

      socketConnections.emit('seen', params.userId)

      socketConnections.on('message-user', (data) => {
        setDataUser(data)
      })

      socketConnections.on('message', (data) => {
        setAllMessage(data)
      })
    }
  }, [socketConnections, params?.userId, user])

  return (
    <div className='h-screen bg-gradient-dark flex flex-col'>
      {/* Header */}
      <header className='bg-dark-200 border-b border-dark-300 px-6 py-4 flex items-center gap-4 shadow-dark'>
        <Link 
          to={"/home"} 
          className='text-dark-600 hover:text-white transition-colors p-2 rounded-lg hover:bg-dark-300'
        >
          <FaAngleLeft size={20} />
        </Link>
        
        <Avatar
          width={45}
          height={45}
          imageUrl={dataUser?.profile_pic}
          name={dataUser?.name}
          userId={dataUser?._id}
        />
        
        <div className='flex-1'>
          <h3 className='font-semibold text-lg text-white mb-1 truncate'>
            {dataUser?.name}
          </h3>
          <p className='text-sm'>
            {dataUser.online ? (
              <span className='text-accent-cyan flex items-center gap-1'>
                <span className='w-2 h-2 bg-accent-cyan rounded-full'></span>
                Online
              </span>
            ) : (
              <span className='text-dark-600'>Offline</span>
            )}
          </p>
        </div>
      </header>

      {/* Messages Area */}
      <section className='flex-1 overflow-hidden bg-dark-100 relative'>
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.02\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"1\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
          }}
        ></div>
        
        <div className='h-full overflow-y-auto scrollbar-thin scrollbar-thumb-dark-400 scrollbar-track-dark-200 p-4 relative z-10'>
          <div className='flex flex-col gap-3' ref={currentMessage}>
            {allMessage.map((msg, index) => {
              const isOwnMessage = user._id === msg?.msgByUserId;
              
              return (
                <div 
                  key={index} 
                  className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`
                    max-w-[80%] md:max-w-[60%] lg:max-w-[50%] 
                    p-3 rounded-2xl shadow-dark
                    ${isOwnMessage 
                      ? 'bg-gradient-primary text-white rounded-br-md' 
                      : 'bg-dark-200 text-white rounded-bl-md border border-dark-300'
                    }
                  `}>
                    {/* Media Content */}
                    {msg?.imageUrl && (
                      <div className='mb-2'>
                        <img
                          src={msg?.imageUrl}
                          className='w-full h-auto rounded-xl object-cover cursor-pointer hover:opacity-90 transition-opacity'
                          onClick={() => openImageModal(msg.imageUrl)}
                          alt="Shared image"
                        />
                      </div>
                    )}
                    
                    {msg?.videoUrl && (
                      <div className='mb-2'>
                        <video
                          src={msg?.videoUrl}
                          className="w-full h-auto rounded-xl object-cover"
                          controls
                        />
                      </div>
                    )}
                    
                    {/* Text Content */}
                    {msg.text && (
                      <p className='text-sm leading-relaxed mb-1'>
                        {msg.text}
                      </p>
                    )}
                    
                    {/* Timestamp */}
                    <p className={`text-xs mt-2 ${isOwnMessage ? 'text-blue-100' : 'text-dark-600'}`}>
                      {moment(msg.createdAt).format('hh:mm A')}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Image Preview Modal (for new messages being composed) */}
        {message.imageUrl && (
          <div className='absolute inset-0 bg-dark-100 bg-opacity-95 flex items-center justify-center z-40'>
            <button
              onClick={handleClearUploadImage}
              className='absolute top-4 right-4 text-white hover:text-red-400 transition-colors bg-dark-200 rounded-full p-2 z-50'
            >
              <IoClose size={24} />
            </button>
            <div className='max-w-2xl max-h-2xl p-4'>
              <img
                src={message.imageUrl}
                alt='Preview'
                className='w-full h-auto rounded-xl shadow-glow'
              />
            </div>
          </div>
        )}

        {/* Video Preview Modal (for new messages being composed) */}
        {message.videoUrl && (
          <div className='absolute inset-0 bg-dark-100 bg-opacity-95 flex items-center justify-center z-40'>
            <button
              onClick={handleClearUploadVideo}
              className='absolute top-4 right-4 text-white hover:text-red-400 transition-colors bg-dark-200 rounded-full p-2 z-50'
            >
              <IoClose size={24} />
            </button>
            <div className='max-w-2xl max-h-2xl p-4'>
              <video
                src={message.videoUrl}
                className='w-full h-auto rounded-xl shadow-glow'
                controls
                muted
                autoPlay
              />
            </div>
          </div>
        )}

        {/* Loading Overlay */}
        {loading && (
          <div className='absolute inset-0 bg-dark-100 bg-opacity-80 flex items-center justify-center z-30'>
            <div className='bg-dark-200 rounded-xl p-6 shadow-glow'>
              <Loading />
              <p className='text-white text-center mt-2'>Uploading...</p>
            </div>
          </div>
        )}
      </section>

      {/* Full Screen Image Modal (for viewing sent/received images) */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        className="fixed inset-0 flex items-center justify-center p-4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-90"
        style={{
          overlay: {
            zIndex: 9999
          },
          content: {
            zIndex: 10000
          }
        }}
      >
        <button 
          onClick={closeModal} 
          className="absolute top-4 right-4 text-white hover:text-gray-300 bg-black bg-opacity-50 rounded-full p-2 transition-colors z-[10001]"
        >
          <IoClose size={24} />
        </button>
        {modalImage && (
          <img
            src={modalImage}
            alt='Full size'
            className='max-w-full max-h-full object-contain rounded-lg'
          />
        )}
      </Modal>

      {/* Input Area */}
      <section className='bg-dark-200 border-t border-dark-300 p-4'>
        <div className='flex items-center gap-3'>
          {/* Action Buttons */}
          <div className='relative flex gap-2'>
            {/* File Upload Button */}
            <button 
              onClick={handleUploadImageVideoOpen} 
              className='w-10 h-10 bg-dark-300 hover:bg-primary-500 text-dark-600 hover:text-white rounded-full flex items-center justify-center transition-all duration-200 hover:shadow-glow'
            >
              <FaPlus size={18} />
            </button>

            {/* Emoji Picker Button */}
            <button 
              onClick={handleEmojiPickerOpen} 
              className='w-10 h-10 bg-dark-300 hover:bg-accent-cyan text-dark-600 hover:text-white rounded-full flex items-center justify-center transition-all duration-200 hover:shadow-glow'
            >
              <BsEmojiSmile size={18} />
            </button>

            {/* File Upload Menu */}
            {openImageVideoUpload && (
              <div className='absolute bottom-12 left-0 bg-dark-200 border border-dark-300 rounded-xl shadow-dark p-2 z-20 min-w-[140px]'>
                <label 
                  htmlFor='uploadImage' 
                  className='flex items-center gap-3 p-3 hover:bg-dark-300 rounded-lg cursor-pointer transition-colors'
                >
                  <FaImage className='text-primary-400' size={16} />
                  <span className='text-white text-sm'>Image</span>
                </label>
                
                <label 
                  htmlFor='uploadVideo' 
                  className='flex items-center gap-3 p-3 hover:bg-dark-300 rounded-lg cursor-pointer transition-colors'
                >
                  <FaVideo className='text-purple-400' size={16} />
                  <span className='text-white text-sm'>Video</span>
                </label>

                <input
                  type='file'
                  id='uploadImage'
                  onChange={handleUploadImage}
                  accept="image/*"
                  className='hidden'
                />

                <input
                  type='file'
                  id='uploadVideo'
                  onChange={handleUploadVideo}
                  accept="video/*"
                  className='hidden'
                />
              </div>
            )}

            {/* Emoji Picker */}
            {openEmojiPicker && (
              <div className='absolute bottom-12 left-0 z-20'>
                <EmojiPicker
                  onEmojiClick={handleEmojiClick}
                  width={320}
                  height={400}
                  theme="dark"
                />
              </div>
            )}
          </div>

          {/* Message Input Form */}
          <form onSubmit={handleSendMessage} className='flex-1 flex items-center gap-3'>
            <input
              type='text'
              placeholder='Type a message...'
              className='flex-1 bg-dark-300 border border-dark-400 rounded-xl px-4 py-3 text-white placeholder-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200'
              value={message.text}
              onChange={handleOnChange}
            />
            
            <button 
              type='submit'
              disabled={!message.text.trim() && !message.imageUrl && !message.videoUrl}
              className='w-10 h-10 bg-gradient-primary text-white rounded-full flex items-center justify-center hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              <IoMdSend size={18} />
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Chat