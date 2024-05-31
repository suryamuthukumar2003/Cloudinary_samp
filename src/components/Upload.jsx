import axios from 'axios';
import React, { useState } from 'react'
import { ThreeDots } from 'react-loader-spinner';

function Upload() {
    const [video,setVideo]=useState(null);
    const [img,setImg]=useState(null);
    const [loading,setLoading]=useState(false);

    const uploadFile= async (type)=>{
        const data =new FormData();
        data.append("file",type ==='image' ? img: video);

        // data.append("timestamp",timestamp);
        // data.append("signature",signature);
        // data.append("api_key",import.meta.env.VITE_APP_CLOUDINARY_API_KEY);
        data.append("upload_preset", type=='image' ? 'images_preset' : 'video_preset');

        try{
            let cloudnmae=import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME;
            let resourceType= type === 'image' ? 'image' :'video';
            let api= `https://api.cloudinary.com/v1_1/${cloudnmae}/${resourceType}/upload`;

            const res=await axios.post(api,data);
            const {secure_url}=res.data;
            console.log(secure_url);
            return secure_url;

        }catch(err){
            console.log(err)
        }
    }



    const handleSubmit=async (e)=>{
        e.preventDefault();
        try{
            setLoading(true);


            //          GEt signature for image upload 

            // const{timestamp:imgTimeStamp,signature: imgSignature}=await getSignatureForUpload('photos');

            //         get signature for video upload

            // const{timestamp:videoTimeStamp,signature: videoSignature}=await getSignatureForUpload('videos');

            //upload image file 

            const imgUrl= await uploadFile('image');

            // upload video file 

            const videoUrl=await uploadFile('video');


            // send backend api request

            await axios.post(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/api/videos`,{imgUrl,videoUrl});

            setImg(null);
            setVideo(null);
            console.log("file upload successfully");
            setLoading(false);

        }catch(err){
            console.log(err);
        }
    }
  return (
    <div>

        <form onSubmit={handleSubmit}>
            <div>
            <label htmlFor="video">Video:</label>
            <br />
            <input type='file' accept='video/*' id='video' onChange={(e)=>setVideo((prev)=> e.target.files[0])}/>
            </div>
            <div>
            <label htmlFor="img">Video:</label>
            <br />
            <input type='file' accept='image/*' id='img' onChange={(e)=>setImg((prev)=> e.target.files[0])}/>
            </div>
            <br />
            <button type='submit'>Upload</button>
        </form>
        {loading && <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
            />}
    </div>
  )
}

export default Upload;