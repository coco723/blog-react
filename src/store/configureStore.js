import { applyMiddleware, compose, createStore } from "redux";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import createRootReducer from './reducers';

export const history = createBrowserHistory();

export default function configureStore(preloadedState) {
  debugger
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composeEnhancer(applyMiddleware(routerMiddleware(history))),
  );

  if (module.hot) {
    // enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createRootReducer(history));
    });
  }

  return store;
}
