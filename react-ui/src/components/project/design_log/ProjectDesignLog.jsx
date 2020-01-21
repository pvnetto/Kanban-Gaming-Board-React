import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { faPlusSquare, faPencilRuler } from '@fortawesome/free-solid-svg-icons';

import ModalBase from '../../utils/ModalBase';
import SectionNavbar from '../../layout/section/SectionNavbar';
import SectionNavbarButton from '../../layout/section/SectionNavbarButton';
import DesignLogItem from './DesignLogItem';
import DesignLogForm from './DesignLogForm';


const ProjectDesignLog = () => {

    const [showModal, setShowModal] = useState(false);
    const [logs, setLogs] = useState([]);

    const firebaseClient = useSelector(state => state.auth.firebaseClient);
    const currentProject = useSelector(state => state.boards.currentProject);

    useEffect(() => {
        if (!currentProject) return;

        const listenToLogs = async () => {
            return await firebaseClient.designLogService.setDesignLogListener(currentProject.id, (snapshotLogs) => {
                setLogs([...snapshotLogs]);
            });
        }

        let listener;
        listenToLogs().then(newListener => listener = newListener);

    // Cleanup function. Calling a listener unsubscribes it from firestore.
    return () => {
        listener && listener();
    }
}, [currentProject]);

const addLog = async (title, content) => {
    let newLog = {
        title,
        content
    };

    newLog = await firebaseClient.designLogService.insertDesignLog(currentProject.id, newLog);
}

const removeLog = async (logId) => {
    await firebaseClient.designLogService.removeDesignLog(currentProject.id, logId);
}

return (
    <Row noGutters={true}>

        <ModalBase title="Add Design Log" showModal={showModal} handleClose={() => setShowModal(false)}>
            <DesignLogForm addLog={addLog} />
        </ModalBase>

        <SectionNavbar title={"Design Logs"} icon={faPencilRuler}>
            <SectionNavbarButton onClick={() => setShowModal(true)} title={"Add Log"} icon={faPlusSquare} />
        </SectionNavbar>

        <Col xs={12} className="p-4 d-flex flex-column-reverse">
            {logs && logs.length > 0 ?
                logs.map((entry, idx) => <DesignLogItem key={entry.id} removeLog={removeLog} {...entry} index={idx} />) :
                "No log entries found :("}
        </Col>
    </Row>
);
};

export default ProjectDesignLog;