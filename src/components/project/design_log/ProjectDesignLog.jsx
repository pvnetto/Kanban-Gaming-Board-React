import React from 'react';
import { Row, Col } from 'react-bootstrap';
import {faPlusSquare} from '@fortawesome/free-solid-svg-icons';

import SectionNavbar from '../../commons/SectionNavbar';
import DesignLogItem from './DesignLogItem';
import SectionNavbarButton from '../../commons/SectionNavbarButton';

const ProjectDesignLog = (props) => {

    return (
        <Row noGutters={true}>
            <SectionNavbar sectionTitle={"Design Logs"} sectionIcon={"DS"}>
                <SectionNavbarButton btnTitle={"Add Log"} btnIcon={faPlusSquare} />
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