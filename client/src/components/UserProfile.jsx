import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useRef, useEffect } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import {app} from '../firebase.js'

export default function UserProfile() {

    const fileRef = useRef(null);
    const {currentUser} = useSelector((state) => state.user)
    const [file, setFile] = useState(undefined);
    const [filePerc, setFilePerc] = useState(0);
    const [fileUploadError, setFileUploadError] =useState(null);
    const [formData, setFormData] = useState({});


    console.log(filePerc);
    console.log(fileUploadError);
    console.log(formData);

    useEffect(() => {
        if (file) {
            handleFileUpload(file);
        }
    }, [file]);

    const handleFileUpload = (file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setFilePerc(Math.round(progress));
            },
            (error) => {
                setFileUploadError(true);
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setFormData({...formData, avatar: downloadURL})
                })
            }
        ); 
    }
 
    return (
    <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl font-bold text-center my-7'> User Profile</h1>

        <form className='flex flex-col gap-4'>
            <input 
                onChange={(e) => setFile(e.target.files[0])}
                type="file" 
                ref={fileRef} 
                hidden 
                accept='image/*'/>

            <img 
                onClick={() => fileRef.current.click()}
                src={formData.avatar || currentUser.avatar} 
                alt="profile picture" 
                className='rounded-full h-28 w-28 object-center cursor-pointer self-center mt-2s'/>

            <p className='self-center text-sm'>
                {fileUploadError ?
                    <span className='text-red-700'> Error downloading the file!</span> 

                 :  filePerc > 0 && filePerc < 100 ?
                        <span className='text-slate-700'>
                            {`Uploading ${filePerc}%`}
                        </span>

                 :  filePerc === 100 ?
                        <span className='text-green-600'>
                            Successfully Uploaded!
                        </span>

                 : ""
                }
            </p>

            <input 
                type="text" 
                placeholder='username'
                id='username'
                className='border p-3 rounded-lg'/>
            
            <input 
                type="text" 
                placeholder='email'
                id='email'
                className='border p-3 rounded-lg'/>
            
            <input 
                type="text" 
                placeholder='password'
                id='password'
                className='border p-3 rounded-lg'/>
                
            <button className='bg-slate-700 text-white rounded-lg p-3 hover:opacity-75 disabled:opacity-60'>
                Update
            </button>
        </form>

        <div className='flex justify-between mt-5'>
            <span className='text-red-600 cursor-pointer font-semibold'>Delete Account</span>
            <span className='text-blue-950 cursor-pointer font-semibold'>Sign Out</span>
        </div>
    </div>
  )
}
