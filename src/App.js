import React, { useEffect } from "react";
import { useSelector } from "react-redux";





function App() {


const version = useSelector((state) => state.MovieReducer.version);

useEffect(() => {
  console.log(version)
}, [])



  return (
    <div className="App">

    </div>
  );
}

export default App;
