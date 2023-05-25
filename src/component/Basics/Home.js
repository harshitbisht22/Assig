import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Home.css';

const Home = () => {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random/3');
      const data = await response.json();
      setImageUrls(data.message);
    } catch (error) {
      console.log('Error fetching images:', error);
    }
  };

  return (
    <div>
      <h1>Home</h1>
      {imageUrls.length > 0 && (
        <Carousel>
          {imageUrls.map((imageUrl, index) => (
            <div key={index}>
              <img src={imageUrl} alt={`Dog ${index + 1}`} className="carousel-image" />
              <p className="legend">Legend {index + 1}</p>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default Home;
