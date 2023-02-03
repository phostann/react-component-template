import React from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.scss'
import { fetcher } from './utils/request'
import { SWRConfig } from 'swr'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { genRouteObjects, routes } from './routes'
import App from './App'

const root = document.getElementById('root')

if (root != null) {
  createRoot(root).render(
    <SWRConfig value={{ fetcher }}>
      <App>
        <RouterProvider router={createBrowserRouter(genRouteObjects(routes))}></RouterProvider>
      </App>
    </SWRConfig>
  )
}
