import React, { useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap"
import "./movies.css"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLocations, getPoster } from "../redux/actions/MovieActions";



export default function Movies() {

    const dispatch = useDispatch();

    const popularMovies = useSelector((state) => state.MovieReducer.popularMovies);

    useEffect(() => {
    }, [popularMovies])

    return (
        <Container>
            <Row>
                {
                    popularMovies.map((movie, index) => (
<Col key={index} xl={3} lg={6} sm={12}>
  <Link key={index} to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
    <article className="card" onClick={() => (dispatch(getLocations((movie.id))), dispatch(getPoster((movie.poster_path))))}>
      <img
        className="card__background"
        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        alt={movie.overview.slice(0, 144) + "..."}
      />
      <div className="card__content | flow">
        <div className="card__content--container | flow">
          <h2 className="card__title">{movie.original_title}</h2>
          <p className="card__description">
            {movie.overview.slice(0, 144) + "..."}
          </p>
        </div>
      </div>
    </article>
  </Link>
</Col>

                    ))
                }

            </Row>
        </Container>

    )
}
