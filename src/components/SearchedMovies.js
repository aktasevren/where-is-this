import React, { useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap"
import movies from "./movies.css"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLocations, getPoster } from "../redux/actions/MovieActions";


export default function SearchedMovies() {
  const dispatch = useDispatch();

  const fMovies = useSelector((state) => state.MovieReducer.fMovies);

  useEffect(() => {

  }, [fMovies])

  return (
    <Container>
      <Row>
        {
          fMovies.map((movie) => (
            <Col xl={4} lg={6} sm={12}>
              <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
                <article className="card movie-card" onClick={() => (dispatch(getLocations((movie.id))), dispatch(getPoster((movie.poster_path))))}>
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
