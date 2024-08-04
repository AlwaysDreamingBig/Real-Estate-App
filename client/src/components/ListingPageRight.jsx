import React, { useState, useEffect } from 'react';
import fetchUserInfo from './utility/fetchers';
import Modal from './Modal';
import ContactAdvisor from './ContactBox';
import Preview from './Preview';

const RightColumn = ({ profileImage, advertiserName, note = 0, numberOfComments = 0, onClickNumberOfComments, onClickAdvisor, advisorID, listing }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [advisor, setAdvisor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [moveInDate, setMoveInDate] = useState('');
  const [moveOutDate, setMoveOutDate] = useState('');

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

  useEffect(() => {
    const getAdvisorInfo = async () => {
      try {
        const advisorData = await fetchUserInfo(advisorID);
        setAdvisor(advisorData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getAdvisorInfo();
  }, [advisorID]);

//Message box popup fn ----------------------------------------------
  const advisor2 = {
    name: 'Sofia',
  };

  const sender = 'John Doe';

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  //5----------------------------------------------

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!advisor) {
    return <div>No advisor found</div>;
  }

  return (
    <div className="hidden lg:flex lg:w-[400px] shadow-sm flex-col bg-white p-4 space-y-4 relative h-[80vh] ml-4 rounded-lg border border-slate-400">
      {/* Profile and Advertiser Info */}
      <div className="flex items-center shadow p-2">
        <img src={advisor.avatar} alt="Advertised by Profile" className="w-20 h-20 rounded-full mb-2 mr-10 ml-10 cursor-pointer" onClick={handleClickAdvisor}/>

        <div className='flex flex-col items-center'>
          <p className="text-slate-800 text-center text-lg font-serif">Advertised by</p>
          <p className="text-slate-800 text-center text-lg font-semibold font-serif cursor-pointer" onClick={handleClickAdvisor}>{advisor.username}</p>
        </div>
      </div>

      {/* Move-in and Move-out Dates & button & preview link */}
      <div className="flex-1 p-4 flex flex-col relative">
        <div className="">
          <label htmlFor="moveInDate" className="block text-white mb-2">Move-in Date:</label>
          <input
            type="date"
            id="moveInDate"
            name="moveInDate"
            className="w-full bg-gray-800 text-white p-2 rounded-md"
            value={moveInDate}
            onChange={(e) => setMoveInDate(e.target.value)}
          />
        </div>

        <div className="mb-8">
          <label htmlFor="moveOutDate" className="block text-white mb-2">Move-out Date:</label>
          <input
            type="date"
            id="moveOutDate"
            name="moveOutDate"
            className="w-full bg-gray-800 text-white p-2 rounded-md"
            value={moveOutDate}
            onChange={(e) => setMoveOutDate(e.target.value)}
          />
        </div>

        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mb-2 font-serif" onClick={openModal}>
          Contact Advisor
        </button>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ContactAdvisor advisor={advisor} sender={sender} onClose={closeModal} />
        </Modal>

        <label
          className="text-slate-800 cursor-pointer flex items-center font-serif"
          onClick={togglePreview}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M1 5a1 1 0 011-1h2.586a1 1 0 01.707.293l12 12a1 1 0 01-.707 1.707H4a1 1 0 01-1-1V5z" clipRule="evenodd" />
          </svg>
          See Preview
        </label>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ContactAdvisor advisor={advisor} sender={sender} onClose={closeModal} />
        </Modal>


        {/* Right Preview */}
        {showPreview && (
          <div className="fixed top-0 right-0 h-full w-2/5 bg-white shadow-lg p-4 overflow-y-auto">
            <button className="absolute top-0 right-0 p-2 text-red-600 hover:text-gray-300" onClick={closePreview}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <Preview 
              entryDate={moveInDate}
              endingDate={moveOutDate}
              monthlyPrice={listing.regularPrice}
              advisor={'Advisor'}
              listing={listing}
              electricity={listing.electricity}
              water={listing.water}
            />
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
