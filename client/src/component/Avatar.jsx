import React from 'react'
import { PiUserCircle } from "react-icons/pi";
import { useSelector } from 'react-redux';
import seedrandom from 'seedrandom';

const Avatar = ({userId,name,imageUrl,width,height}) => {
    const onlineUser = useSelector(state => state?.user?.onlineUsers)

    let avatarName = ""

    if(name){
      const splitName = name?.split(" ")

      if(splitName.length > 1){
        
        const firstName = splitName[0]?.[0]
        const lastName = splitName[1]?.[0]
        
        if(firstName && lastName) {
          avatarName = firstName.toUpperCase() + lastName.toUpperCase()
        } else if(firstName) {
          avatarName = firstName.toUpperCase()
        }
      }else{
        
        const firstName = splitName[0]?.[0]
        if(firstName) {
          avatarName = firstName.toUpperCase()
        }
      }
    }

    const bgColor = [
      'bg-slate-200',
      'bg-teal-200',
      'bg-red-200',
      'bg-green-200',
      'bg-yellow-200',
      'bg-gray-200',
      "bg-cyan-200",
      "bg-sky-200",
      "bg-blue-200"
    ]

    
    const getConsistentColor = () => {
      if (userId) {
        
        const rng = seedrandom(userId);
        return Math.floor(rng() * bgColor.length);
      } else if (name) {
        
        const rng = seedrandom(name);
        return Math.floor(rng() * bgColor.length);
      }
      return 0; 
    };

    const colorIndex = getConsistentColor();
    const isOnline = onlineUser?.includes(userId)

    return (
      <div className={`text-slate-800 rounded-full font-bold relative`} style={{width : width+"px", height : height+"px" }}>
          {
              imageUrl ? (
                  <img
                      src={imageUrl}
                      width={width}
                      height={height}
                      alt={name || 'User avatar'}
                      className='overflow-hidden rounded-full w-full h-full object-cover'
                      onError={(e) => {
                        console.log('Image failed to load:', imageUrl);
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                  />
              ) : null
          }
          
          {/* Fallback avatar with initials */}
          {(!imageUrl || imageUrl === '') && name ? (
              <div  
                style={{
                  width : width+"px", 
                  height : height+"px",
                  fontSize: Math.max((width-50), 12)+"px" 
                }} 
                className={`overflow-hidden rounded-full flex justify-center items-center border border-[2px] border-white ${bgColor[colorIndex]}`}
              >
                  {avatarName}
              </div>
          ) : (!imageUrl || imageUrl === '') && !name ? (
              <PiUserCircle size={width} />
          ) : null}

          {
            isOnline && (
              <div className="bg-green-600 p-[5px] absolute bottom-2 -right-1 z-10 rounded-full"></div>
            )
          }
        
      </div>
    )
}

export default Avatar