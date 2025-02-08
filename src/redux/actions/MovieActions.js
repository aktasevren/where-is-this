import { GET_POPULAR_MOVIES, GET_LOCATIONS, GET_POSTER, FETCH_MOVIES } from "./ActionTypes"
import axios from "axios"
import alertify from "alertifyjs";



// export const getPopularMovies = () => (dispatch) => {
//   const popularMovies = []
//   axios
//     .get(
//       `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`
//     )
//     .then((response) => {
//       response.data.results.map((res) => {
//         if (res.genre_ids.includes(16)) {
//         }
//         else {
//           popularMovies.push(res)
//         }
//       })
//       dispatch({
//         type: GET_POPULAR_MOVIES,
//         payload: popularMovies,
//       })
//     }
//     )
//     .catch((err) => console.log(err));

// };

export const getPopularMovies = () => (dispatch) => {
  axios
    .get("http://localhost:3001/api/popular-movies") // Backend'e istek gönder
    .then((response) => {
      dispatch({
        type: GET_POPULAR_MOVIES,
        payload: response.data, // Backend'den gelen filtrelenmiş filmleri al
      });
    })
    .catch((err) => console.log("Error fetching popular movies:", err));
};


export const getPoster = (poster_path) => (dispatch) => {
  dispatch({
    type: GET_POSTER,
    payload: poster_path
  })
}

export const getLocations = (id) => async (dispatch) => {

  const movieID = []
  const movieInfo = []
  const noMovie = false
  await axios
    .get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
    )
    .then((response) => {
      const imdbid = { imdbid: response.data.imdb_id }
      movieID.push(imdbid)
    }
    )
  await axios
    .get(`https://filming-locations-api-w-express-js.vercel.app/imdbid/${movieID[0].imdbid}`)
    .then((response) => {

      if (response.data.locations.length === 0) {
        console.log("No location found for this movie.");
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('No location found for this movie.');
        const noMovie = true
        const movieInfo = []
      } 
      else if (response.data.locations == "location not found") {
        console.log("No location found for this movie.");
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('No location found for this movie.');
        const noMovie = true
        const movieInfo = []
      }
      else {
        const noMovie = false
        response.data.locations.map((res) => {
          movieInfo.push({ place: res.node.location, desc: res.node?.displayableProperty?.qualifiersInMarkdownList?.[0]?.markdown })
        })
        movieInfo.map(async (movie, index) => {
          const encodedPlace = encodeURIComponent(movie.place);

          await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${encodedPlace}&apiKey=a97d941d259f4b42912a28ac3d623d46`)
            .then((response) => {
              try {
                movie.Xcoor = response?.data?.features?.[0]?.geometry?.coordinates?.[0]
                movie.Ycoor = response?.data?.features?.[0]?.geometry?.coordinates?.[1]
                movie.index = index
              } catch (error) {
                console.log(error)
              }
            })
        }
        )

        dispatch({
          type: GET_LOCATIONS,
          payload: {
            movieInfo,noMovie
          }
        })
      }
    })
}

export const fetchMovies = (movieValue) => async (dispatch) => {
  const fMovies = []
  await axios
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&query=${movieValue}&page=1&include_adult=false`
    )
    .then((response) => {
      response.data.results.map((res) => {
        if (res.genre_ids.includes(16)) {
        } else {
          fMovies.push(res)
        }
      })
      dispatch({
        type: FETCH_MOVIES,
        payload: fMovies,
      })
    }
    )

};