import React from 'react';
import SectionContainer from '../commons/SectionContainer';

const UserManagement = () => {
    const projectItems = [
        <ProjectItem />
    ];

    return (
        <div className="col-12">
            <div className="col-4">
                <SectionContainer title={"Your Projects"} titleIcon={"PRI"} items={projectItems} />
            </div>
        </div>
    );
};

export default UserManagement;