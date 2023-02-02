import microApp from '@micro-zoe/micro-app'
import { notification } from 'antd'
import React, { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { SWRConfig } from 'swr'
import { genRouteObjects, routes } from './routes'
import { fetcher } from './utils/request'

microApp.start()

const App: React.FC = () => {
  // 通知配置
  useEffect(() => {
    notification.config({
      maxCount: 3
    })
  }, [])

  return (
    <SWRConfig value={{ fetcher }}>
      <RouterProvider router={createBrowserRouter(genRouteObjects(routes))}></RouterProvider>
    </SWRConfig>
  )
}

export default App
