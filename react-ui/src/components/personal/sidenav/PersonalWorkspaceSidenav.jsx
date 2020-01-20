import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { faPlusSquare, faGamepad, faCogs } from '@fortawesome/free-solid-svg-icons';

import ProjectCreateForm from '../../layout/forms/ProjectCreateForm';
import ModalBase from '../../utils/ModalBase';
import WorkspaceSidenav from '../../layout/sidenav/workspace';
import SidenavLink from '../../layout/sidenav/link';
import SidenavButton from '../../layout/sidenav/button';

const PersonalWorkspaceSidenav = ({ url, onExpand }) => {
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
            <SidenavLink title={"MY DASHBOARD"} icon={faGamepad} url={`${url}`} link={"/dashboard"} isExpanded={isExpanded} />
            <SidenavLink title={"MANAGEMENT"} icon={faCogs} url={`${url}`} link={"/management"} isExpanded={isExpanded} />
            <hr className="m-1 border border-light" />
        </>
    )

    return (
        <>
            <ModalBase showModal={showModal} handleClose={handleCloseModal} title="Create Project">
                <ProjectCreateForm />
            </ModalBase>

            <WorkspaceSidenav options={[]} onExpand={onExpand}>
                {renderSidenavButtons}
            </WorkspaceSidenav>
        </>
    );
}

PersonalWorkspaceSidenav.propTypes = {
    url: PropTypes.string.isRequired,
    onExpand: PropTypes.func.isRequired,
}

export default PersonalWorkspaceSidenav;