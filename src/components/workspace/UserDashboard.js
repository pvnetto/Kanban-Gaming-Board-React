import React from 'react';
import ProjectItem from '../project/ProjectItem';
import UserMetrics from './UserMetrics';
import SectionContainer from '../commons/SectionContainer'

const UserDashboard = () => {
    const projectItems = [
        <ProjectItem />
    ];

    return (
        <div className="row">
            <div className="col-12">
                {/* Section navbar */}
                <SectionNavbar sectionTitle={"My Dashboard"} sectionIcon={"DS"} items={[]} />

                <div className="col-12">
                    {/* Left dashboard section */}
                    <div className="col-6">
                        <div>
                            <h3>Welcome, {"Username"}</h3>
                        </div>

                        <SectionContainer title={"Your Projects"} titleIcon={"PRI"} items={projectItems} />
                        <SectionContainer title={"Closed Projects"} titleIcon={"CPR"} items={projectItems} />
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

export default UserDashboard;