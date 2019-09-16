import React from 'react';
import SectionNavbar from '../commons/SectionNavbar';
import SectionContainer from '../commons/SectionContainer';
import UserMetrics from '../workspace/UserMetrics';

const ProjectDashboard = () => {

    return (
        <div className="row">
            <div className="col-12">
                {/* Section navbar */}
                <SectionNavbar sectionTitle={"My Dashboard"} sectionIcon={"DS"} items={[]} />

                <div className="col-12">
                    {/* Left dashboard section */}
                    <div className="col-6">
                        <div>
                            <i>PR</i>
                            <h3>{"Test Project"}</h3>
                            <p>{"Project description here"}</p>
                        </div>

                        <SectionContainer title={"General Info"} titleIcon={"GI"} items={[<p>{"General info about project"}</p>]} />
                    </div>

                    {/* Right dashboard section */}
                    <div className="col-6">
                        <SectionContainer title={"Metrics"} titleIcon={"MTR"} items={[<UserMetrics />]} />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProjectDashboard;