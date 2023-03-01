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
    element: lazy(async () => await import('@/layouts/blank')),
    hideInMenu: true,
    children: [
      { path: '/', hideInMenu: true, redirect: '/home' },
      {
        path: '/home',
        name: '首页',
        element: lazy(async () => await import('@/pages/home'))
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
