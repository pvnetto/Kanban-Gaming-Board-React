import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';

import FullPageSpinner from '../../commons/spinners/FullPageSpinner';

const CreateProjectForm = () => {

    let [isAdding, setIsAdding] = useState(false);

    // const { addProject } = useWorkspace();
    console.log("TODO: ADD PROJECT");
    const submitProject = async (values, e) => {
        setIsAdding(true);
        console.log("TODO: ADD PROJECT");
        // await addProject(values.title, values.description, values.generalInfo);
        setIsAdding(false);

        e.resetForm();
    }

    const schema = yup.object({
        title: yup.string().required(),
        description: yup.string().required(),
        generalInfo: yup.string().required(),
    });

    return (
        <>
            {isAdding ? <FullPageSpinner /> : null}

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