import React, { useState, useEffect, useContext } from 'react';
import { Form, Button, Col } from 'react-bootstrap';

import { categories } from '../../commons/Categories';
import BoardsContext from '../../contexts/BoardsContext';

const CreateTaskForm = () => {

    let [board, setBoard] = useState({});
    let [name, setName] = useState("");
    let [description, setDescription] = useState("");
    let [category, setCategory] = useState(categories.ART);

    let { boards, addTask } = useContext(BoardsContext);

    useEffect(() => {
        const defaultBoard = boards[0] ? boards[0].title : '';
        setBoard({ ...defaultBoard });
    }, []);

    const onClick = () => {
        const defaultBoard = boards[0] ? boards[0].title : '';

        addTask(board, name, description, category);

        // Resetting form
        setBoard({ ...defaultBoard });
        setName("");
        setDescription("");
        setCategory(categories.ART);
    }

    return (
        <Form >
            <Form.Group>
                <Form.Label>Name: </Form.Label>
                <Form.Control type="text" placeholder="Enter task name" value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Description: </Form.Label>
                <Form.Control type="text" placeholder="Enter task description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>

            <Form.Row>
                <Form.Group as={Col} md="6">
                    <Form.Label>Board:</Form.Label>
                    <Form.Control column="true" as="select" value={board} onChange={(e) => setBoard(e.target.value)}>
                        <option value=""></option>
                        {boards.map((board, i) => <option key={i}>{board.title}</option>)}
                    </Form.Control>
                </Form.Group>

                <Form.Group as={Col} md="6">
                    <Form.Label>Category:</Form.Label>
                    <Form.Control as="select" value={category} onChange={(e) => setCategory(e.target.value)}>
                        {Object.values(categories).map((category, i) => <option key={i}>{category}</option>)}
                    </Form.Control>
                </Form.Group>
            </Form.Row>


            <Button className="float-right" variant="dark" onClick={onClick}>Create Task</Button>
        </Form>
    );
};

export default CreateTaskForm;