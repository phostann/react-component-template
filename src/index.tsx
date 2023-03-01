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
    localforage.config({ name: 'react-component-app' })
  } catch (error) {
    console.log(error)
  }
})()

if (root != null) {
  createRoot(root).render(
    <SWRConfig value={{ fetcher }}>
      <App>
        <RouterProvider
          router={createBrowserRouter(genRouteObjects(routes), {
            basename: window.__MICRO_APP_BASE_ROUTE__ ?? '/'
          })}
        ></RouterProvider>
      </App>
    </SWRConfig>
  )
}
