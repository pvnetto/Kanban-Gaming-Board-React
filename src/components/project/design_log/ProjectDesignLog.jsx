import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

import ModalBase from '../../commons/ModalBase';
import SectionNavbar from '../../commons/SectionNavbar';
import DesignLogItem from './DesignLogItem';
import SectionNavbarButton from '../../commons/SectionNavbarButton';
import DesignLogForm from './DesignLogForm';

const ProjectDesignLog = (props) => {

    let [showModal, setShowModal] = useState(false);

    return (
        <Row noGutters={true}>

            <ModalBase title="Add Design Log" showModal={showModal} handleClose={() => setShowModal(false)}>
                <DesignLogForm {...props} />
            </ModalBase>

            <SectionNavbar sectionTitle={"Design Logs"} sectionIcon={"DS"}>
                <SectionNavbarButton onClick={() => setShowModal(true)} btnTitle={"Add Log"} btnIcon={faPlusSquare} />
            </SectionNavbar>

            <Col xs={12} className="p-4 d-flex flex-column-reverse">
                {props.logEntries ?
                    props.logEntries.map(entry => <DesignLogItem {...entry} />) :
                    "No log entries found :("}
            </Col>
        </Row>
    );
};

export default ProjectDesignLog;