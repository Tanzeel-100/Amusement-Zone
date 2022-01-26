import { createTheme, Tab, Tabs, TextField, ThemeProvider } from '@mui/material';
import React, { useEffect } from 'react';
import {useState} from "react"
import SearchIcon from '@mui/icons-material/Search';
import "./Search.css"
import axios from 'axios';
import PageSlider from '../../Components/PageSlider/PageSlider';
import Card from '../../Components/Card/Card';

const Search = () => {

  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState();
  const [content, setContent] = useState([]);
  const [searchText, setSearchText] = useState('');

  const darkTheme=createTheme({
    palette:{
        type:"dark",
        primary:{
          main: "#fff"
        },
    }
  })

  const fetchSearch = async ()=>{
    try{
      const {data}=await axios.get(
        `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      )
      setContent(data.results);
      setNoOfPages(data.total_pages)
    }
    catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    window.scroll(0,0);
    fetchSearch();
    if(searchText.length===0){
      setSearchText('a');
    }
    // eslint-disable-next-line
  }, [page,type,searchText]);

  // <button variant="contained" style={{ marginLeft: 10, borderRadius:"10px"}} onClick={fetchSearch}> 
  //         <SearchIcon fontSize="large" />
  //       </button>

  return(
    <div style={{margin:"0 10%"}}>
      <ThemeProvider theme={darkTheme}>
      <div className='search'>
        <TextField
          style={{flex:1 , backgroundColor:"#4e6e68", fontColor:"white", borderRadius:"5px", fontFamily:'Algerian'}}
          label="Search"
          className="searchBox" 
          variant="filled" 
           onChange={(e)=> setSearchText(e.target.value)}
        />
        
      </div>
        <Tabs 
          value={type}
          indicatorColor="primary"
          textColor="primary"
          aria-label="disabled tabs example" 
          style={{ paddingBottom: 5 }}
          onChange={(event,newValue)=>{
            setType(newValue);
            setPage(1);
          }}
        >
          <Tab label="Search Movies" style={{width:"50%" , fontFamily: "Algerian"}}/>
          <Tab label="Search TV Series" style={{width:"50%",fontFamily: "Algerian"}}/>
        </Tabs>
      </ThemeProvider>
      <div className='searching'>
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
                  media_type={type?"tv":"movie"}
                  />
              )
            )
          }
          {searchText &&
            !content.length &&
            (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>
          )}
        </div>
        {noOfPages > 1 && (
          <PageSlider setPage={setPage} noOfPages={noOfPages}/>
        )}
    </div>
  )
};

export default Search;
