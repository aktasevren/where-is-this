import React, { useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap"
import movies from "./movies.css"

import { useSelector } from "react-redux";




export default function Movies() {

    const sampleMovies = useSelector((state) => state.MovieReducer.popularMovies);

    useEffect(() => {
        console.log(sampleMovies)
    }, [sampleMovies])

    return (
        <Container>
            <Row>
                {
                    sampleMovies.map((movie) => (
                        <Col xl={4} lg={6} sm={12}>
                            <article className="card movie-card">
                                <img
                                    className="card__background"
                                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                    alt="Photo of Cartagena's cathedral at the background and some colonial style houses"
                                />
                                <div className="card__content | flow">
                                    <div className="card__content--container | flow">
                                        <h2 className="card__title">{movie.original_title}</h2>
                                        <p className="card__description">
                                            {movie.overview.slice(0, 144) + "..."}
                                        </p>
                                    </div>
                                    <button className="card__button">SEE ON MAP</button>
                                </div>
                            </article>
                        </Col>
                    ))
                }

            </Row>
        </Container>

    )
}
