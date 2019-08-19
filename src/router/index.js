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
      name: '/',
      path: '/',
      exact: true,
      component: Loadable({
        loader: () => import('../components/Home/index'),
        loading: loadingComponent,
        delay: 300,
      }),
    },
    {
      name: 'articles',
      path: '/articles',
      exact: true,
      component: Loadable({
        loader: () => import('../pages/Article/index'),
        loading: loadingComponent,
        delay: 300,
      }),
    },
    {
      name: 'articleDetail',
      path: '/article/:id',
      exact: true,
      component: Loadable({
        loader: () => import('../pages/Article/article'),
        loading: loadingComponent,
        delay: 300,
      }),
    },
    {
      name: 'archive',
      path: '/archive',
      exact: true,
      component: Loadable({
        loader: () => import('../pages/Archive/index'),
        loading: loadingComponent,
        delay: 300,
      }),
    },
    {
      name: 'timeLine',
      path: '/timeLine',
      exact: true,
      component: Loadable({
        loader: () => import('../pages/TimeLine/index'),
        loading: loadingComponent,
        delay: 300,
      }),
    },
    {
      name: 'message',
      path: '/message',
      exact: true,
      component: Loadable({
        loader: () => import('../pages/Message/index'),
        loading: loadingComponent,
        delay: 300,
      }),
    },
    {
      name: 'project',
      path: '/project',
      exact: true,
      component: Loadable({
        loader: () => import('../pages/Project/index'),
        loading: loadingComponent,
        delay: 300,
      }),
    },
];

export default config;
