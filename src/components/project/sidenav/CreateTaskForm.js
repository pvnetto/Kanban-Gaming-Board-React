import React, { useState, useEffect, useContext } from 'react';
import { Form, Button, Col } from 'react-bootstrap';

import { categories } from '../../commons/Categories';
import BoardsContext, { useBoards } from '../../contexts/BoardsContext';
import { useTasks } from '../../contexts/TasksContext';

const CreateTaskForm = () => {

    const backlogId = '-100';

    let [boardId, setBoardId] = useState(backlogId);
    let [name, setName] = useState("");
    let [description, setDescription] = useState("");
    let [category, setCategory] = useState(categories.ART);

    let { boards } = useBoards();
    let { addTaskToBoard, addTaskToBacklog } = useTasks();

    const defaultBoard = boards[0] ? boards[0].title : '';

    useEffect(() => {
        setBoardId({ ...defaultBoard });
    }, []);

    const onClick = () => {
        if (boardId === backlogId) {
            addTaskToBacklog(name, description, category);
        }
        else {
            addTaskToBoard(boardId, name, description, category);
        }

        // Resetting form
        setBoardId({ ...defaultBoard });
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
                    <Form.Control column="true" as="select" value={boardId} onChange={(e) => setBoardId(e.target.value)}>
                        <option value={backlogId}></option>
                        {boards.map((board, i) =>
                            <option value={board.id} key={i}>{board.title}</option>
                        )}
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