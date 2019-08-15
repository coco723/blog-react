import React from 'react';
import Loadable from 'react-loadable';

const loadingComponent = ({ error, pastDelay }) => {
  if (error) {
    return <div>404 Not Found</div>
  }
  if (pastDelay) {
    return <div />
  }
  return null;
} 

const config = [
  {
    name: 'articles',
    path: '/articles',
    exact: true,
    component: Loadable({
      loader: () => import('../components/Article/index'),
      loading: loadingComponent,
      delay: 300,
    }),
  },
];

export default config;
