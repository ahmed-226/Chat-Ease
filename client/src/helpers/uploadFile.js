const CLOUDINARY_CLOUD_NAME = 'dbiyanrw3'
const CLOUDINARY_UPLOAD_PRESET='chat-ease'
const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`


const uploadFile=async (file)=>{
    const formData=new FormData()
    formData.append("file",file)
    formData.append("upload_preset",CLOUDINARY_UPLOAD_PRESET)

    console.log("cloudinary name",CLOUDINARY_CLOUD_NAME);

    const res = await fetch(url,{
        method : 'POST',
        body : formData
    })
    const responseData = await res.json()


    return responseData 

}



export default uploadFile