import React, { useState, useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

import ModalBase from '../../commons/ModalBase';
import SectionNavbar from '../../commons/SectionNavbar';
import DesignLogItem from './DesignLogItem';
import SectionNavbarButton from '../../commons/SectionNavbarButton';
import DesignLogForm from './DesignLogForm';
import { mockLogs } from '../../../mock';
import UserContext from '../../contexts/UserContext';

const ProjectDesignLog = () => {

    let [showModal, setShowModal] = useState(false);
    let [logs, setLogs] = useState([...mockLogs]);

    const { name } = useContext(UserContext);

    const addLog = (title, content) => {
        let newLog = {
            id: logs.length,
            title,
            content,
            date: new Date(),
            author: name
        };

        setLogs([...logs, newLog]);
        // setAlert({ show: true, msg: `Log #${newLog.id} was added.` })
    }

    const removeLog = (id) => {
        const logsCopy = [...logs];
        const logToRemove = logsCopy.findIndex(log => log.id === id);
        logsCopy.splice(logToRemove, 1);

        setLogs([...logsCopy]);
    }

    return (
        <Row noGutters={true}>

            <ModalBase title="Add Design Log" showModal={showModal} handleClose={() => setShowModal(false)}>
                <DesignLogForm addLog={addLog} />
            </ModalBase>

            <SectionNavbar sectionTitle={"Design Logs"} sectionIcon={"DS"}>
                <SectionNavbarButton onClick={() => setShowModal(true)} btnTitle={"Add Log"} btnIcon={faPlusSquare} />
            </SectionNavbar>

            <Col xs={12} className="p-4 d-flex flex-column-reverse">
                {logs && logs.length > 0 ?
                    logs.map((entry) => <DesignLogItem key={entry.id} removeLog={removeLog} {...entry} />) :
                    "No log entries found :("}
            </Col>
        </Row>
    );
};

export default ProjectDesignLog;