import { routes, type RouteItem } from '@/routes'
import { Menu, type MenuProps } from 'antd'
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number]

const genMenuItems = (routes: RouteItem[]): MenuItem[] => {
  const items: MenuItem[] = []

  routes.forEach((route) => {
    let item: MenuItem = null
    if (route.path != null && route.name != null && route.hideInMenu !== true) {
      item = {
        key: route.path,
        label: route.name
      }
      items.push(item)
    }
    if (route.children != null && route.children.length > 0) {
      if (item != null) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        item.children = genMenuItems(route.children)
      } else {
        items.push(...genMenuItems(route.children))
      }
    }
  })

  return items
}

const BasicLayout: React.FC = () => {
  const navigate = useNavigate()

  const onMenuClick = (item: MenuItem): void => {
    item?.key != null && navigate(item.key as string)
  }

  return (
    <div className="w-full flex flex-col h-screen pt-12 box-border">
      <header className="w-full h-12 fixed top-0 left-0 bg-slate-900 shrink-0">HEADER</header>
      <div className="flex-1 pl-52">
        <div className="w-52 h-full box-border fixed top-12 left-0 overflow-y-auto shadow-md">
          <Menu
            style={{ width: 256 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            onClick={onMenuClick}
            items={genMenuItems(routes)}
          />
        </div>
        <div className="flex-1 box-border p-6 bg-gray-100">
          <div className="shadow box-border bg-white">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BasicLayout
