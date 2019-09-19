import React, { useState, useEffect } from 'react';
import { Form, Button, Col } from 'react-bootstrap';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';

const CreateBoardForm = () => {

    let [startDate, setStartDate] = useState(null);
    let [startFocused, setStartFocused] = useState(null);

    let [endDate, setEndDate] = useState(null);
    let [endFocused, setEndFocused] = useState(null);

    return (
        <Form >
            <Form.Group>
                <Form.Label>Board Name: </Form.Label>
                <Form.Control type="text" placeholder="Enter board name" />
            </Form.Group>

            <Form.Group>
                <Form.Label>Board Description: </Form.Label>
                <Form.Control type="text" as="textarea" rows="3" placeholder="Enter project description" />
            </Form.Group>


            <Form.Row>
                <Form.Group as={Col} md="6">
                    <Form.Label className="mr-2">Start date:</Form.Label>
                    <SingleDatePicker
                        date={startDate}
                        onDateChange={newDate => setStartDate(newDate)}
                        focused={startFocused} // PropTypes.bool
                        onFocusChange={({ newFocus }) => setStartFocused({ newFocus })}
                        onClose={() => {
                            setStartFocused(null);
                        }}
                        id="board_start"
                        keepOpenOnDateSelect={false}
                        openDirection="down"
                        placeholder={"Start"}
                    />
                </Form.Group>

                <Form.Group as={Col} md="6">
                    <Form.Label className="ml-4 mr-2">End date:</Form.Label>
                    <SingleDatePicker
                        date={endDate}
                        onDateChange={newDate => setEndDate(newDate)}
                        focused={endFocused} // PropTypes.bool
                        onFocusChange={({ newFocus }) => setEndFocused({ newFocus })}
                        onClose={() => {
                            setEndFocused(null);
                        }}
                        id="board_start"
                        keepOpenOnDateSelect={false}
                        openDirection="down"
                        placeholder={"End Date"}
                    />
                </Form.Group>
            </Form.Row>

            <Button className="float-right" variant="dark">Create Board</Button>
        </Form>
    );
};

export default CreateBoardForm;