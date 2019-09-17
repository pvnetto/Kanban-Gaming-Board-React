import React from 'react';

const ProjectItem = () => {
    return (
        <a href="">
            <div className="p-3 d-flex flex-row align-items-center hover-bg-dark">
                <i className="mr-3">PRIcon</i>
                <div className="text-sm">
                    <p className="font-weight-bold">Project Name</p>
                    <p><i>D</i> This is the project description</p>
                </div>
            </div>
        </a>
    );
};

export default ProjectItem;