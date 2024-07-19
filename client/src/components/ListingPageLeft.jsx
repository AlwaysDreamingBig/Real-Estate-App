import React, { useState } from 'react';
import ImageSlider from './ImageSlider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTag, faDollarSign, faMapMarkerAlt, faMap, faAngleDown, 
  faAngleUp, faBed
} from '@fortawesome/free-solid-svg-icons';
import { faUser, faVenusMars, faUserGraduate, faMusic, faDog, faSmoking, faCheck, faTimes, faIdCardAlt, faFileSignature, faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';
import Amenities from './createListing/ListingPage/Amenities';
import Note from './createListing/ListingPage/Note';
import MapSection from './createListing/MapSection';


const LeftColumn = ({ listing, note }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const address = '12 Rue de Rome, Strasbourg 67000';

  const typeColors = {
    rent: 'bg-green-500',
    sell: 'bg-red-500',
    collocation: 'bg-blue-500',
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };




  return (
    <div className="w-full lg:w-2/3 bg-white p-4 space-y-4">
      {/* Section 1: Image Slider */}
      <div className="bg-white p-2 shadow-md">
        <ImageSlider slides={listing.imageUrls} autoSlide={false} showThumbnails={true} />
      </div>

      {/* Section 2: Listing Name and Regular Price */}
      <div className="bg-white p-2 flex items-center justify-between shadow-md">
        <h1 className="font-bold text-3xl font-serif">
          {listing.name}
        </h1>
        <div className="flex items-center text-xl">
          <FontAwesomeIcon icon={faDollarSign} className="mr-2" />
          <span className="font-bold">
            {listing.regularPrice}
          </span>
        </div>
      </div>

      {/* Section 3: Address, Type, and Discount Price */}
      <div className="bg-white p-2 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-lg mr-2" />
            <h2 className="text-gray-300 text-normal">
              {listing.address}
            </h2>
          </div>
          <div className="flex items-center text-blue-400">
            <FontAwesomeIcon icon={faMap} className="mr-1" />
            <a href="#map" className="ml-2">See On Map</a>
          </div>
        </div>
        <div className="flex items-center mt-2">
          <span className={`px-6 py-1 rounded text-white ${typeColors[listing.type]} text-sm font-semibold mr-2 flex items-center justify-center`}>
            {listing.type === 'rent' ? (
              <>
                <FontAwesomeIcon icon={faTag} className="mr-1" />
                For Rent
              </>
            ) : listing.type === 'sell' ? (
              <>
                <FontAwesomeIcon icon={faTag} className="mr-1" />
                For Sell
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faTag} className="mr-1" />
                Collocation Property
              </>
            )}
          </span>
          {listing.discountPrice && (
            <span className="px-6 py-1 rounded bg-yellow-500 text-white text-sm font-semibold flex items-center justify-center">
              <FontAwesomeIcon icon={faDollarSign} className="mr-1" />
              {`Discount Price: ${listing.discountPrice}`}
            </span>
          )}
        </div>
      </div>

      {/* Section 4: Listing Description */}
      <div className="bg-white p-2 shadow-md">
        <h2 className="text-gray-800 text-center text-2xl">Listing Description</h2>
        <p className={`text-gray-800 text-lg text-justify ${showFullDescription ? '' : 'line-clamp-3'}`}>
          {listing.description}
        </p>
        {listing.description.length > 150 && (
          <button
            className="text-blue-500 text-sm mt-2 hover:underline focus:outline-none"
            onClick={toggleDescription}
          >
            {showFullDescription ? (
              <>
                Show Less <FontAwesomeIcon icon={faAngleUp} className="ml-1" />
              </>
            ) : (
              <>
                Show More <FontAwesomeIcon icon={faAngleDown} className="ml-1" />
              </>
            )}
          </button>
        )}
      </div>

      {/* Section 5: Amenities */}
      <Amenities listing={listing}/>

      {/* Section 6: Rules and Preferences */}
      <div className="bg-blue-800 p-4">
        <h2 className="text-white text-center text-2xl">
          <FontAwesomeIcon icon={faTimes} className="mr-2" />
          Rules and Preferences
        </h2>
        <div className="text-white mt-4 space-y-2">
          <p className="flex items-center"><FontAwesomeIcon icon={faUser} className="mr-2" /> Age: No preference</p>
          <p className="flex items-center"><FontAwesomeIcon icon={faVenusMars} className="mr-2" /> Gender: No preference</p>
          <p className="flex items-center"><FontAwesomeIcon icon={faUserGraduate} className="mr-2" /> Tenant type: Students, working professionals</p>
          <p className="flex items-center"><FontAwesomeIcon icon={faBed} className="mr-2" /> Suitable for couples: Yes</p>
          <p className="flex items-center"><FontAwesomeIcon icon={faMusic} className="mr-2" /> Playing Musical Instruments allowed: Yes</p>
          <p className="flex items-center"><FontAwesomeIcon icon={faDog} className="mr-2" /> Pets allowed: Negotiable</p>
          <p className="flex items-center"><FontAwesomeIcon icon={faSmoking} className="mr-2" /> Smoking allowed: Negotiable</p>
        </div>
        <div className="border-t border-white mt-4">
          <h2 className="text-white text-center text-2xl mt-8">
            <FontAwesomeIcon icon={faCheck} className="mr-2" />
            Documents required to book
          </h2>
          <p className="text-white mt-4">
            The landlord will ask for them to accept your booking request.
          </p>
          <ul className="text-white mt-4 list-disc pl-4">
            <li><FontAwesomeIcon icon={faIdCardAlt} className="mr-2" /> Proof of identity: Government issued ID, passport, driver’s license.</li>
            <li><FontAwesomeIcon icon={faFileSignature} className="mr-2" /> Proof of enrollment or occupation: University enrollment certificate, internship or employment contract.</li>
            <li><FontAwesomeIcon icon={faFileInvoiceDollar} className="mr-2" /> Proof of income: Salary slip or bank statements from you or your sponsor.</li>
          </ul>
        </div>
      </div>
      
      <Note score={note}/>

      <div className="bg-white p-2 shadow-md" id='map'>
         {/* Map Section */}
        <MapSection address={listing.address}/>
      </div>

      <div className="bg-white p-2 shadow-md">
        <h2 className="text-gray-800 text-center text-2xl">Section 8</h2>
        <p className="text-gray-800 text-lg">
          This is the eighth section of the left column. You can put any content here.
        </p>
      </div>
    </div>
  );
};

export default LeftColumn;
