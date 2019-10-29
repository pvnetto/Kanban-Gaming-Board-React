import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';

const DesignLogForm = ({ addLog }) => {

    let [title, setTitle] = useState("");
    let [content, setContent] = useState("");

    const onClick = () => {
        addLog(title, content);

        setTitle("");
        setContent("");
    }

    return (
        <Form >
            <Form.Group>
                <Form.Label>Log Title: </Form.Label>
                <Form.Control value={title} type="text" placeholder="Enter design log title" onChange={(e) => setTitle(e.target.value)} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Log Content: </Form.Label>
                <Form.Control value={content} type="text" as="textarea" rows="8"
                    placeholder={"Enter design log content"} onChange={(e) => setContent(e.target.value)} />
            </Form.Group>

            <Button onClick={onClick} className="float-right" variant="dark">Submit</Button>
        </Form>
    );
};

DesignLogForm.propTypes = {
    addLog: PropTypes.func.isRequired,
}

export default DesignLogForm;