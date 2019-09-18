import React from 'react';
import SectionNavbar from '../commons/SectionNavbar';
import DesignLogItem from './DesignLogItem';
import { Row, Col } from 'react-bootstrap';


const ProjectDesignLog = (props) => {

    return (
        <Row noGutters={true}>
            <SectionNavbar sectionTitle={"Design Logs"} sectionIcon={"DS"} options={[]} />
            <Col xs={12} className="p-4">
                {props.logEntries ?
                    props.logEntries.map(logEntry => <DesignLogItem {...logEntry} />)
                    : "No log entries found :("}
            </Col>
        </Row>
    );
};

export default ProjectDesignLog;