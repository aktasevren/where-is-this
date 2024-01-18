import React, { useEffect } from "react";
import { useSelector } from "react-redux";


export default function SelectedMovie() {


const selectedMovieID = useSelector((state) => state.MovieReducer.selectedMovieID);

useEffect(() => {
  console.log("Selected Movie ID  : " + selectedMovieID)
})
  return (
    <div>SelectedMovie</div>
  )
}
