import React from 'react';
import { faGamepad, faDiceD20 } from '@fortawesome/free-solid-svg-icons';

import SidenavButton from '../../commons/sidenav/SidenavButton';
import { allCategories } from '../../commons/Categories';

const BoardSidenav = ({ onClick, activeCategory }) => {

    const boardBtns = Object.values(allCategories).map((category, idx) => (
        <SidenavButton key={idx} title={category} icon={faGamepad}
            isExpanded={true} active={activeCategory === category}
            onClick={() => onClick(category)} />
    ));

    return (
        // Placing a fixed element inside an absolute makes it stick to the element, instead of the window 
        <div className="position-absolute">
            <div className="inner-sidenav bg-dark border-2 border-light">
                <ul className="navbar-nav w-100 d-flex flex-column justify-content-start">
                    {boardBtns}
                </ul>
            </div>
        </div>
    );
};

export default BoardSidenav;