import React from 'react';
import SectionContainer from '../workspace/SectionContainer';
import ProjectEditForm from './ProjectEditForm';
import ProjectInviteForm from './ProjectInviteForm';

const ProjectManagement = () => {

    return (
        <div className="col-12">
            <div className="col-6">
                <SectionContainer title={"Edit Project"} titleIcon={"EPR"} items={[<ProjectEditForm />]} />
            </div>
            <div className="col-6">
                <SectionContainer title={"Management"} titleIcon={"MGMT"} items={[<ProjectInviteForm />, <button>Delete</button>]} />
            </div>
        </div>
    );
};

export default ProjectManagement;