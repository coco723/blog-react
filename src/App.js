import React from 'react'
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routers from '@/router/index.js';
import Layout from '@/view/index';

const App = ({ history }) => {
  return (
    <Router history={history}>
      <Switch>
        <Layout>
          {routers.map((r, key) => (
            <Route
              component={r.component}
              exact={r.exact}
              key={key}
              path={r.path}
            />
          ))}
        </Layout>
      </Switch>
    </Router>
  )
}

App.propTypes = {
  history: PropTypes.object,
}

export default App;
