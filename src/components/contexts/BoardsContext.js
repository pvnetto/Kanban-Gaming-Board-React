import React from 'react';

const BoardsContext = React.createContext({});

export const BoardsProvider = BoardsContext.Provider;
export const BoardsConsumer = BoardsContext.Consumer;

export default BoardsContext;
