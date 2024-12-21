import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; import { BrowserRouter, Route, Routes } from 'react-router-dom';


import Home from "./components/Home.js"
import SelectedMovie from "./components/SelectedMovie.js"
import SearchedMovies from "./components/SearchedMovies.js"

import NavbarComponent from "./components/NavbarComponent.js"
import Searchbar from "./components/Searchbar.js"
import { getPopularMovies } from "./redux/actions/MovieActions.js";
import Footer from "./components/Footer.js";

function App() {
  const dispatch = useDispatch();


  const version = useSelector((state) => state.MovieReducer.version);

  useEffect(() => {
    dispatch(getPopularMovies())
  })



  return (
    <div className="App">
      <NavbarComponent />
      <BrowserRouter>
        <Searchbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:imdbid" element={<SelectedMovie />} />
          <Route path="/search/:text" element={<SearchedMovies />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
