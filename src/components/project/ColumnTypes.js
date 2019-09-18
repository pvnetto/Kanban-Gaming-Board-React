import { faDiceD20 } from '@fortawesome/free-solid-svg-icons';

const columnTypes = {
    BACKLOG: "Backlog",
    PLANNED: "Planned",
    IN_PROGRESS: "In Progress",
    TESTING: "Testing",
    COMPLETED: "Completed"
};

Object.freeze(columnTypes);

const columnIcon = (type) => {
    switch (type) {
        case columnIcon.BACKLOG:
            return faDiceD20;
        case columnTypes.PLANNED:
            return faDiceD20;
        case columnTypes.IN_PROGRESS:
            return faDiceD20;
        case columnTypes.TESTING:
            return faDiceD20;
        case columnTypes.COMPLETED:
            return faDiceD20;
        default:
            return faDiceD20;
    }
};

const columnBorder = (type) => {
    switch (type) {
        case columnIcon.BACKLOG:
            return 'border-gray';
        case columnTypes.PLANNED:
            return 'border-gray';
        case columnTypes.IN_PROGRESS:
            return 'border-blue';
        case columnTypes.TESTING:
            return 'border-red';
        case columnTypes.COMPLETED:
            return 'border-green';
        default:
            return 'border-gray';
    }
}

export { columnIcon, columnTypes, columnBorder };
// exports.columnTypes = columnTypes;
// exports.columnIcon = columnIcon;