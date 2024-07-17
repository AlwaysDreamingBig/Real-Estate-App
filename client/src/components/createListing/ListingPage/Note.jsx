import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCheckCircle, faComment, faMapMarkerAlt, faDollarSign, faBed, faBroom } from '@fortawesome/free-solid-svg-icons';

const Note = ({ score }) => {
  // Sample data (replace with actual data as per your application logic)
  const ratings = [
    { category: 'Cleanliness', score: 4.9, percentage: 88, icon: faBroom },
    { category: 'Accuracy', score: 4.9, percentage: 89, icon: faMapMarkerAlt },
    { category: 'Check-in', score: 4.9, percentage: 85, icon: faCheckCircle },
    { category: 'Communication', score: 4.9, percentage: 91, icon: faComment },
    { category: 'Location', score: 4.7, percentage: 74, icon: faMapMarkerAlt },
    { category: 'Value', score: 4.9, percentage: 93, icon: faDollarSign },
    { category: 'Comfort', score: 4.5, percentage: 80, icon: faBed },
  ];

  const generalRatings = [
    { score: 5, percentage: 93 },
    { score: 4, percentage: 20 },
    { score: 3, percentage: 4 },
    { score: 2, percentage: 0 },
    { score: 1, percentage: 0 },
  ];

  return (
    <div className="bg-gray-200 p-4 rounded-lg shadow-md text-center">
      <div className="text-xl font-bold mb-6">
        Rated {score.toFixed(2)} out of 5 based on 111 reviews.
      </div>

      <div className="mb-6">
        <div className="text-6xl font-bold mb-2">{score.toFixed(2)}</div>
        <div className="text-sm">Travelers' Favorite</div>
        <div className="text-sm mt-2">
          One of the top-rated accommodations on Airbnb based on reviews, comments, and reliability.
        </div>
        <div className="mt-4">7 out of 7 visible elements</div>
      </div>

      <div className="mb-6">
        <div className="text-lg font-bold">Overall Rating</div>
        <div className="mt-4">
          {generalRatings.map((item, index) => (
            <div key={index} className="mb-2 flex items-center justify-center">
              <div className="text-xs text-gray-600 mr-2">{item.score}</div>
              <div className="w-64 bg-gray-300 rounded-full">
                <div className={`h-2 rounded-full ${item.score < 5 ? 'bg-yellow-400' : 'bg-green-400'}`} style={{ width: `${item.percentage}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Individual Ratings */}
      <div className="mb-6 flex justify-center flex-wrap">
        {ratings.map((item, index) => (
          <div key={index} className="mr-6 mb-4">
            <div className="text-lg font-bold mb-2 flex items-center">
              <FontAwesomeIcon icon={item.icon} className="text-gray-500 mr-2" />
              <span>{item.category}</span>
            </div>
            <div className="flex items-center">
              {Array.from({ length: 5 }, (_, i) => (
                <FontAwesomeIcon
                  key={i}
                  icon={faStar}
                  className={`text-yellow-400 mr-1 ${item.score < i + 1 ? 'opacity-50' : ''}`}
                />
              ))}
              <div className="text-xs text-gray-600 ml-2">{item.score}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Note;
