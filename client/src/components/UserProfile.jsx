import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useRef, useEffect } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import {app} from '../firebase.js'
import { useDispatch } from 'react-redux';
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserFailure, signOutUserStart, signOutUserSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { extractErrorMessage } from '../../../api/utils/error.js'

export default function UserProfile() {

    const fileRef = useRef(null);
    const {currentUser, loading, error} = useSelector((state) => state.user)
    const [file, setFile] = useState(undefined);
    const [filePerc, setFilePerc] = useState(0);
    const [fileUploadError, setFileUploadError] =useState(null);
    const [formData, setFormData] = useState({});
    const [updateSuccess, setupdateUserSuccess] = useState(null);
    const [disableUpdate, setDisableUpdate] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    console.log(filePerc);
    console.log(fileUploadError);
    console.log(formData);
    console.log(disableUpdate);

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
    };
 
    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        dispatch(updateUserStart());
    
        try {
          const res = await fetch(`http://localhost:3000/api/user/update/${currentUser._id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(formData),
          });
    
          // Check if the response is ok
          if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`HTTP error! status: ${res.status} - ${errorText}`);
          }
    
           // Try to parse the JSON
          const data = await res.json();
    
          if(data.success === false){
            dispatch(updateUserFailure(data.message));
            return;
          }
    
          dispatch(updateUserSuccess(data));
          setupdateUserSuccess(true);
    
          //If everything is alright navigate to 
          navigate('/profile');
          setDisableUpdate(true);
    
        } catch (error) {
          dispatch(updateUserFailure(error.message))
        }
    };
    
    const setUpdatable = () => {
        setDisableUpdate(false);
    };

    const handleDeleteUser = async () => {

        dispatch(deleteUserStart());

        try {

            const res = await fetch(`http://localhost:3000/api/user/delete/${currentUser._id}`, {
                method: 'DELETE',
                credentials: 'include',
              });
        
              // Check if the response is ok
              if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`HTTP error! status: ${res.status} - ${errorText}`);
              }
        
               // Try to parse the JSON
              const data = await res.json();
        
              if(data.success === false){
                dispatch(deleteUserFailure(data.message));
                return;
              }
        
              dispatch(deleteUserSuccess(data));
        
              //If everything is alright navigate to the Sign(in page
              navigate('/signin');

        } catch (error) {
            dispatch(deleteUserFailure(error.message));
        }
    };

    const handleSignOutUser = async () => {

        dispatch(signOutUserStart());

        try {

            const res = await fetch('http://localhost:3000/api/auth/signout');
        
              // Check if the response is ok
              if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`HTTP error! status: ${res.status} - ${errorText}`);
              }
        
               // Try to parse the JSON
              const data = await res.json();
        
              if(data.success === false){
                dispatch(signOutUserFailure(data.message));
                return;
              }
        
              dispatch(signOutUserSuccess(data));
        
              //If everything is alright navigate to the Sign(in page
             // navigate('/signin');

        } catch (error) {
            dispatch(signOutUserFailure(error.message));
        }
    };

    return (
    <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl font-bold text-center my-7'> User Profile</h1>
        {error && <p className="text-red-600 text-center mb-3">{extractErrorMessage(error)}</p>}
        {updateSuccess && <p className="text-green-600 text-center mb-3">Update details Successfully!</p>}

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
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
                onChange={handleChange}
                defaultValue={currentUser.username}
                disabled={disableUpdate}
                className='border p-3 rounded-lg'/>
            
            <input 
                type="text" 
                placeholder='email'
                onChange={handleChange}
                defaultValue={currentUser.email}
                disabled={disableUpdate}
                id='email'
                className='border p-3 rounded-lg'/>
            
            <input 
                type="password" 
                placeholder='password'
                onChange={handleChange}
                id='password'
                disabled={disableUpdate}
                className='border p-3 rounded-lg'/>
                
            <button 
                disabled={loading}
                type="submit"
                className={`bg-green-500 text-white rounded-lg p-3 hover:opacity-75 disabled:opacity-60 ${disableUpdate ? 'hidden' : ''} `}
            >
                {loading ? 'Loading...' : 'Update'}
            </button>
        </form>

        <button 
                disabled={loading}
                type="submit"
                onClick={setUpdatable}
                className={`w-full mt-5 bg-slate-700 text-white rounded-lg p-3 hover:opacity-75 disabled:opacity-60 ${disableUpdate ? '' : 'hidden'} `}
            >
                Modify
        </button>

        <div className='flex justify-between mt-5'>
            <span 
                onClick={handleDeleteUser}
                className='text-red-600 cursor-pointer font-semibold'>Delete Account</span>
            <span 
                onClick={handleSignOutUser}
                className='text-blue-950 cursor-pointer font-semibold'>Sign Out</span>
        </div>
    </div>
  )
}
