import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';

import { addProjectAction } from '../../dispatchers/projects/project-actions-async';
import FullPageSpinner from '../../utils/spinners/FullPageSpinner';

const CreateProjectForm = () => {

    const isLoading = useSelector(state => state.isLoading);
    const dispatch = useDispatch();

    const submitProject = async (values, e) => {
        dispatch(addProjectAction(values.title, values.description, values.generalInfo));

        e.resetForm();
    }

    const schema = yup.object({
        title: yup.string().required(),
        description: yup.string().required(),
        generalInfo: yup.string().required(),
    });

    return (
        <>
            {isLoading ? <FullPageSpinner /> : null}

            <Formik validationSchema={schema} onSubmit={submitProject} initialValues={{ title: "", description: "", generalInfo: "" }}>

                {({ handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    isValid,
                    errors, }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Form.Group controlId={"validationFormikTitle"}>
                                <Form.Label>Project Title: </Form.Label>
                                <Form.Control value={values.title} name={"title"}
                                    type="text" placeholder="Enter project title"
                                    isInvalid={!!errors.title}
                                    onChange={handleChange} />
                                <Form.Control.Feedback type={"invalid"}>{errors.title}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId={"validationFormikDescription"}>
                                <Form.Label>Project Description: </Form.Label>
                                <Form.Control value={values.description} name={"description"}
                                    type="text" as="textarea" rows="3"
                                    placeholder="Enter project description"
                                    isInvalid={!!errors.description}
                                    onChange={handleChange} />
                                <Form.Control.Feedback type={"invalid"}>{errors.description}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId={"validationFormikGeneralInfo"}>
                                <Form.Label>General info: </Form.Label>
                                <Form.Control value={values.generalInfo} name={"generalInfo"}
                                    type="text" as="textarea" rows="8"
                                    placeholder={"Enter general info about the project"}
                                    isInvalid={!!errors.generalInfo}
                                    onChange={handleChange} />
                                <Form.Control.Feedback type={"invalid"}>{errors.generalInfo}</Form.Control.Feedback>
                            </Form.Group>

                            <Button type="submit" className="float-right" variant="dark">Create Project</Button>
                        </Form>
                    )}

            </ Formik>
        </>
    );
};

export default CreateProjectForm;