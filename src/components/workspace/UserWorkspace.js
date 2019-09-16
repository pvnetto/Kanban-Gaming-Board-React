import React from 'react';
import UserDashboard from './UserDashboard';
import SidenavButton from './SidenavButton';
import Sidenav from './Sidenav';
import NavigationBar from './NavigationBar';

const UserWorkspace = () => {
    const sidenavBtns = [
        <SidenavButton btnTitle={"CREATE PROJECT"} btnIcon={"+"} />,
        <SidenavButton btnTitle={"MY DASHBOARD"} btnIcon={"DS"} />,
        <SidenavButton btnTitle={"MANAGEMENT"} btnIcon={"M"} />
    ];


    return (
        <div className="container-fluid">
            <Sidenav buttons={sidenavBtns} options={[]} />
            <NavigationBar />

            {/* Switch between difference sections, maybe use higher order components to render current section */}
            <UserDashboard />
        </div>
    );
};

export default UserWorkspace;