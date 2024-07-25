import React, { useState, useEffect } from 'react';
import fetchUserInfo from './utility/fetchers';

const AdvisorCard = ({ advisorID }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [advisor, setAdvisor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!advisor) {
    return <div>No advisor found</div>;
  }

  // Define descriptions for each host type
  const hostDescriptions = {
    New: 'New hosts are just starting out and are eager to provide excellent stays for their guests. They are enthusiastic and ready to make a great impression!',
    Good: 'Good hosts have experience and are committed to providing a positive experience for their guests. They have received good ratings and are known for their reliability.',
    Superhost: 'Superhosts are experienced hosts who receive very good ratings and are committed to providing great stays for guests. They are highly rated and well-regarded in the community.',
  };

    // Determine the description based on the advisor type
  const hostDescription = hostDescriptions[advisor.status] || hostDescriptions['New'];


  return (
    <div className="flex border">
        <div className="flex flex-col flex-1 bg-white p-4">
            <div className="bg-white p-4 rounded shadow-xl flex flex-col">                
                <div className="flex justify-center items-center mt-4">
                    <div className="w-2/3 flex flex-col items-center">
                        <img
                        src={advisor.avatar}
                        alt="profile"
                        className="w-32 h-32 rounded-full"
                        />
                        <p className="mt-2 text-xl font-bold">{advisor.username}</p>
                        <p className="mt-1 text-sm text-gray-600 italic">{advisor.status ? `${advisor.status} Host` : 'New Host'}</p>
                        <div className="flex items-center mt-2">
                        {advisor.isCertified ? (
                            <span className="text-green-500">&#x2714; Certified</span>
                        ) : (
                            <span className="text-red-500">&#x2718; Not Certified</span>
                        )}
                        </div>
                    </div>

                    <div className="w-1/3 flex flex-col items-center">
                        <p className="text-lg font-bold">{advisor.reviewsNumber ? `${advisor.reviewsNumber}` : '0'}</p>
                        <p className="text-sm">Reviews</p>
                        <hr className="w-full my-2 border-gray-300" />
                        <p className="text-lg font-bold">{advisor.advisorNote ? `${advisor.advisorNote}` : '0'}</p>
                        <p className="text-sm">Overall Rating</p>
                        <hr className="w-full my-2 border-gray-300" />
                        <p className="text-lg font-bold">{advisor.advisorExp ? `${advisor.advisorExp}` : '<1'}</p>
                        <p className="text-sm">Years of Experience as a Host</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 bg-white p-4 mt-4 rounded">
                <p className="font-bold text-lg">{advisor.bio ? `${advisor.bio}` : 'No description available'}</p>
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
        <p className="font-bold text-lg font-serif">{advisor.username} is a {advisor.status ? `${advisor.status}` : 'New host'}</p>
        <p className="mt-2 text-sm text-gray-600">
          {hostDescription}
        </p>
        <p className="font-bold text-lg mt-4 font-serif">Host Information</p>
        <p className="mt-2 text-sm text-gray-600">
          Response Rate: 100%
        </p>
        <p className="mt-2 text-sm text-gray-600">
          Responds within an hour
        </p>
        <button className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
          Send a Message to the Host
        </button>
        <p className="mt-4 font-bold font-serif">
          Individual
        </p>
        <p className="mt-2 text-sm font-serif">
          Registration Number: {advisor.registrationNbr ? `${advisor.registrationNbr}` : 'VFT/SE/08425'}
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
