import React, { useState } from 'react';

const RightColumn = ({ profileImage, advertiserName, note = 0, numberOfComments = 0, onClickNumberOfComments, onClickAdvisor }) => {
  const [showPreview, setShowPreview] = useState(false);

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  const closePreview = () => {
    setShowPreview(false);
  };

  // Function to render star icons based on the note value
  const renderStars = (note) => {
    const maxStars = 5;
    const filledStars = Math.floor(note); // Number of filled stars
    const remainder = maxStars - filledStars; // Number of empty stars

    // Array to hold filled stars
    let stars = Array(filledStars).fill(1); // Filled stars

    // Add empty stars (grey stars)
    if (remainder > 0) {
      stars = stars.concat(Array(remainder).fill(0));
    }

    return (
      <div className="flex items-center">
        {stars.map((star, index) => (
          <svg key={index} xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${star === 1 ? 'text-yellow-400' : 'text-gray-400'}`} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 15.854l-4.063 2.11a1 1 0 01-1.451-1.054l.778-4.555-3.285-3.213a1 1 0 01.553-1.705l4.57-.665 2.043-4.139a1 1 0 011.794 0l2.043 4.14 4.57.664a1 1 0 01.553 1.705l-3.285 3.213.778 4.555a1 1 0 01-1.451 1.054L10 15.854z" clipRule="evenodd" />
          </svg>
        ))}
      </div>
    );
  };

  const handleClickNumberOfComments = () => {
    if (typeof onClickNumberOfComments === 'function') {
      onClickNumberOfComments();
    }
  };

  const handleClickAdvisor = () => {
    if (typeof onClickAdvisor === 'function') {
      onClickAdvisor();
    }
  };

  return (
    <div className="hidden lg:flex lg:w-[400px] shadow-sm flex-col bg-white p-4 space-y-4 relative h-[80vh] ml-4 rounded-lg border border-slate-400">
      {/* Profile and Advertiser Info */}
      <div className="flex items-center shadow p-2">
        <img src={profileImage} alt="Advertised by Profile" className="w-20 h-20 rounded-full mb-2 mr-10 ml-10 cursor-pointer" onClick={handleClickAdvisor}/>

        <div className='flex flex-col items-center'>
          <p className="text-slate-800 text-center text-lg font-serif">Advertised by</p>
          <p className="text-slate-800 text-center text-lg font-semibold font-serif cursor-pointer" onClick={handleClickAdvisor}>{advertiserName}</p>
        </div>
      </div>

      {/* Move-in and Move-out Dates & button & preview link */}
      <div className="flex-1 p-4 flex flex-col relative">
        <div className="">
          <label htmlFor="moveInDate" className="block text-white mb-2">Move-in Date:</label>
          <input type="date" id="moveInDate" name="moveInDate" className="w-full bg-gray-800 text-white p-2 rounded-md" />
        </div>

        <div className="mb-8">
          <label htmlFor="moveOutDate" className="block text-white mb-2">Move-out Date:</label>
          <input type="date" id="moveOutDate" name="moveOutDate" className="w-full bg-gray-800 text-white p-2 rounded-md" />
        </div>

        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mb-2 font-serif">
          Contact Advisor
        </button>

        <label
          className="text-slate-800 cursor-pointer flex items-center font-serif"
          onClick={togglePreview}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M1 5a1 1 0 011-1h2.586a1 1 0 01.707.293l12 12a1 1 0 01-.707 1.707H4a1 1 0 01-1-1V5z" clipRule="evenodd" />
          </svg>
          See Preview
        </label>

        {/* Right Preview */}
        {showPreview && (
          <div className="absolute right-0 top-0 bg-gray-800 text-white p-4 mt-8 mr-4 rounded-md shadow-lg">
            <button className="absolute top-0 right-0 p-2 text-white hover:text-gray-300" onClick={closePreview}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-lg font-bold mb-2">Preview Content</h2>
            <p>This is the content that appears in the preview.</p>
            {/* Add more content or components as needed */}
          </div>
        )}
      </div>

      <hr className="w-full my-2 border-gray-300" />

      {/* Note and Number of Comments */}
      <div className="flex-1 p-4 flex items-center justify-between">
        <div className="flex flex-col items-center cursor-pointer" onClick={() => setShowPreview(true)}>
          <p className="text-slate-800 text-lg mb-4 font-serif">Note: {note}</p>
          {renderStars(note)}
        </div>
        <p className="text-slate-800 cursor-pointer text-lg italic underline font-serif" onClick={handleClickNumberOfComments}>Number of Comments: {numberOfComments}</p>
      </div>
    </div>
  );
};

export default RightColumn;
