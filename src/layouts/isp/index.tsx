import React from 'react'
import { Outlet } from 'react-router-dom'

const BaseLayout: React.FC = () => {
  return (
    <div className="w-screen h-screen flex overflow-x-hidden overflow-y-auto bg-orange-200">
      <header>顶部</header>
      <Outlet></Outlet>
    </div>
  )
}

export default BaseLayout
