import React from 'react';

import BoardContainer from '../board/BoardContainer';
import TaskStatus from '../../commons/TaskStatus';

const ProjectBacklog = (props) => {
    return (
        <BoardContainer title={"Backlog"} boardId={props.match.params.boardId} {...props}>
            {[TaskStatus.BACKLOG]}
        </BoardContainer>
    );
};

export default ProjectBacklog;