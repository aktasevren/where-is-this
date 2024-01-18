
import {
  GET_POPULAR_MOVIES,
} from "../actions/ActionTypes";

const initialState = {
    version:"v1.0",
    selectedMovieID:"",
    popularMovies:[]
  };



  const MovieReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_POPULAR_MOVIES:
      return {
        ...state,
        popularMovies: action.payload,
      };
      default:
        return state;
    }
  };



  export default MovieReducer;