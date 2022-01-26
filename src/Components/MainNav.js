import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Whatshot from '@mui/icons-material/Whatshot';
import SearchIcon from '@mui/icons-material/Search';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    backgroundColor: "#4e3857",
    zIndex: 100,
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const navigate=useNavigate();

    React.useEffect(() => {
        if(value===0){
            navigate("/")
        }
        else if(value===1){
            navigate("/movies")
        }
        else if(value===2){
            navigate("/series")
        }
        else if(value===3){
            navigate("search")
        }
    }, [value,navigate]);
  

  return (
      <BottomNavigation
        style={{backgroundColor: "#293c40"}}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        className={classes.root}
      >
        <BottomNavigationAction onClick={()=>{window.scroll(0,0)}} style={{color:"white"}} label="Trending" icon={<Whatshot />} />
        <BottomNavigationAction onClick={()=>{window.scroll(0,0)}} style={{color:"white"}} label="Movies" icon={<MovieIcon />} />
        <BottomNavigationAction onClick={()=>{window.scroll(0,0)}} style={{color:"white"}} label="TV Series" icon={<TvIcon />} />
        <BottomNavigationAction onClick={()=>{window.scroll(0,0)}} style={{color:"white"}} label="Search" icon={<SearchIcon />} />
      </BottomNavigation>
  );
}
