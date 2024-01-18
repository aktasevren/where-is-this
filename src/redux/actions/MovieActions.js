import {GET_POPULAR_MOVIES} from "./ActionTypes"
import axios from "axios"



export const getPopularMovies = () => (dispatch) => {

    const popularMovies=[]
  
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=ed3d6526412667469a4e1a08a88488ef&language=en-US&page=1`
      )
      .then((response) =>
      {
        response.data.results.map((res)=>{
          if (res.genre_ids.includes(16)) {
          } else {
            popularMovies.push(res)
          }
        })
        dispatch({
          type: GET_POPULAR_MOVIES,
          payload: popularMovies,
        })
      }
  
      )
      .catch((err) => console.log(err));
  };