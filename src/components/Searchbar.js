import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchMovies } from "../redux/actions/MovieActions";
import { Row, Col, Button, Form, InputGroup } from "react-bootstrap";
import alertify from "alertifyjs";

export default function Searchbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [inputText, setInputText] = useState("");


    const onChange = (e) => {
        setInputText(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (inputText === "" || inputText === null || inputText === undefined) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error('Please type something.');
        } else {
            dispatch(fetchMovies(inputText));
            navigate(`/search/${inputText}`);
        }

    };

    return (


        <Row className="searchbar">
            <Col lg={4}>
                <InputGroup className="my-3" onChange={onChange}>
                    <Form.Control placeholder="Type a movie name ..." />
                    <Button onClick={onSubmit}>
                        <b>Search</b>
                    </Button>
                </InputGroup>
            </Col>
        </Row>



    )
}
