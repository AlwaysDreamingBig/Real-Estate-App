import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faSave } from '@fortawesome/free-solid-svg-icons'; // Import FontAwesome icons

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
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
      <div className="flex items-center mb-4">
        <img
          src={currentUser.avatar}
          alt={`${currentUser.username}'s profile`}
          className="w-24 h-24 rounded-full object-cover mr-4"
        />

        <div className="text-left">
          <h2 className="text-2xl font-semibold">{currentUser.username}</h2>
          <p className="text-gray-600">{currentUser.email}</p>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg mb-6">
        <div className="flex justify-between items-center mb-2 px-4">
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
        {isEditing ? (
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-2 border rounded-lg resize-none min-h-24"
            wrap="soft"
          />
        ) : (
          <div className="px-4 pb-4">
            {bioLines.map((line, index) => (
              <p key={index} className="text-gray-700 break-words">{line}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePictureAndInfo;
