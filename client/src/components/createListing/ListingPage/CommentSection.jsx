import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import comments from '../../../assets/constants';

const CommentSection = () => {
  const [showAll, setShowAll] = useState(false);

  const firstSixComments = comments.slice(0, 6);

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Reviews</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {firstSixComments.map((comment) => (
          <div key={comment.id} className="bg-white p-4 rounded-lg shadow flex items-start">
            <img
              src={comment.imageUrl}
              alt={comment.name}
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <div className="flex items-center mb-2">
                <h3 className="text-lg font-bold mr-2">{comment.name}</h3>
                <span className="text-sm text-gray-600">{comment.anciennete}</span>
              </div>
              <div className="flex items-center mb-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <FontAwesomeIcon
                    key={i}
                    icon={faStar}
                    className={`mr-1 ${comment.stars > i ? 'text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-2">{comment.text}</p>
              <div className="text-sm text-gray-600">
                {comment.city}, {comment.country}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <button
          onClick={() => setShowAll(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Show All
        </button>
      </div>
      {showAll && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full overflow-y-auto max-h-full relative z-60">
            <div className="text-right">
              <button
                onClick={() => setShowAll(false)}
                className="text-red-500 hover:text-red-700 font-bold"
              >
                Close
              </button>
            </div>
            <h2 className="text-2xl font-bold mb-6 text-center">All Reviews</h2>
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-gray-100 p-4 rounded-lg shadow flex items-start">
                  <img
                    src={comment.imageUrl}
                    alt={comment.name}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-bold mr-2">{comment.name}</h3>
                      <span className="text-sm text-gray-600">{comment.anciennete}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      {Array.from({ length: 5 }, (_, i) => (
                        <FontAwesomeIcon
                          key={i}
                          icon={faStar}
                          className={`mr-1 ${comment.stars > i ? 'text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-2">{comment.text}</p>
                    <div className="text-sm text-gray-600">
                      {comment.city}, {comment.country}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
