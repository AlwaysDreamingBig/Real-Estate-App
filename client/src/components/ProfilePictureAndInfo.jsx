import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faSave } from '@fortawesome/free-solid-svg-icons'; // Import FontAwesome icons
import '@fortawesome/fontawesome-free/css/all.min.css';
import { faHome, faHandshake, faKey } from '@fortawesome/free-solid-svg-icons';


const ProfilePictureAndInfo = () => {
  
  const { currentUser } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const initialBio = currentUser.bio || '';
  const [bio, setBio] = useState(initialBio);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Here you would typically also update the bio in the backend
  };

  const bioLines = bio.split("\n");

  return (
    <div className="flex flex-row space-x-4 bg-transparent rounded-lg">
      {/* First section */}
      <div className="flex flex-col items-center justify-center bg-white p-4 rounded-lg md:w-2/5">
        <div className='mb-4'>
          <img
            src={currentUser.avatar}
            alt={`${currentUser.username}'s profile`}
            width={100}
            height={100}
            className="w-24 h-24 rounded-full object-cover mr-4"
          />
        </div>

        <h2 className="text-2xl font-semibold self-center">{currentUser.username}</h2>

        <div className="flex space-x-1 mt-2">
          <i className="fas fa-star text-yellow-500"></i>
          <i className="fas fa-star text-yellow-500"></i>
          <i className="fas fa-star text-yellow-500"></i>
          <i className="fas fa-star text-yellow-500"></i>
          <i className="fas fa-star text-yellow-500"></i>
        </div>

        <div className="mt-4 p-4 border rounded-md w-full max-w-md">
          <div className="grid grid-cols-2 gap-4">
            <div className="font-semibold">Age:</div><div>{currentUser.age}</div>
            <div className="font-semibold">City:</div><div>{currentUser.city}</div>
            <div className="font-semibold">State:</div><div>{currentUser.state}</div>
            <div className="font-semibold">Country:</div><div>{currentUser.country}</div>
            <div className="font-semibold">Post Code:</div><div>{currentUser.postCode}</div>
            <div className="font-semibold">My Phone:</div><div>{currentUser.phoneNumber}</div>
            <div className="font-semibold">My Email:</div><div>{currentUser.email}</div>
          </div>
        </div>

        <div className="flex space-x-4 mt-4">
          <a href={currentUser.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href={currentUser.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center text-white">
            <i className="fab fa-twitter"></i>
          </a>
          <a href={currentUser.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center text-white">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>

      {/* Second section Div */}
      <div className="flex-1 flex flex-col bg-white p-4 rounded-lg">
        {/* Line 1: About Me and Edit Icon */}
        <div className="flex justify-between items-center mb-7">
          <h3 className="text-xl font-semibold">About Me</h3>
          {isEditing ? (
            <FontAwesomeIcon
              icon={faSave}
              className="text-gray-500 cursor-pointer"
              onClick={handleSaveClick}
            />
          ) : (
            <FontAwesomeIcon
              icon={faPencilAlt}
              className="text-gray-500 cursor-pointer"
              onClick={handleEditClick}
            />
          )}
        </div>

        {/* Line 2: Textarea for Bio */}
        {isEditing ? (
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-2 border rounded-lg resize-none min-h-24 mb-7"
            style={{ minHeight: '100px' }}  // Adjust min height as needed
            wrap="soft"
          />
        ) : (
          <div className="px-4 pb-4">
            {bioLines.map((line, index) => (
              <p key={index} className="text-gray-700 break-words mb-7">{line}</p>
            ))}
          </div>
        )}

        {/* Line 3: Agency Details */}
        <div className="grid grid-cols-2 gap-5 mb-16">
          <div className="font-semibold">Agency:</div><div>{currentUser.agency}</div>
          <div className="font-semibold">Agency Licence:</div><div>{currentUser.agencyLicence}</div>
          <div className="font-semibold">Tax Number:</div><div>{currentUser.taxNumber}</div>
          <div className="font-semibold">Service Area:</div><div>{currentUser.serviceArea}</div>
        </div>

        {/* Line 4: Total Listings, Properties Sold, Properties Rent */}
        <div className="grid grid-cols-3 gap-4 mb-7">
          <div className="flex items-center">
            <div>
              <div className="font-semibold flex items-center">
                <FontAwesomeIcon icon={faHome} className="text-gray-600 mr-2" />
                Total Listings:
              </div>
              <div>{currentUser.totalListings}</div>
            </div>
          </div>

          <div className="flex items-center">
            <div>
              <div className="font-semibold flex items-center">
                <FontAwesomeIcon icon={faHandshake} className="text-gray-600 mr-2" />
                Properties Sold:
              </div>
              <div>{currentUser.propertiesSold}</div>
            </div>
          </div>

          <div className="flex items-center">
            <div>
              <div className="font-semibold flex items-center">
                <FontAwesomeIcon icon={faKey} className="text-gray-600 mr-2" />
                Properties Rent:
              </div>
              <div>{currentUser.propertiesRent}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default ProfilePictureAndInfo;
