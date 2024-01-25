import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchMovies } from "../redux/actions/MovieActions";
import { Row, Col, Button, Form, InputGroup } from "react-bootstrap";

export default function Searchbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [inputText, setInputText] = useState("");


    const onChange = (e) => {
        setInputText(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(fetchMovies(inputText));
        navigate(`/search/${inputText}`);
    };

    return (

        <Row className="d-flex justify-content-center search-area">
            <Col lg={4}>
                <InputGroup className="my-3" onChange={onChange}>
                    <Form.Control placeholder="Type a movie name ..." style={{ backgroundColor: '#DCDCDC', fontWeight: 'bold' }} />
                    <Button style={{ width: '120px' }} className="bg-warning" onClick={onSubmit}>
                        <b style={{ color: "black", fontSize: '24px' }}>Search</b>
                    </Button>
                </InputGroup>
            </Col>
        </Row>



    )
}
