import React from 'react'
import lazy from '@/components/lazy/lazy'
import { Navigate, type RouteObject } from 'react-router-dom'

export type RouteItem = Omit<RouteObject, 'children'> & {
  name?: string
  icon?: string
  redirect?: string
  href?: string
  notCache?: boolean
  hideInMenu?: boolean
  children?: RouteItem[]
}

export const routes: RouteItem[] = [
  {
    element: lazy(async () => await import('@/layouts/basic')),
    hideInMenu: true,
    children: [
      { path: '/', hideInMenu: true, redirect: '/home' },
      {
        path: '/home',
        name: '首页',
        element: lazy(async () => await import('@/pages/home'))
      },
      {
        path: '/service-center',
        name: '业务平台',
        element: lazy(async () => await import('@/pages/service-center'))
      },
      {
        path: '/workbench',
        name: '定义平台',
        element: lazy(async () => await import('@/pages/workbench'))
      },
      {
        path: '/database',
        name: '数据平台',
        element: lazy(async () => await import('@/pages/database'))
      },
      {
        path: '/visual',
        name: '态势平台',
        element: lazy(async () => await import('@/pages/visual'))
      },
      {
        path: '/develop',
        name: '开发平台',
        element: lazy(async () => await import('@/pages/develop'))
      }
    ]
  }
]

export const genRouteObjects = (routes: RouteItem[]): RouteObject[] => {
  return routes
    .filter((route) => route.href == null)
    .map((route) => {
      const routeObject = { ...route }
      if (routeObject.redirect != null) {
        routeObject.element = <Navigate to={routeObject.redirect} />
      }
      if (routeObject.children != null) {
        routeObject.children = genRouteObjects(routeObject.children)
      }
      return routeObject as RouteObject
    })
}
