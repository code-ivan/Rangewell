// @flow
import { App, Home, Blog, BlogIndex, BlogArticle, NotFound, Landing, SinglePage } from './modules'

const routes = [
  {
    component: App,
    routes: [
      {
        path: '/',
        component: Home,
        exact: true
      },
      {
        path: '/blog',
        component: Blog,
        routes: [
          {
            path: '/blog',
            component: BlogIndex,
            exact: true
          },
          {
            path: '/blog/:slug',
            component: BlogArticle,
            exact: true
          },
          {
            component: NotFound
          }
        ]
      },
      {
        path: '/landing',
        component: Landing,
        exact: true
      },
      {
        path: '/landing/:slug',
        component: SinglePage,
        exact: true
      },
      {
        component: NotFound
      }
    ]
  }
]

export default routes
