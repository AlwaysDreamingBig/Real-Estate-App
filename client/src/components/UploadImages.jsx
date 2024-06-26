import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faTimes } from '@fortawesome/free-solid-svg-icons';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase';
import { useSelector } from 'react-redux';

export default function UploadImages({ className }) {
  const [selectedImages, setSelectedImages] = useState([]); // State to hold selected images
  const [uploadedImages, setUploadedImages] = useState([]); // State to hold URLs of uploaded images
  const [uploadProgress, setUploadProgress] = useState({}); // State to track upload progress
  const [uploading, setUploading] = useState(false); // State to indicate if upload is in progress
  const [uploadedCount, setUploadedCount] = useState(0); // Counter for uploaded images
  const { currentUser } = useSelector((state) => state.user); // Example of how to access currentUser

  const maxUploadLimit = 6; // Maximum number of images that can be uploaded

  // Function to handle file selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const totalFiles = files.length + selectedImages.length;
    if (totalFiles > maxUploadLimit) {
      alert(`You can only select up to ${maxUploadLimit} images.`);
    } else {
      setSelectedImages([...selectedImages, ...files.slice(0, maxUploadLimit - selectedImages.length)]);
    }
  };

  // Function to remove selected image from preview
  const removeSelectedImage = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };

  // Function to handle image upload
  const handleUpload = () => {
    // Check if number of selected images is less than or equal to remaining uploads
    if (selectedImages.length > maxUploadLimit - uploadedCount) {
      alert(`You can only upload ${maxUploadLimit - uploadedCount} more images.`);
      return;
    }

    setUploading(true);

    const storage = getStorage(app);
    const uploadPromises = selectedImages.map((image) => {
      return new Promise((resolve, reject) => {
        const fileDirectory = currentUser._id; // Example: use currentUser._id as directory
        const fileName = new Date().getTime() + image.name;
        const storageRef = ref(storage, `Listing images/${fileDirectory}/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress((prevProgress) => ({
              ...prevProgress,
              [image.name]: progress
            }));
          },
          (error) => {
            console.error(error);
            reject(error);
          },
          async () => {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            setUploadedImages((prevImages) => [...prevImages, url]);
            setUploadedCount((prevCount) => prevCount + 1);
            resolve(url);
          }
        );
      });
    });

    Promise.all(uploadPromises)
      .then(() => {
        setSelectedImages([]); // Clear selected images after successful upload
        setUploading(false);
      })
      .catch((error) => {
        console.error('Error uploading images: ', error);
        setUploading(false);
      });
  };

  // Disable file input when 6 images are selected
  const canUploadMoreImages = uploadedCount < maxUploadLimit;

  useEffect(() => {
    // Disable file input when 6 images are selected
    const fileInput = document.getElementById('images');
    if (fileInput) {
      fileInput.disabled = !canUploadMoreImages;
    }
  }, [canUploadMoreImages]);

  return (
    <div className={`bg-slate-50 border rounded-lg flex-1 p-4 ml-4 ${className}`}>
      <h2 className='font-semibold text-lg mb-3'>Upload Images</h2>

      <div className='flex flex-col mb-3'>
        {/* Display selected images */}
        <div className='flex flex-wrap justify-center items-center mb-7 bg-gray-200 p-2 rounded-lg'>
          {selectedImages.length > 0 ? (
            selectedImages.map((image, index) => (
              <div key={index} className='m-2 text-center relative'>
                <img
                  src={URL.createObjectURL(image)}
                  alt="Selected"
                  className='h-24 w-24 object-cover rounded-lg mb-2'
                />
                {uploadProgress[image.name] !== undefined && (
                  <div className='absolute top-0 right-0 bg-white bg-opacity-75 p-1 rounded-full'>
                    {Math.round(uploadProgress[image.name])}%
                  </div>
                )}
                <button
                  className='absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600'
                  onClick={() => removeSelectedImage(index)}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            ))
          ) : (
            <span className='text-gray-600'>Selected Image Preview</span>
          )}
        </div>

        {/* Display uploaded images */}
        <div className='flex flex-wrap justify-center items-center mb-7 bg-gray-200 p-2 rounded-lg'>
          {uploadedImages.length > 0 ? (
            uploadedImages.map((url, index) => (
              <img
                key={index}
                src={url}
                alt="Uploaded"
                className='h-24 w-24 object-cover m-2 rounded-lg'
              />
            ))
          ) : (
            <span className='text-gray-600'>No Images Uploaded Yet</span>
          )}
        </div>

        <p className='font-semibold mb-4 self-center'>
          PS:
          <span className='font-normal text-gray-300 italic ml-2'>
            {`${maxUploadLimit - uploadedCount} image${maxUploadLimit - uploadedCount !== 1 ? 's' : ''} left`}
          </span>
        </p>

        {/* Button to select images */}
        <div className='flex items-center self-center'>
          <input
            type="file"
            id='images'
            className='hidden'
            onChange={handleImageChange}
            multiple
            accept="image/*"
            disabled={!canUploadMoreImages}
          />
          <label
            htmlFor='images'
            className={`cursor-pointer bg-slate-700 text-white p-2 rounded-lg self-center hover:opacity-90 ${!canUploadMoreImages && 'opacity-50 cursor-not-allowed'}`}>
            <FontAwesomeIcon icon={faImage} className='mr-2' />
            Select Images
          </label>
        </div>

        {/* Button to upload images */}
        <div className='flex items-center self-center mt-4'>
          <button
            onClick={handleUpload}
            className='bg-green-500 text-white p-2 rounded-lg self-center hover:opacity-90'
            disabled={uploading || selectedImages.length === 0 || !canUploadMoreImages}
          >
            {uploading ? 'Uploading...' : 'Upload Images'}
          </button>
        </div>
      </div>
    </div>
  );
}
