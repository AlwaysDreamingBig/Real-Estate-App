import React, { useState } from 'react';
import UserProfile from '../components/UserProfile';
import { Link } from 'react-router-dom';
import ListingsContainer from '../components/ListingsContainer';
import { useSelector } from 'react-redux';
import ProfilePictureAndInfo from '../components/ProfilePictureAndInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faEdit, faPlus, faList, faEnvelope, faL } from '@fortawesome/free-solid-svg-icons';
import Content4 from '../components/MessagesContainer';

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [showListings, setShowListings] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showUserMessages, setShowUserMessages] = useState(true);

  const handleShowListings = () => {
    setShowListings(true);
    setShowUserProfile(false);
    setShowUserMessages(false);
  };

  const handleShowUserProfile = () => {
    setShowUserProfile(true);
    setShowListings(false);
    setShowUserMessages(false);
  };

  const handleShowUserMessages = () => {
    setShowUserProfile(false);
    setShowListings(false);
    setShowUserMessages(true);
  };

  return (
  <div className="flex flex-row max-w-full mx-auto bg-gray-100 p-6 space-x-4">
    {/* First Level 1 Div (larger) */}
    <div className="flex flex-col w-2/3 space-y-4">
      {/* First Level 2 Div */}
      <ProfilePictureAndInfo />
      
      {/* Second Level 2 Div */}
      <div className="flex-1 flex items-center justify-center bg-yellow-200 p-4 rounded-lg">
        <Link
          to={'/create-listing'}
          className='flex items-center bg-blue-300 text-white px-6 py-3 rounded-lg uppercase text-center hover:opacity-60'
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Create Listing
        </Link>

        <button
          className='ml-4 bg-slate-700 rounded-lg px-5 py-3 text-white hover:opacity-70'
          onClick={handleShowListings}
        >
          <FontAwesomeIcon icon={faList} className="mr-2" />
          Show My Listings
        </button>

        <button
          className='ml-4 bg-gray-500 rounded-lg px-5 py-3 text-white hover:opacity-70'
        >
          <FontAwesomeIcon icon={faCog} className="mr-2" />
          Settings
        </button>

        <button
          className='ml-4 bg-purple-500 rounded-lg px-5 py-3 text-white hover:opacity-70'
          onClick={handleShowUserProfile}
        >
          <FontAwesomeIcon icon={faEdit} className="mr-2" />
          Edit Profile
        </button>

        <button
          className='ml-4 bg-red-500 rounded-lg px-5 py-3 text-white hover:opacity-70'
          onClick={handleShowUserMessages}
        >
          <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
          Message Box
        </button>
      </div>

    </div>
    
    {/* Second Level 1 Div */}
    <div className="flex-1 flex items-center justify-center bg-purple-200 p-4 rounded-lg">
      <div className="items-center space-y-4 w-full">
        {showListings && (
          <section className='mt-4 flex-1'>
            <ListingsContainer currentUser={currentUser} />
          </section>
        )}

        {showUserProfile && (
          <section className='mt-4 flex-1'>
            <UserProfile />
          </section>
        )}

        {showUserMessages && (
          <Content4 className=''/>
        )}

      </div>
    </div>
  </div>
  );
}
