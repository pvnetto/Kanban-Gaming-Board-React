import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';

const CreateBoardForm = ({ addBoard, projectId }) => {

    let [title, setTitle] = useState("");
    let [description, setDescription] = useState("");

    let [startDate, setStartDate] = useState(null);
    let [startFocused, setStartFocused] = useState(false);

    let [endDate, setEndDate] = useState(null);
    let [endFocused, setEndFocused] = useState(false);

    const onClick = () => {
        addBoard(projectId, title, description, startDate, endDate);

        setTitle("");
        setDescription("");
        setStartDate(null);
        setEndDate(null);
    }

    return (
        <Form >
            <Form.Group>
                <Form.Label>Board Title: </Form.Label>
                <Form.Control value={title} type="text" placeholder="Enter board title" onChange={(e) => setTitle(e.target.value)} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Board Description: </Form.Label>
                <Form.Control value={description} type="text" as="textarea" rows="3" placeholder="Enter board description" onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>


            <Form.Row>
                <Form.Group as={Col} md="6">
                    <Form.Label className="mr-2">Start date:</Form.Label>
                    <SingleDatePicker
                        date={startDate}
                        onDateChange={newDate => setStartDate(newDate)}
                        focused={startFocused}
                        onFocusChange={(newFocus) => setStartFocused(newFocus.focused)}
                        onClose={() => {
                            setStartFocused(false);
                        }}
                        id="board_start"
                        keepOpenOnDateSelect={false}
                        openDirection="down"
                        placeholder={"Start Date"}
                    />
                </Form.Group>

                <Form.Group as={Col} md="6">
                    <Form.Label className="ml-4 mr-2">End date:</Form.Label>
                    <SingleDatePicker
                        date={endDate}
                        onDateChange={newDate => setEndDate(newDate)}
                        focused={endFocused} // PropTypes.bool
                        onFocusChange={(newFocus) => setEndFocused(newFocus.focused)}
                        onClose={() => {
                            setEndFocused(false);
                        }}
                        id="board_end"
                        keepOpenOnDateSelect={false}
                        openDirection="down"
                        placeholder={"End Date"}
                    />
                </Form.Group>
            </Form.Row>

            <Button className="float-right" variant="dark" onClick={onClick}>Create Board</Button>
        </Form>
    );
};

export default CreateBoardForm;