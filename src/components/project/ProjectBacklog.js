import React from 'react';
import { columnTypes } from './BoardColumn';
import SectionNavbar from './SectionNavbar';
import SectionSidenav from './SectionSidenav';

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

const ProjectBacklog = () => {
    return (
        <div className="row">
            <div className="col-12">
                <SectionNavbar sectionTitle={"My Dashboard"} sectionIcon={"DS"} options={[]} />
                <SectionSidenav buttons={sidenavBtns} />

                <div className="col">
                    <div className="col-12">
                        <BoardColumn type={columnTypes.BACKLOG} tasks={[]} />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProjectBacklog;