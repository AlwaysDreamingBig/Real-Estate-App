// Settings.js

import React from 'react';
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

const Settings = () => {

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
              <input type="checkbox" id="emailNotifications" className="mr-2" />
              <label htmlFor="emailNotifications">Receive email notifications</label>
            </div>
          </div>
          <div className="ml-8">
            <label className="block mb-1">Message Notifications</label>
            <div className="flex items-center">
              <input type="checkbox" id="messageNotifications" className="mr-2" />
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
              <button className="text-red-600 hover:underline focus:outline-none">
                <FontAwesomeIcon icon={faTrashAlt} className="text-gray-500 mr-3 text-sm" />
                Delete account
            </button>
            </div>
          </div>
          <div className="flex items-center">
            <div>
              <button className="text-red-600 hover:underline focus:outline-none" >
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
              <input type="checkbox" id="publicProfile" className="mr-2" />
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
              <input type="checkbox" id="dataSharing" className="mr-2" />
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
            <select className="border rounded-lg p-2 outline-none">
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
            <select className="border rounded-lg p-2 outline-none">
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
