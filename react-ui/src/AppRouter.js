import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import LoginPage from './components/login/LoginPage';
import UserWorkspace from './components/user/UserWorkspace';
import ProjectWorkspace from './components/project/ProjectWorkspace';
import ErrorPage from './components/commons/ErrorPage';
import PageAlert from './components/commons/PageAlert';
import LoginRedirect from './components/login/LoginRedirect';

import FullPageSpinner from './components/commons/spinners/FullPageSpinner';
import LogoutRedirect from './components/login/LogoutRedirect';


const AppRouter = () => {

    let [alert, setAlert] = useState({ show: false, msg: "" });

    const isPending = useSelector(state => state.auth.isPending);

    return (
        <BrowserRouter>
            <PageAlert {...alert} onClose={() => setAlert({ show: false, msg: "" })} />

            {isPending ? <FullPageSpinner /> : null}
            {isPending ? null :
                <Switch>
                    <Route exact path="/" component={LoginPage}>
                        <Redirect to="/login" />
                    </Route>
                    <Route exact path="/login" component={LoginPage} />
                    <Route path="/redirect" component={LoginRedirect} />

                    <Route exact path="/logout" component={LogoutRedirect} />

                    <Route path="/workspace" component={UserWorkspace} />
                    <Route path="/project/:projectId" component={ProjectWorkspace} />

                    <Route component={ErrorPage} />
                </Switch>
            }
        </BrowserRouter>
    );
};

export default AppRouter;