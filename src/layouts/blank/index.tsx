import React, { type FC } from 'react'
import { Outlet } from 'react-router-dom'

const Blank: FC = () => {
  return (
    <>
      <Outlet></Outlet>
    </>
  )
}

export default Blank
