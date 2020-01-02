import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Col } from 'react-bootstrap';
import { SingleDatePicker } from 'react-dates';

import { Formik } from 'formik';
import * as yup from 'yup';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import { addBoardAction } from '../../dispatchers/boards/board-actions-async';
import FullPageSpinner from '../../commons/spinners/FullPageSpinner';

const CreateBoardForm = () => {

    let [startDate, setStartDate] = useState(null);
    let [startFocused, setStartFocused] = useState(false);

    let [endDate, setEndDate] = useState(null);
    let [endFocused, setEndFocused] = useState(false);

    const isLoading = useSelector(state => state.boards.isLoading);
    const dispatch = useDispatch();

    const submitBoard = async (values, e) => {
        dispatch(addBoardAction(values.title, values.description, startDate, endDate));

        e.resetForm();
        setStartDate(null);
        setEndDate(null);
    }

    const schema = yup.object({
        title: yup.string().required(),
        description: yup.string().required(),
    });

    return (
        <>
            {isLoading ? <FullPageSpinner /> : null}
            <Formik validationSchema={schema} onSubmit={submitBoard} initialValues={{ title: "", description: "" }}>

                {({ handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    isValid,
                    errors, }) => (

                        <Form noValidate onSubmit={handleSubmit}>
                            <Form.Group controlId={"validationFormikTitle"}>
                                <Form.Label>Board Title: </Form.Label>
                                <Form.Control value={values.title} name={"title"}
                                    type="text" placeholder="Enter board title"
                                    isInvalid={!!errors.title}
                                    onChange={handleChange} />
                                <Form.Control.Feedback type={"invalid"}>{errors.title}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId={"validationFormikDescription"}>
                                <Form.Label>Board Description: </Form.Label>
                                <Form.Control value={values.description} name={"description"}
                                    type="text" as="textarea" rows="3"
                                    placeholder="Enter board description"
                                    isInvalid={!!errors.description}
                                    onChange={handleChange} />
                                <Form.Control.Feedback type={"invalid"}>{errors.description}</Form.Control.Feedback>
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
                                    <Form.Control.Feedback type={"invalid"}>{errors.startDate}</Form.Control.Feedback>
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
                                    <Form.Control.Feedback type={"invalid"}>{errors.endDate}</Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>

                            <Button className="float-right" variant="dark" type="submit">Create Board</Button>
                        </Form>
                    )}
            </Formik>
        </>
    );
};

export default CreateBoardForm;