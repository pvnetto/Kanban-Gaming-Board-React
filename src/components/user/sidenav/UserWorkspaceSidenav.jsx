import React, { useState } from 'react';
import { faPlusSquare, faGamepad, faCogs } from '@fortawesome/free-solid-svg-icons';

import CreateProjectModal from './CreateProjectModal';
import Sidenav from '../../commons/sidenav/Sidenav';
import SidenavLink from '../../commons/sidenav/SidenavLink';
import SidenavButton from '../../commons/sidenav/SidenavButton';

const UserWorkspaceSidenav = (props) => {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const renderSidenavButtons = (isExpanded) => (
        <>
            <SidenavButton title={"CREATE PROJECT"} icon={faPlusSquare} onClick={handleOpenModal} isExpanded={isExpanded} />
            <SidenavLink title={"MY DASHBOARD"} icon={faGamepad} url={`${props.url}`} link={"/dashboard"} isExpanded={isExpanded} />
            <SidenavLink title={"MANAGEMENT"} icon={faCogs} url={`${props.url}`} link={"/management"} isExpanded={isExpanded} />
            <hr className="m-1 border border-light" />
        </>
    )

    return (
        <>
            <CreateProjectModal showModal={showModal} handleClose={handleCloseModal} addProject={props.addProject} />
            <Sidenav options={[]} onExpand={props.onExpand}>
                {renderSidenavButtons}
            </Sidenav>
        </>
    );
}

export default UserWorkspaceSidenav;