const useGenre = (selectedGenres)=>{
    if(selectedGenres.length===0){
        return "";
    }
    const genreIds=selectedGenres.map((g)=>g.id);
    return genreIds.reduce((acc,cur)=> acc + "," + cur);
}

export default useGenre