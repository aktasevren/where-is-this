
import {
  GET_LOCATIONS,
  GET_POPULAR_MOVIES,
  GET_POSTER,
  FETCH_MOVIES
} from "../actions/ActionTypes";

const initialState = {
  version: "v1.0",
  selectedMovieID: "",
  popularMovies: [],
  movieInfos: [],
  poster: "",
  fMovies: []
};



const MovieReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POPULAR_MOVIES:
      return {
        ...state,
        popularMovies: action.payload,
      };
    case GET_LOCATIONS:
      return {
        ...state,
        movieInfos: action.payload,
      };
    case GET_POSTER:
      return {
        ...state,
        poster: action.payload,
      };
    case FETCH_MOVIES:
      return {
        ...state,
        fMovies: action.payload,
      };
    default:
      return state;
  }
};



export default MovieReducer;