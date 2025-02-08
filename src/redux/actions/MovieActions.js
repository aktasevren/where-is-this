import { GET_POPULAR_MOVIES, GET_LOCATIONS, GET_POSTER, FETCH_MOVIES } from "./ActionTypes"
import axios from "axios"
import alertify from "alertifyjs";


export const getPopularMovies = () => (dispatch) => {
  axios
    .get("https://filming-locations-api-w-express-js.vercel.app/api/popular-movies") // Backend'e istek gönder
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
  const movieID = [];
  const movieInfo = [];
  let noMovie = false;

  try {
    // ✅ 1. Backend API'ye istek atarak TMDb'den IMDB ID alıyoruz
    const movieResponse = await axios.get(
      `https://filming-locations-api-w-express-js.vercel.app/api/movie/${id}`
    );

    if (!movieResponse.data.imdb_id) {
      alertify.error("Movie ID not found.");
      return;
    }

    const imdbid = { imdbid: movieResponse.data.imdb_id };
    movieID.push(imdbid);

    // ✅ 2. Backend API'ye istek atarak IMDB ID'ye göre filming locations alıyoruz
    const locationsResponse = await axios.get(
      `https://filming-locations-api-w-express-js.vercel.app/imdbid/${movieID[0].imdbid}`
    );

    if (
      !locationsResponse.data.locations ||
      locationsResponse.data.locations.length === 0 ||
      locationsResponse.data.locations === "location not found"
    ) {
      alertify.set("notifier", "position", "top-right");
      alertify.error("No location found for this movie.");
      noMovie = true;
    } else {
      locationsResponse.data.locations.map((res) => {
        movieInfo.push({
          place: res.node.location,
          desc:
            res.node?.displayableProperty?.qualifiersInMarkdownList?.[0]
              ?.markdown || "No description available",
        });
      });

      // ✅ 3. Geolocation API ile koordinatları alıyoruz
      await Promise.all(
        movieInfo.map(async (movie, index) => {
          const encodedPlace = encodeURIComponent(movie.place);
          try {
            const geoResponse = await axios.get(
              `https://api.geoapify.com/v1/geocode/search?text=${encodedPlace}&apiKey=a97d941d259f4b42912a28ac3d623d46`
            );

            movie.Xcoor = geoResponse?.data?.features?.[0]?.geometry?.coordinates?.[0];
            movie.Ycoor = geoResponse?.data?.features?.[0]?.geometry?.coordinates?.[1];
            movie.index = index;
          } catch (error) {
            console.log("Error fetching geolocation:", error);
          }
        })
      );
    }

    // ✅ 4. Redux'a veriyi dispatch et
    dispatch({
      type: GET_LOCATIONS,
      payload: {
        movieInfo,
        noMovie,
      },
    });
  } catch (error) {
    console.error("Error fetching locations:", error);
  }
};

export const fetchMovies = (movieValue) => async (dispatch) => {
  try {
    // ✅ Backend API'ye istek atarak filmleri çekiyoruz
    const response = await axios.get(
      `https://filming-locations-api-w-express-js.vercel.app/api/search-movie?query=${movieValue}`
    );

    // ✅ Backend zaten animasyon filmlerini filtrelediği için direkt Redux'a aktarıyoruz
    dispatch({
      type: FETCH_MOVIES,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
};
