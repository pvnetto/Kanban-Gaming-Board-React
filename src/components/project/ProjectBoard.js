import React from 'react';
import SectionSidenav from './SectionSidenav';
import SidenavButton from './SidenavButton';
import BoardColumn from './BoardColumn';

import { columnTypes } from './BoardColumn';

const sidenavBtns = [
    <SidenavButton btnTitle={"ALL ITEMS"} btnIcon={"A"} />,
    <SidenavButton btnTitle={"PROGRAMMING"} btnIcon={"P"} />,
    <SidenavButton btnTitle={"ART"} btnIcon={"AR"} />,
    <SidenavButton btnTitle={"DESIGN"} btnIcon={"D"} />,
    <SidenavButton btnTitle={"WRITING"} btnIcon={"W"} />,
    <SidenavButton btnTitle={"MARKETING"} btnIcon={"M"} />,
    <SidenavButton btnTitle={"SOUND"} btnIcon={"S"} />,
    <SidenavButton btnTitle={"BUGS"} btnIcon={"B"} />
];

const ProjectBoard = () => {
    return (
        <div className="row">
            <div className="col-12">
                <SectionNavbar sectionTitle={"My Dashboard"} sectionIcon={"DS"} options={[]} />
                <SectionSidenav buttons={sidenavBtns} />

                <div className="col">
                    <div className="col-3">
                        <BoardColumn type={columnTypes.PLANNED} tasks={[]} />
                    </div>
                    <div className="col-3">
                        <BoardColumn type={columnTypes.IN_PROGRESS} tasks={[]} />
                    </div>
                    <div className="col-3">
                        <BoardColumn type={columnTypes.TESTING} tasks={[]} />
                    </div>
                    <div className="col-3">
                        <BoardColumn type={columnTypes.COMPLETED} tasks={[]} />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProjectBoard;