declare module '*.jpg'
declare module '*.png'
declare module '*.svg'

// add __MICRO_APP_BASE_ROUTE__ attribute for window
declare interface Window {
  __MICRO_APP_BASE_ROUTE__: string
}
