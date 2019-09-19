import React from 'react';
import { Form, Button } from 'react-bootstrap';

const CreateBoardForm = () => {
    return (
        <Form className="d-flex flex-column" >
            <Form.Group>
                <Form.Label>Board Name: </Form.Label>
                <Form.Control required type="text" placeholder="Enter board name" />
            </Form.Group>

            <Form.Group>
                <Form.Label>Board Description: </Form.Label>
                <Form.Control required type="text" as="textarea" rows="3" placeholder="Enter project description" />
            </Form.Group>

            <Form.Group>
                <Form.Row>
                    <Form.Label>Start date: </Form.Label>
                    <Form.Control type="date-time" />
                    {/* <input className="form-control" type="date-time" /> */}

                    <Form.Label>End date: </Form.Label>
                    <Form.Control type="date-time" />
                    {/* <input className="form-control" type="date-time" /> */}
                </Form.Row>
            </Form.Group>

            <Button className="align-self-end" variant="dark">Board</Button>
        </Form>
    );
};

export default CreateBoardForm;