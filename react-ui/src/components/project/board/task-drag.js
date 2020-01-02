const filteredToRegularIndex = (tasks, filtered, idx, type) => {
    const selectedTask = filtered[type][idx];
    if (!selectedTask) {
        return idx;
    }

    const regularIdx = tasks[type].findIndex(task => task.id === selectedTask.id);
    return regularIdx != -1 ? regularIdx : idx;
};

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination, sourceIdx, destinationIdx) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(sourceIdx, 1);

    removed.status = droppableDestination.droppableId;

    destClone.splice(destinationIdx, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

export const handleDragEnd = (result, tasks, filtered, updateTasks, dispatch) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
        return;
    }

    const newTasks = Object.assign({}, tasks);
    const sourceIdx = filteredToRegularIndex(tasks, filtered, source.index, source.droppableId);
    const destinationIdx = filteredToRegularIndex(tasks, filtered, destination.index, destination.droppableId);

    if (source.droppableId === destination.droppableId) {
        const reorderedItems = reorder(newTasks[source.droppableId], sourceIdx, destinationIdx);
        newTasks[source.droppableId] = reorderedItems;
    }
    else {
        const movedTasks = move(newTasks[source.droppableId], newTasks[destination.droppableId], source, destination, sourceIdx, destinationIdx);
        newTasks[source.droppableId] = movedTasks[source.droppableId];
        newTasks[destination.droppableId] = movedTasks[destination.droppableId];
    }

    dispatch(updateTasks(newTasks));
}