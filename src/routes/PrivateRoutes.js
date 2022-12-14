import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import SLUGS from 'resources/slugs';
import LoadingComponent from 'components/loading';

const LeaguesComponent = lazy(() => import('./leagues'));
const DecksComponent = lazy(() => import('./decks'));

function PrivateRoutes() {
    return (
        <Suspense fallback={<LoadingComponent loading />}>
            <Switch>
                <Route exact path={SLUGS.leagues} component={LeaguesComponent} />
                <Route exact path={SLUGS.decks} component={DecksComponent} />
                <Route exact path={SLUGS.settings} render={() => <div>settings</div>} />
                <Redirect to={SLUGS.leagues} />
            </Switch>
        </Suspense>
    );
}

export default PrivateRoutes;
