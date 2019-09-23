import React from 'react';

import BoardContainer from '../commons/boards/BoardContainer';
import TaskStatus from '../../commons/TaskStatus';

const ProjectBacklog = (props) => {
    return (
        <BoardContainer title={"Backlog"} boardId={props.match.params.boardId} boards={props.boards}>
            {[TaskStatus.BACKLOG]}
        </BoardContainer>
    );
};

export default ProjectBacklog;