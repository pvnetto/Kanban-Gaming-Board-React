import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const CreateTaskForm = () => {
    return (
        <Form >
            <Form.Group>
                <Form.Label>Title: </Form.Label>
                <Form.Control type="text" placeholder="Enter task name" />
            </Form.Group>

            <Form.Row>
                <Form.Group as={Col} md="6">
                    <Form.Label>Board:</Form.Label>
                    <Form.Control as="select" column>
                        <option>Board 1</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group as={Col} md="6">
                    <Form.Label>Category:</Form.Label>
                    <Form.Control as="select">
                        <option>Programmer</option>
                        <option>Artist</option>
                        <option>Game Designer</option>
                        <option>Sound</option>
                        <option>Bugs</option>
                    </Form.Control>
                </Form.Group>
            </Form.Row>


            <Button className="float-right" variant="dark">Create Task</Button>
        </Form>
    );
};

export default CreateTaskForm;