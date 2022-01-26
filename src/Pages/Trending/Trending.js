import React, { useEffect, useState } from 'react';
import axios from "axios"
import Card from "../../Components/Card/Card"
import './Trending.css'
import PageSlider from '../../Components/PageSlider/PageSlider';


const Trending = () => {

  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);

  const fetchTrending= async ()=>{
    const {data}= await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    );
    console.log(data.results);
    setContent(data.results);

  }

  useEffect(() => {
    window.scroll(0,0);
    fetchTrending();
    // eslint-disable-next-line
  }, [page]);
  

  return(
    <div className='wholeCards'>
        <span className='pageTitle'>Trending Today</span>
        <div className='trending'>
          {
            content && content.map(
              (c)=>(
                  <Card
                  key={c.id}
                  id={c.id}
                  poster={c.poster_path}
                  title={c.title||c.name}
                  vote_average={c.vote_average}
                  release_date={c.first_air_date||c.release_date}
                  media_type={c.media_type}
                  />
              )
            )
          }
        </div>
        <PageSlider setPage={setPage}/>
    </div>
  ) 
};

export default Trending;
