import React from 'react';

const ProjectsContext = React.createContext({});

export const ProjectsProvider = ProjectsContext.Provider;
export const ProjectsConsumer = ProjectsContext.Consumer;

export default ProjectsContext;
