import React from 'react'
import { createRoot } from 'react-dom/client'
import { fetcher } from './utils/request'
import { SWRConfig } from 'swr'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { genRouteObjects, routes } from './routes'
import App from './App'
import '@/index.scss'
import localforage from 'localforage'

const root = document.getElementById('root')

void (async () => {
  try {
    // await localforage.setDriver(localforage.LOCALSTORAGE)
    localforage.config({ name: 'host-app' })
  } catch (error) {
    console.log(error)
  }
})()

if (root != null) {
  createRoot(root).render(
    <SWRConfig value={{ fetcher }}>
      <App>
        <RouterProvider router={createBrowserRouter(genRouteObjects(routes))}></RouterProvider>
      </App>
    </SWRConfig>
  )
}
