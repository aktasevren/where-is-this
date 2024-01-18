import React, { useEffect } from "react";
import { Card, Container, Col, Row } from "react-bootstrap"
import movies from "./movies.css"

import { useSelector } from "react-redux";




export default function Movies() {

    const sampleMovies = useSelector((state) => state.MovieReducer.popularMovies);

    useEffect(() => {
      console.log(sampleMovies)
    }, [sampleMovies])
    


    const movieList = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a",]

    return (
        <Container>
            <Row>
                {
                    sampleMovies.map((movie) => (
                        <Col lg={3}>
                            <article class="card">
                                <img
                                    class="card__background"
                                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} 
                                    alt="Photo of Cartagena's cathedral at the background and some colonial style houses"
                                    width="1920"
                                    height="2193"
                                />
                                <div class="card__content | flow">
                                    <div class="card__content--container | flow">
                                        <h2 class="card__title">{movie.original_title}</h2>
                                        <p class="card__description">
                                            {movie.overview}
                                        </p>
                                    </div>
                                    <button class="card__button">Read more</button>
                                </div>
                            </article>
                        </Col>
                    ))
                }

            </Row>
        </Container>

    )
}
