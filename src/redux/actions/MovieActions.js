import { GET_POPULAR_MOVIES, GET_LOCATIONS, GET_POSTER } from "./ActionTypes"
import axios from "axios"



export const getPopularMovies = () => (dispatch) => {
  const popularMovies = []
  axios
    .get(
      `https://api.themoviedb.org/3/movie/popular?api_key=ed3d6526412667469a4e1a08a88488ef&language=en-US&page=1`
    )
    .then((response) => {
      response.data.results.map((res) => {
        if (res.genre_ids.includes(16)) {
        }
        else {
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


export const getPoster = (poster_path) => (dispatch) => {
  dispatch({
    type: GET_POSTER,
    payload: poster_path
  })
}

export const getLocations = (id) => async (dispatch) => {


  const movieID = []
  const movieInfo = []

  await axios
    .get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=ed3d6526412667469a4e1a08a88488ef&language=en-US`
    )
    .then((response) => {
      const imdbid = { imdbid: response.data.imdb_id }

      movieID.push(imdbid)
    }
    )



  await axios
    .get(`https://filming-locations-api-w-express-js.vercel.app/imdbid/${movieID[0].imdbid}`)
    // .then((response) => {
    //   response.data.locations.map((res) => {
    //     console.log(res.node.location)
    //   })

    // })

    .then((response) => (
      response.data.locations.map((res) => {
        // console.log([index, res.node.location, res.node?.displayableProperty?.qualifiersInMarkdownList?.[0]?.markdown])
        movieInfo.push({ place: res.node.location, desc: res.node?.displayableProperty?.qualifiersInMarkdownList?.[0]?.markdown })
      })
    ))


  movieInfo.map(async (movie, index) => {
    await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${movie.place}&apiKey=a97d941d259f4b42912a28ac3d623d46`)
      .then((response) => {
        movie.Xcoor = response.data.features[0].geometry.coordinates[0]
        movie.Ycoor = response.data.features[0].geometry.coordinates[1]
        movie.index = index
      })
  })


  await dispatch({
    type: GET_LOCATIONS,
    payload: movieInfo
  })






}