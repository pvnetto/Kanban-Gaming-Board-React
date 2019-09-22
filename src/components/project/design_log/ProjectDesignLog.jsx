import React from 'react';
import SectionNavbar from '../../commons/SectionNavbar';
import DesignLogItem from './DesignLogItem';
import { Row, Col } from 'react-bootstrap';

const ProjectDesignLog = (props) => {

    const entries = [
        {
            index: 0,
            title: "Why we should change everything.",
            content: "The reason we should change everything is because I want to change everything"
        }
    ]

    return (
        <Row noGutters={true}>
            <SectionNavbar sectionTitle={"Design Logs"} sectionIcon={"DS"} options={[]} />
            <Col xs={12} className="p-4 d-flex flex-row">
                {/* props.logEntries */}
                {entries ?
                    entries.map(entry => <DesignLogItem {...entry} />) : "No log entries found :("}
            </Col>
        </Row>
    );
};

export default ProjectDesignLog;