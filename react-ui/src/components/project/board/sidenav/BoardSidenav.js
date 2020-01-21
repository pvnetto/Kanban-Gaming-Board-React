import React from 'react';
import PropTypes from 'prop-types';
import { faGamepad, faCode, faMusic, faPencilAlt, faBug, faPalette, faPoll, faPencilRuler } from '@fortawesome/free-solid-svg-icons';

import Sidenav from '../../../layout/sidenav';
import SidenavButton from '../../../layout/sidenav/button';
import { allCategories } from '../../../utils/types/Categories';

import styles from './board-sidenav.module.scss';

const BoardSidenav = ({ onClick, activeCategory }) => {

    const BoardSidenavBtn = ({ category, icon }) => (
        <SidenavButton
            className={`${styles.navLink}`}
            title={category} icon={icon}
            isExpanded={true}
            active={activeCategory === category}
            onClick={() => onClick(category)} />
    )

    return (
        // Placing a fixed element inside an absolute makes it stick to the element, instead of the window 
        <div className="position-absolute">
            <Sidenav className={`${styles.boardSidenav} bg-dark border-2 border-light`}>
                <ul className="navbar-nav w-100 d-flex flex-column justify-content-start">
                    <BoardSidenavBtn category={allCategories.ALL} icon={faGamepad} />
                    <BoardSidenavBtn category={allCategories.ART} icon={faPalette} />
                    <BoardSidenavBtn category={allCategories.BUGS} icon={faBug} />
                    <BoardSidenavBtn category={allCategories.DESIGN} icon={faPencilRuler} />
                    <BoardSidenavBtn category={allCategories.MARKETING} icon={faPoll} />
                    <BoardSidenavBtn category={allCategories.PROGRAMMING} icon={faCode} />
                    <BoardSidenavBtn category={allCategories.SOUND} icon={faMusic} />
                    <BoardSidenavBtn category={allCategories.WRITING} icon={faPencilAlt} />
                </ul>
            </Sidenav>
        </div>
    );
};

BoardSidenav.propTypes = {
    onClick: PropTypes.func.isRequired,
    activeCategory: PropTypes.oneOf(Object.values(allCategories)).isRequired,
}

export default BoardSidenav;