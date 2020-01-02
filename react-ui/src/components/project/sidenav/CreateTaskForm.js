import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Col } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';

import { addTaskToBoard, addTaskToBacklog } from '../../../firebase/actions/task-actions';
import { categories } from '../../commons/Categories';

const CreateTaskForm = () => {

    const backlogID = '-100';

    const boards = useSelector(state => state.boards.boards);
    const dispatch = useDispatch();

    const submitTask = (values, e) => {
        if (values.boardId === backlogID) {
            dispatch(addTaskToBacklog(values.name, values.description, values.category));
        }
        else {
            dispatch(addTaskToBoard(values.boardId, values.name, values.description, values.category));
        }

        // Resetting form
        e.resetForm();
    }

    const schema = yup.object({
        name: yup.string().required(),
        description: yup.string(),
        boardId: yup.string().required(),
        category: yup.string().required(),
    });

    return (
        <Formik validationSchema={schema} onSubmit={submitTask} initialValues={{ name: "", description: "", boardId: backlogID, category: categories.ART }}>

            {({ handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                isValid,
                errors, }) => (

                    <Form noValidate onSubmit={handleSubmit} >
                        <Form.Group controlId={"validationFormikName"}>
                            <Form.Label>Name: </Form.Label>
                            <Form.Control
                                value={values.name} name={"name"}
                                type="text" placeholder="Enter task name"
                                isInvalid={!!errors.name}
                                onChange={handleChange} />
                            <Form.Control.Feedback type={"invalid"}>{errors.name}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId={"validationFormikDescription"}>
                            <Form.Label>Description: </Form.Label>
                            <Form.Control value={values.description} name={"description"}
                                type="text" placeholder="Enter task description"
                                isInvalid={!!errors.description}
                                onChange={handleChange} />
                            <Form.Control.Feedback type={"invalid"}>{errors.description}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Row>
                            <Form.Group as={Col} md="6" controlId={"validationFormikBoardId"}>
                                <Form.Label>Board:</Form.Label>
                                <Form.Control value={values.boardId} name={"boardId"}
                                    column="true" as="select"
                                    isInvalid={!!errors.boardId}
                                    onChange={handleChange}>

                                    <option value={backlogID}></option>
                                    {boards.map((board, i) =>
                                        <option value={board.id} key={i}>{board.title}</option>
                                    )}
                                </Form.Control>
                                <Form.Control.Feedback type={"invalid"}>{errors.boardId}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md="6" controlId={"validationFormikCategory"}>
                                <Form.Label>Category:</Form.Label>
                                <Form.Control as="select"
                                    value={values.category} name={"category"}
                                    isInvalid={!!errors.category}
                                    onChange={handleChange}>

                                    {Object.values(categories).map((category, i) => <option key={i}>{category}</option>)}
                                </Form.Control>
                                <Form.Control.Feedback type={"invalid"}>{errors.category}</Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>


                        <Button className="float-right" variant="dark" type="submit">Create Task</Button>
                    </Form>
                )}

        </Formik>
    );
};

export default CreateTaskForm;