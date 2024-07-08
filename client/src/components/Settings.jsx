import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBell, 
  faLock, 
  faLanguage, 
  faMoneyBillWave, 
  faQuestionCircle, 
  faTrashAlt, 
  faSignOutAlt, 
  faUser, 
  faShareAlt, 
  faSave 
} from '@fortawesome/free-solid-svg-icons';
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserFailure, signOutUserStart, signOutUserSuccess } from '../redux/user/userSlice.js';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



const Settings = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  // State for notification preferences
  const [emailNotifications, setEmailNotifications] = useState(currentUser.settings.emailNotifications);

  const [messageNotifications, setMessageNotifications] = useState(currentUser.settings.messageNotifications);

  // State for public profile
  const [publicProfile, setPublicProfile] = useState(currentUser.settings.publicProfile);

  // State for data sharing
  const [dataSharing, setDataSharing] = useState(currentUser.settings.dataSharing);

  // State for language preference
  const [language, setLanguage] = useState(currentUser.settings.language);

  // State for currency preference
  const [currency, setCurrency] = useState(currentUser.settings.currency);



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
          navigate('/signin');
  
    } catch (error) {
        dispatch(signOutUserFailure(error.message));
    }
  };
  


  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    switch (name) {
      case 'emailNotifications':
        setEmailNotifications(checked);
        break;
      case 'messageNotifications':
        setMessageNotifications(checked);
        break;
      case 'publicProfile':
        setPublicProfile(checked);
        break;
      case 'dataSharing':
        setDataSharing(checked);
        break;
      case 'language':
        setLanguage(value);
        break;
      case 'currency':
        setCurrency(value);
        break;
      default:
        break;
    }
  };


  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg max-h-screen overflow-y-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Settings</h1>

      {/* Notification Preferences */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3 flex items-center">
          <FontAwesomeIcon icon={faBell} className="text-gray-500 mr-3" />
          Notification Preferences
        </h2>
        <div className="flex items-center mb-4">
          <div>
            <label className="block mb-1">Email Notifications</label>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="emailNotifications"
                name="emailNotifications"
                checked={emailNotifications}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="emailNotifications">Receive email notifications</label>
            </div>
          </div>
          <div className="ml-8">
            <label className="block mb-1">Message Notifications</label>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="messageNotifications"
                name="messageNotifications"
                checked={messageNotifications}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="messageNotifications">Receive SMS notifications</label>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3 flex items-center">
          <FontAwesomeIcon icon={faLock} className="text-gray-500 mr-3" />
          Privacy Settings
        </h2>
        <div className='flex justify-between'>
          <div className="flex items-center">
            <div>
              <button className="text-red-600 hover:underline focus:outline-none" onClick={handleDeleteUser}>
                <FontAwesomeIcon icon={faTrashAlt} className="text-gray-500 mr-3 text-sm" />
                Delete account
              </button>
            </div>
          </div>
          <div className="flex items-center">
            <div>
              <button className="text-red-600 hover:underline focus:outline-none" onClick={handleSignOutUser}>
                <FontAwesomeIcon icon={faSignOutAlt} className="text-gray-500 mr-3 text-sm" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Public Profile */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3 flex items-center">
          <FontAwesomeIcon icon={faUser} className="text-gray-500 mr-3" />
          Public Profile
        </h2>
        <div className="flex items-center mb-4">
          <div>
            <label className="block mb-1">Visible Information</label>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="publicProfile"
                name="publicProfile"
                checked={publicProfile}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="publicProfile">Show listings viewed and favorites on public profile</label>
            </div>
          </div>
        </div>
      </div>

      {/* Data Sharing */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3 flex items-center">
          <FontAwesomeIcon icon={faShareAlt} className="text-gray-500 mr-3" />
          Data Sharing
        </h2>
        <div className="flex items-center mb-4">
          <div>
            <label className="block mb-1">Share Data</label>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="dataSharing"
                name="dataSharing"
                checked={dataSharing}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="dataSharing">Share my data with third parties or affiliates</label>
            </div>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3 flex items-center">
          <FontAwesomeIcon icon={faLanguage} className="text-gray-500 mr-3" />
          Preferences
        </h2>
        <div className="flex items-center mb-4">
          <div>
            <label className="block mb-1">Language</label>
            <select
              className="border rounded-lg p-2 outline-none"
              id="language"
              name="language"
              value={language}
              onChange={handleChange}
            >
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="es">Spanish</option>
            </select>
          </div>
        </div>
        <div className="flex items-center mb-4">
          <div>
            <label className="block mb-1">
                <FontAwesomeIcon icon={faMoneyBillWave} className="text-gray-500 mr-3" />
                Currency
            </label>
            <select
              className="border rounded-lg p-2 outline-none"
              id="currency"
              name="currency"
              value={currency}
              onChange={handleChange}
            >
              <option value="usd">USD - US Dollar</option>
              <option value="eur">EUR - Euro</option>
              <option value="gbp">GBP - British Pound</option>
            </select>
          </div>
        </div>
      </div>

      {/* Help and Support */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3 flex items-center">
          <FontAwesomeIcon icon={faQuestionCircle} className="text-gray-500 mr-3" />
          Help and Support
        </h2>
        <div className="flex items-center mb-4">
          <div>
            <label className="block mb-1">FAQs</label>
            <button className="text-blue-600 hover:underline focus:outline-none">Visit FAQs</button>
          </div>
        </div>
      </div>

      {/* Legal and Terms */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3 flex items-center">
          <FontAwesomeIcon icon={faBell} className="text-gray-500 mr-3" />
          Legal and Terms
        </h2>
        <div className="flex items-center">
          <div>
            <label className="block mb-1">Terms of Service</label>
            <button className="text-blue-600 hover:underline focus:outline-none">View terms of service</button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="text-center">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none">
          <FontAwesomeIcon icon={faSave} className="mr-2" />
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;
