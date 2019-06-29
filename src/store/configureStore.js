
import { compose, createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export const configureStore = (preloadedState) => {
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    reducer(history),
    preloadedState,
    composeEnhancer(applyMiddleware(routerMiddleware(history)))
  );

  if(module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(reducer(history));
    });
  }
  return store;
}