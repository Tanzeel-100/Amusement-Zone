import axios from 'axios';
import React, { useState, useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { img_300, noPicture } from '../../Config/Config';
import './Carousel.css'

const handleDragStart = (e) => e.preventDefault();

const Carousel = ({media_type, id}) => {

  const [credits, setCredits] = useState();

  const items = credits?.map( (cast) => (
    <div className='carouselItem'>
        <img 
            src={cast.profile_path? `${img_300}/${cast.profile_path}` : noPicture}
            alt={cast.name}
            onDragStart={handleDragStart} 
            className='carouselItem_img'
        />
        <b className='carouselItem_txt'>{cast.name}</b>
    </div>
  ));
    
  const responsive = {
      0: {
          items: 3,
      },
      512: {
          items: 5,
      },
      1024: {
          items: 7,
      },
  };
    
  useEffect(() => {
      axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
      .then( (response) => {
        setCredits(response.data.cast)
      })
      .catch ( err => {
          console.log('something went wrong')
      })
  }, [media_type,id])
  return (
    <AliceCarousel 
        autoPlay 
        responsive={responsive} 
        infinite
        disableButtonsControls
        mouseTracking items={items} 
    />
  );
}

export default Carousel;