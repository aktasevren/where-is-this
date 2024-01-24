import React from 'react'
import { Container } from "react-bootstrap"



export default function Searchbar() {
    return (

        <Container className='searchbar'>
            <form onsubmit="event.preventDefault();" role="search">
                <input id="search" type="search" placeholder="type a movie name..." autofocus required />
                <button type="submit">GO</button>
            </form>
        </Container>



    )
}
