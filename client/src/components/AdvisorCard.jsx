import React, { useState } from 'react';

const AdvisorCard = ({ advertiserName, profileImage, isCertified }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className="flex">
        <div className="flex flex-col flex-1 bg-white p-4">
            <div className="bg-white p-4 rounded shadow-xl flex flex-col">
                <h2 className="font-bold text-lg">User Profile of Sofía</h2>
                
                <div className="flex justify-center items-center mt-4">
                    <div className="w-2/3 flex flex-col items-center">
                        <img
                        src={profileImage}
                        alt="profile"
                        className="w-32 h-32 rounded-full"
                        />
                        <p className="mt-2 text-xl font-bold">Sofía</p>
                        <p className="mt-1 text-sm text-gray-600 italic">Superhost</p>
                        <div className="flex items-center mt-2">
                        {isCertified ? (
                            <span className="text-green-500">&#x2714; Certified</span>
                        ) : (
                            <span className="text-red-500">&#x2718; Not Certified</span>
                        )}
                        </div>
                    </div>

                    <div className="w-1/3 flex flex-col items-center">
                        <p className="text-lg font-bold">120</p>
                        <p className="text-sm">Reviews</p>
                        <hr className="w-full my-2 border-gray-300" />
                        <p className="text-lg font-bold">4.87</p>
                        <p className="text-sm">Overall Rating</p>
                        <hr className="w-full my-2 border-gray-300" />
                        <p className="text-lg font-bold">3</p>
                        <p className="text-sm">Years of Experience as a Host</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 bg-white p-4 mt-4 rounded">
                <p className="font-bold text-lg">Description</p>
                <p className="mt-4">
                {showFullDescription
                    ? `Retailer, detail is everything. Organized, responsible, friendly. Every client is the most important, I care a lot that they feel comfortable, taken care of, I like to pamper my clients and solve any problem they have. That you feel at home, that you are not alone, that you can count on me for anything.`
                    : `Retailer, detail is everything. Organized, responsible, friendly. Every client is the most important...`}
                </p>
                <button
                className="mt-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                onClick={toggleDescription}
                >
                {showFullDescription ? 'Read Less' : 'Read More'}
                </button>
            </div>
        </div>

      <div className="flex-1 bg-white p-4 rounded mt-4">
        <p className="font-bold text-lg">Sofía is a Superhost</p>
        <p className="mt-2 text-sm text-gray-600">
          Superhosts are experienced hosts who receive very good ratings and are committed to providing great stays for guests.
        </p>
        <p className="font-bold text-lg mt-4">Host Information</p>
        <p className="mt-2 text-sm text-gray-600">
          Response Rate: 100%
        </p>
        <p className="mt-2 text-sm text-gray-600">
          Responds within an hour
        </p>
        <button className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
          Send a Message to the Host
        </button>
        <p className="mt-4 font-bold">
          Individual
        </p>
        <p className="mt-2 text-sm">
          Registration Number: VFT/SE/08425
        </p>
        <hr className="w-full my-2 border-gray-300" />
        <p className="mt-4 text-red-300 text-sm italic">
          To protect your payment, never transfer money or communicate outside of the Airbnb website or app.
        </p>
      </div>
    </div>
  );
};

export default AdvisorCard;
