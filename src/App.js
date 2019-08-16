import React from 'react'
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from "react-router";
import routers from './router/index.js';
import Layout from './view/index';

const App = ({ history }) => {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Layout>
          {routers.map((r, key) => (
            <Route
              component={r.component}
              exact={!!r.exact}
              key={key}
              path={r.path}
            />
          ))}
        </Layout>
      </Switch>
    </ConnectedRouter>
  )
}

App.propTypes = {
  history: PropTypes.object,
}

export default App;
