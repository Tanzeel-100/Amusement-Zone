import { ThemeProvider } from '@emotion/react';
import { Pagination } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { palette } from '@mui/system';
import React from 'react';

const darkTheme=createTheme({
    palette:{
        type:"dark"
    }
})

const PageSlider = ({setPage,noOfPages=10}) => {

    const handlePageChange=(page) =>{
        setPage(page);
        window.scroll(0,0);
    };

  return(
    <div 
        style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: 10,
        }}
    >
    <ThemeProvider theme={darkTheme}>
      <Pagination
        onChange={(e) => handlePageChange(e.target.textContent)}
        count={noOfPages}
        color="primary"
        hideNextButton
        hidePrevButton
      />
    </ThemeProvider>  
    </div>
  )
  
};

export default PageSlider;
