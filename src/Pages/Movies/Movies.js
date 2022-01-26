import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from '../../Components/Card/Card';
import Genres from '../../Components/Genres';
import PageSlider from '../../Components/PageSlider/PageSlider';
import useGenre from "../../UseGenre/useGenre"

const Movies = () => {

  const [content, setContent] = useState([]);
  const [page,setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState();
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const genreforURL=useGenre(selectedGenres);

  const fetchMovies = async ()=> {
    const {data} = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate&with_genres=${genreforURL}`
      )
      console.log(data);
      setContent(data.results);
      setNoOfPages(data.total_pages)
  }

  useEffect(() => {
    window.scroll(0,0);
    fetchMovies();
    // eslint-disable-next-line
  }, [page,genreforURL]);
  
  // style={{padding: "10%",marginTop: "-10%",marginBottom: "-10%"}}
  return(
    <div >
        <span className='pageTitle'>Discover Movies</span>
        <Genres
          type="movie"
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          genres={genres}
          setGenres={setGenres}
          setPage={setPage}
        />
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
                  media_type="movie"
                  />
              )
            )
          }
        </div>
        {noOfPages > 1 && (
          <PageSlider setPage={setPage} noOfPages={noOfPages}/>
        )}
        
    </div>
  ) 
};

export default Movies;
