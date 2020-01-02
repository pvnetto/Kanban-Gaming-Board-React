import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjectsAction } from './project-actions-async';

const useLoadProjects = () => {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchProjectsAction(user.email));
        }
    }, [isAuthenticated]);

    return user;
};

export default useLoadProjects;