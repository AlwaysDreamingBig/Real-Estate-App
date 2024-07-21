import { useEffect, useState, useRef  } from 'react';
import { useParams } from 'react-router-dom';
import ImageSlider from '../components/ImageSlider';
import RightColumn from '../components/ListingPageRight';
import LeftColumn from '../components/ListingPageLeft';
import { useSelector } from 'react-redux';


export default function Listing() {

  const commentsRef = useRef(null);

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:3000/api/listing/getListing/${params.listingID}`, {
            method: 'GET',
            credentials: 'include',
          });

        const data = await res.json();

        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);


  const handleNumberOfCommentsClick = () => {
    commentsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main>
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && (
        <p className='text-center my-7 text-2xl'>Something went wrong!</p>
      )}
      {listing && !loading && !error && (
 <div className="my-4 mx-4 md:my-8 md:mx-12 lg:my-12 lg:mx-24 xl:my-16 xl:mx-32 flex flex-col h-screen">
 {/* Title */}
 <div className="bg-gray-800 text-white text-center p-4">
   <h1 className="text-2xl">Title Here</h1>
 </div>

 {/* Two-column layout */}
 <div className="flex flex-1">
    <LeftColumn 
      listing={listing} 
      note={4.87} 
      profileImage={currentUser.avatar} //change this to listing.useRef.avatar
      advertiserName={currentUser.username}/>
   
   <RightColumn 
     profileImage={currentUser.avatar} //change this to listing.useRef.avatar
     advertiserName={currentUser.username}
     note={4.87}
     numberOfComments={10}
     onClickNumberOfComments={handleNumberOfCommentsClick}
   />
 </div>

 {/* Footer */}
 <div className="bg-gray-800 text-white text-center p-4">
   <p>Footer Content Here</p>
 </div>

 <section id="comments" ref={commentsRef}>
        comment section
  </section>


</div>
      )}
    </main>
  );
}