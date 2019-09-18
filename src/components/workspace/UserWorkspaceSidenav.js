import React, { useState } from 'react';
import { faPlusSquare, faGamepad, faCogs } from '@fortawesome/free-solid-svg-icons';
import CreateProjectModal from '../commons/CreateProjectModal';

import SidenavLink from '../commons/SidenavLink';
import SidenavButton from '../commons/SidenavButton';
import Sidenav from '../commons/Sidenav';

const UserWorkspaceSidenav = (props) => {
    const sidenavBtns = [
        <SidenavLink btnTitle={"MY DASHBOARD"} btnIcon={faGamepad} url={`${props.url}`} link={"/dashboard"} />,
        <SidenavLink btnTitle={"MANAGEMENT"} btnIcon={faCogs} url={`${props.url}`} link={"/management"} />
    ];

    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    return (
        <>
            <CreateProjectModal showModal={showModal} handleClose={handleCloseModal} />
            <Sidenav buttons={[<SidenavButton btnTitle={"CREATE PROJECT"} btnIcon={faPlusSquare} onClick={handleOpenModal} />, ...sidenavBtns]} options={[]} />
        </>
    );
}

export default UserWorkspaceSidenav;