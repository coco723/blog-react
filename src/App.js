import React from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router';
import routers from './router/index';
import Layouts from './layouts/index';

const App = ({history}) => {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Layouts>
          {routers.map((v, key) => (
            <Route
              component={v.component}
              exact={v.exact}
              key={key}
              path={v.path}
            />
          ))}
        </Layouts>
      </Switch>
    </ConnectedRouter>
  )
}

App.propTypes = {
  history: PropTypes.object,
}

export default App;
