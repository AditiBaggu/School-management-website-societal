import React, { useEffect, useState } from 'react';
import Avatar from '../../Shared/Components/UIElements/Avatar';
import LoadingSpinner from '../../Shared/Components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../Shared/Hooks/http-hook';
import '../Components/Picture.css';

function Picture() {
  const [pictures, setPictures] = useState([]);
  
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:4444/api/gallery/get"
        );
        setPictures(responseData.images);
      } catch (err) {}
    };
    fetchImages();
  }, [sendRequest]);


 

  return (
    <div className="photo-gallery">
      {isLoading && <LoadingSpinner overlay />}
      <div className="gallery">
        {pictures.map(image => (
          <div
            className="photo"
            key={image.id}
          >
          <img src={`http://localhost:4444/${image.image}`} alt={image._id}/>

           
          </div>
        ))}
      </div>
    </div>
  );
}


export default Picture;
