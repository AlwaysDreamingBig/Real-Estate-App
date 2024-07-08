import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useRef, useEffect } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import {app} from '../firebase.js'
import { useDispatch } from 'react-redux';
import { updateUserStart, updateUserSuccess, updateUserFailure } from '../redux/user/userSlice.js';
import { useNavigate } from 'react-router-dom';
import { extractErrorMessage } from '../../../api/utils/error.js'
import '@fortawesome/fontawesome-free/css/all.min.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';


export default function UpdateProfile() {

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
    const [phone, setPhone] = useState(null);


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
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
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

    

    const handlePhoneChange = (value) => {
        setPhone(value);
        handleChange({ target: { id: 'phoneNumber', value } });
      };

return (
    <div className='px-10'>
        <div className='bg-slate-300 p-0.5 mb-4 mt-3 rounded-lg'>
            <h1 className='text-3xl font-bold text-center my-7'> Edit User Profile</h1>

            {error && <p className="text-red-600 text-center mb-3">{extractErrorMessage(error)}</p>}

            {updateSuccess && <p className="text-green-700 text-center mb-3">Update details Successfully!</p>}
        </div>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4 bg-white px-7 py-7 rounded-lg'>
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
                className='rounded-full h-52 w-52 object-center cursor-pointer self-center mt-2 mb-5'/>

            <p className='self-center text-sm'>
                {fileUploadError ?
                    <span className='text-red-700'> Error downloading the file!</span> 
                : filePerc > 0 && filePerc < 100 ?
                    <span className='text-slate-700'>
                        {`Uploading ${filePerc}%`}
                    </span>
                : filePerc === 100 ?
                    <span className='text-green-600'>
                        Successfully Uploaded!
                    </span>
                : ""}
            </p>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4'>
                <div className="flex flex-col">
                    <label htmlFor='username' className='mb-1'><i className="fas fa-user"></i> Username</label>
                    <input 
                        type="text" 
                        placeholder='username'
                        id='username'
                        onChange={handleChange}
                        defaultValue={currentUser.username}
                        disabled={disableUpdate}
                        className='border p-3 rounded-lg'/>
                </div>

                <div className="flex flex-col">
                    <label htmlFor='email' className='mb-1'><i className="fas fa-envelope"></i> Email</label>
                    <input 
                        type="text" 
                        placeholder='email'
                        onChange={handleChange}
                        defaultValue={currentUser.email}
                        disabled={disableUpdate}
                        id='email'
                        className='border p-3 rounded-lg'/>
                </div>

                <div className="flex flex-col">
                    <label htmlFor='password' className='mb-1'><i className="fas fa-lock"></i> Password</label>
                    <input 
                        type="password" 
                        placeholder='password'
                        onChange={handleChange}
                        id='password'
                        disabled={disableUpdate}
                        className='border p-3 rounded-lg'/>
                </div>

                <div className="flex flex-col">
                    <label htmlFor='bio' className='mb-1'><i className="fas fa-info-circle"></i> Bio</label>
                    <input 
                        type="text" 
                        placeholder='bio'
                        id='bio'
                        onChange={handleChange}
                        defaultValue={currentUser.bio}
                        disabled={disableUpdate}
                        className='border p-3 rounded-lg'/>
                </div>

                <div className="flex flex-col">
                    <label htmlFor='age' className='mb-1'><i className="fas fa-birthday-cake"></i> Age</label>
                    <input 
                        type="number" 
                        placeholder='age'
                        id='age'
                        onChange={handleChange}
                        defaultValue={currentUser.age}
                        disabled={disableUpdate}
                        className='border p-3 rounded-lg'/>
                </div>

                <div className="flex flex-col">
                    <label htmlFor='city' className='mb-1'><i className="fas fa-city"></i> City</label>
                    <input 
                        type="text" 
                        placeholder='city'
                        id='city'
                        onChange={handleChange}
                        defaultValue={currentUser.city}
                        disabled={disableUpdate}
                        className='border p-3 rounded-lg'/>
                </div>

                <div className="flex flex-col">
                    <label htmlFor='state' className='mb-1'><i className="fas fa-map-marker-alt"></i> State</label>
                    <input 
                        type="text" 
                        placeholder='state'
                        id='state'
                        onChange={handleChange}
                        defaultValue={currentUser.state}
                        disabled={disableUpdate}
                        className='border p-3 rounded-lg'/>
                </div>

                <div className="flex flex-col">
                    <label htmlFor='country' className='mb-1'><i className="fas fa-globe"></i> Country</label>
                    <input 
                        type="text" 
                        placeholder='country'
                        id='country'
                        onChange={handleChange}
                        defaultValue={currentUser.country}
                        disabled={disableUpdate}
                        className='border p-3 rounded-lg'/>
                </div>

                <div className="flex flex-col">
                    <label htmlFor='postCode' className='mb-1'><i className="fas fa-mail-bulk"></i> Post Code</label>
                    <input 
                        type="text" 
                        placeholder='postCode'
                        id='postCode'
                        onChange={handleChange}
                        defaultValue={currentUser.postCode}
                        disabled={disableUpdate}
                        className='border p-3 rounded-lg'/>
                </div>

                {!disableUpdate ?
                    <div className="flex flex-col">
                        <label htmlFor='phoneNumber' className='mb-1'><i className="fas fa-phone"></i> Phone Number</label>
                        <PhoneInput
                        country={'us'}
                        value={phone}
                        onChange={handlePhoneChange}
                        containerClass='w-full'
                        disabled={disableUpdate}
                        />
                    </div>
                    :
                    <div className="flex flex-col">
                        <label htmlFor='phoneNumber' className='mb-1'><i className="fas fa-phone"></i> Phone Number</label>
                        <input 
                            type="text" 
                            placeholder='phoneNumber'
                            id='phoneNumber'
                            onChange={handleChange}
                            defaultValue={currentUser.phoneNumber}
                            disabled={disableUpdate}
                            className='border p-3 rounded-lg'/>
                    </div>
                }

                <div className="flex flex-col">
                    <label htmlFor='agency' className='mb-1'><i className="fas fa-building"></i> Agency</label>
                    <input 
                        type="text" 
                        placeholder='agency'
                        id='agency'
                        onChange={handleChange}
                        defaultValue={currentUser.agency}
                        disabled={disableUpdate}
                        className='border p-3 rounded-lg'/>
                </div>

                <div className="flex flex-col">
                    <label htmlFor='agencyLicence' className='mb-1'><i className="fas fa-id-badge"></i> Agency Licence</label>
                    <input 
                        type="text" 
                        placeholder='agencyLicence'
                        id='agencyLicence'
                        onChange={handleChange}
                        defaultValue={currentUser.agencyLicence}
                        disabled={disableUpdate}
                        className='border p-3 rounded-lg'/>
                </div>

                <div className="flex flex-col">
                    <label htmlFor='taxNumber' className='mb-1'><i className="fas fa-file-invoice-dollar"></i> Tax Number</label>
                    <input 
                        type="text" 
                        placeholder='taxNumber'
                        id='taxNumber'
                        onChange={handleChange}
                        defaultValue={currentUser.taxNumber}
                        disabled={disableUpdate}
                        className='border p-3 rounded-lg'/>
                </div>

                <div className="flex flex-col">
                    <label htmlFor='serviceArea' className='mb-1'><i className="fas fa-map"></i> Service Area</label>
                    <input 
                        type="text" 
                        placeholder='serviceArea'
                        id='serviceArea'
                        onChange={handleChange}
                        defaultValue={currentUser.serviceArea}
                        disabled={disableUpdate}
                        className='border p-3 rounded-lg'/>
                </div>
            </div>

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
    </div>
  )
}
