import React from 'react';
import SectionNavbar from '../commons/SectionNavbar';
import DesignLogItem from './DesignLogItem';


const ProjectDesignLog = (props) => {

    return (
        <div className="row">
            <SectionNavbar sectionTitle={"My Dashboard"} sectionIcon={"DS"} options={[]} />

            <div className="col-12">
                {props.logEntries ?
                    props.logEntries.map(logEntry => <DesignLogItem {...logEntry} />)
                    : "No log entries found :("}
            </div>
        </div>
    );
};

export default ProjectDesignLog;