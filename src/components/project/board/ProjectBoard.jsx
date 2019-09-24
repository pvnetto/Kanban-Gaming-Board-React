import React, { useState } from 'react';

import BoardContainer from '../commons/boards/BoardContainer';
import TaskStatus from '../../commons/TaskStatus';

const ProjectBoard = (props) => {

    return (
        <BoardContainer title={"Boards"} boardId={props.match.params.boardId} {...props}>
            {[TaskStatus.PLANNED, TaskStatus.IN_PROGRESS, TaskStatus.TESTING, TaskStatus.COMPLETED]}
        </BoardContainer>
    );
};

export default ProjectBoard;