import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import LoginPage from './components/login/LoginPage';
import UserWorkspace from './components/user/UserWorkspace';
import ProjectWorkspace from './components/project/ProjectWorkspace';
import ErrorPage from './components/commons/ErrorPage';
import PageAlert from './components/commons/PageAlert';
import LoginRedirect from './components/login/LoginRedirect';

import { useAuth0 } from './auth0-wrapper';
import { ProjectsProvider } from './components/contexts/ProjectContext';
import FullPageSpinner from './components/commons/FullPageSpinner';
import LogoutRedirect from './components/login/LogoutRedirect';


const AppRouter = () => {

    let [alert, setAlert] = useState({ show: false, msg: "" });

    const { loading, isRenewingAuth } = useAuth0();

    return (
        <BrowserRouter>
            <PageAlert {...alert} onClose={() => setAlert({ show: false, msg: "" })} />

            {loading || isRenewingAuth ? <FullPageSpinner /> : null}
            {isRenewingAuth ? null :
                <Switch>
                    <Route exact path="/" component={LoginPage}>
                        <Redirect to="/login" />
                    </Route>
                    <Route exact path="/login" component={LoginPage} />
                    <Route path="/redirect" component={LoginRedirect} />

                    <Route exact path="/logout" component={LogoutRedirect} />

                    <ProjectsProvider>
                        <Route path="/workspace" component={UserWorkspace} />
                        <Route path="/project/:projectId" render={(routeProps) => <ProjectWorkspace {...routeProps} />} />
                    </ ProjectsProvider>

                    <Route component={ErrorPage} />
                </Switch>
            }
        </BrowserRouter>
    );
};

export default AppRouter;