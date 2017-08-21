// @flow
import { App, Home, Blog, BlogIndex, BlogArticle, NotFound, Landing } from './modules'

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
        exact: true,
        routes: [
          {
            path: '/landing/:slug',
            component: BlogArticle,
            exact: true
          }
        ]
      },
      {
        component: NotFound
      }
    ]
  }
]

export default routes
