import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const CreateTaskForm = () => {
    return (
        <Form className="d-flex flex-column" >
            <Form.Group>
                <Form.Label>Title: </Form.Label>
                <Form.Control required type="text" placeholder="Enter board name" />
            </Form.Group>

            <Form.Group as={Row}>
                <Col sm={12} className="p-0">
                    <Form.Label column sm={2}>Board: </Form.Label>

                    <Col sm={10}>
                        <Form.Control as="select" column>
                            <option>Board 1</option>
                        </Form.Control>
                    </Col>
                </Col>

                <Col sm={12} className="p-0">
                    <Form.Label column sm={2}>Category: </Form.Label>

                    <Col sm={10}>
                        <Form.Control as="select">
                            <option>Programmer</option>
                            <option>Artist</option>
                            <option>Game Designer</option>
                            <option>Sound</option>
                            <option>Bugs</option>
                        </Form.Control>
                    </Col>
                </Col>
            </Form.Group>


            <Button className="align-self-start" variant="dark">Create Task</Button>
        </Form>
    );
};

export default CreateTaskForm;