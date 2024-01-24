import React from 'react'
import searchbar from "./searchbar.css"
import { Container } from "react-bootstrap"



export default function Searchbar() {
    return (

        <Container className='searchbar'>
            <form onsubmit="event.preventDefault();" role="search">
                <label for="search">Search for stuff</label>
                <input id="search" type="search" placeholder="zombieland..." autofocus required />
                <button type="submit">GO</button>
            </form>
        </Container>



    )
}
