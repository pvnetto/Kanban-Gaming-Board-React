import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { faPlusSquare, faPencilRuler } from '@fortawesome/free-solid-svg-icons';

import ModalBase from '../../commons/ModalBase';
import SectionNavbar from '../../commons/SectionNavbar';
import DesignLogItem from './DesignLogItem';
import SectionNavbarButton from '../../commons/SectionNavbarButton';
import DesignLogForm from './DesignLogForm';
import { useAuth0 } from '../../../auth0-wrapper';
import { useBoards } from '../../contexts/BoardsContext';

const ProjectDesignLog = () => {

    let [showModal, setShowModal] = useState(false);
    let [logs, setLogs] = useState([]);

    const { firebaseClient } = useAuth0();
    const { project } = useBoards();

    useEffect(() => {
        let listener = null;

        const listenToLogs = async () => {
            listener = await firebaseClient.designLogService.setDesignLogListener(project.id, (snapshotLogs) => {
                setLogs([...snapshotLogs]);
            });
        }

        listenToLogs();

        // Cleanup function. Calling a listener unsubscribes it from firestore.
        return () => {
            listener && listener();
        }
    }, []);

    const addLog = async (title, content) => {
        let newLog = {
            title,
            content
        };

        newLog = await firebaseClient.designLogService.insertDesignLog(project.id, newLog);
    }

    const removeLog = async (logId) => {
        await firebaseClient.designLogService.removeDesignLog(project.id, logId);
    }

    return (
        <Row noGutters={true}>

            <ModalBase title="Add Design Log" showModal={showModal} handleClose={() => setShowModal(false)}>
                <DesignLogForm addLog={addLog} />
            </ModalBase>

            <SectionNavbar sectionTitle={"Design Logs"} sectionIcon={faPencilRuler}>
                <SectionNavbarButton onClick={() => setShowModal(true)} btnTitle={"Add Log"} btnIcon={faPlusSquare} />
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