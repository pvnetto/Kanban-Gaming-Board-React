import React from 'react';
import SectionSidenav from '../commons/SectionSidenav';
import SectionNavbar from '../commons/SectionNavbar';
import SidenavButton from '../commons/SidenavButton';
import BoardColumn from './BoardColumn';

import { columnTypes } from './ColumnTypes';

import { faGamepad } from '@fortawesome/free-solid-svg-icons';

const sidenavBtns = [
    <SidenavButton btnTitle={"ALL ITEMS"} btnIcon={faGamepad} />,
    <SidenavButton btnTitle={"PROGRAMMING"} btnIcon={faGamepad} />,
    <SidenavButton btnTitle={"ART"} btnIcon={faGamepad} />,
    <SidenavButton btnTitle={"DESIGN"} btnIcon={faGamepad} />,
    <SidenavButton btnTitle={"WRITING"} btnIcon={faGamepad} />,
    <SidenavButton btnTitle={"MARKETING"} btnIcon={faGamepad} />,
    <SidenavButton btnTitle={"SOUND"} btnIcon={faGamepad} />,
    <SidenavButton btnTitle={"BUGS"} btnIcon={faGamepad} />
];

const ProjectBoard = () => {
    return (
        <div className="row">
            <div className="col-12">
                <SectionNavbar sectionTitle={"Board"} sectionIcon={faGamepad} options={[]} />
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