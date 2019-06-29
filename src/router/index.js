import React from 'react';
import Loadable from 'react-loadable';

const loadingComponent = ({ error, pastDelay }) => {
  if (error) {
    return <div>Error!</div>
  } else if (pastDelay) {
    return <div />
  } else {
    return null;
  }
};

const routers = [
  {
    name: '/',
    path: '/',
    exact: true,
    component: Loadable({
      loader: () => import('../pages/Home/index.js'),
      loading: loadingComponent,
      delay: 300,
    }),
  },
  {
    name: 'articles',
    path: '/articles',
    exact: true,
    component: Loadable({
      loader: () => import('../pages/Articles/index.js'),
      loading: loadingComponent,
      delay: 300,
    }),
  },
  {
    name: 'articleDetail',
    path: '/articleDetail',
    exact: true,
    component: Loadable({
      loader: () => import('../pages/Articles/index.js'),
      loading: loadingComponent,
      delay: 300,
    }),
  },
  {
    name: 'archive',
    path: '/archive',
    exact: true,
    component: Loadable({
      loader: () => import("../pages/Archive/index.js"),
      loading: loadingComponent,
      delay: 300,
    }),
  },
  {
    name: 'project',
    path: '/project',
    exact: true,
    component: Loadable({
      loader: () => import("../pages/Project/index.js"),
      loading: loadingComponent,
      delay: 300,
    }),
  },
  {
    name: 'message',
    path: '/message',
    exact: true,
    component: Loadable({
      loader: () => import("../pages/Message/index.js"),
      loading: loadingComponent,
      delay: 300,
    }),
  },
  {
    name: 'about',
    path: '/about',
    exact: true,
    component: Loadable({
      loader: () => import("../pages/About/index.js"),
      loading: loadingComponent,
      delay: 300,
    }),
  }
]

export default routers;