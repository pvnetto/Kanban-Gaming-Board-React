
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
            return "BL";
        case columnTypes.PLANNED:
            return "P";
        case columnTypes.IN_PROGRESS:
            return "IP";
        case columnTypes.TESTING:
            return "T";
        case columnTypes.COMPLETED:
            return "CP";
        default:
            return "ICON NOT FOUND";
    }
};

exports.columnTypes = columnTypes;
exports.columnIcon = columnIcon;