import React from 'react'
import './index.scss'

const Desktop: React.FC = () => {
  return (
    <div className={'box-border overflow-hidden flex content-container'}>
      <div className="w-fit h-full bg-primary box-border pb-3 pr-4 flex">
        <ul className="m-0 p-0 h-full w-32 box-border top-0 left-0 bg-primary overflow-x-hidden overflow-y-auto pt-11">
          <li
            className={`list-none text-sm box-border w-full h-10 flex items-center px-6 cursor-pointer level-1-nav active`}
          >
            耗材管理
            <div className="absolute w-3 h-3 -top-3 right-0 overflow-hidden corner above"></div>
            <div className="absolute w-3 h-3 -bottom-3 right-0 overflow-hidden corner below"></div>
          </li>
        </ul>
        <ul className="m-0 p-0 w-40 h-full  box-border left-32 top-0 bg-white overflow-x-hidden overflow-y-auto py-11 px-4 flex flex-wrap justify-between content-start rounded-xl">
          <li className="list-none w-12 cursor-pointer relative level-2-nav mb-3 active">
            <div className="w-12 h-12 bg-yellow-500 z-10 relative"></div>
            <div className="mt-3 text-xs leading-4 text-center">仓库管理</div>
          </li>
          <li className="list-none w-12 cursor-pointer relative level-2-nav mb-3">
            <div className="w-12 h-12 bg-yellow-500 z-10 relative"></div>
            <div className="mt-3 text-xs leading-4 text-center">仓库管理</div>
          </li>
          <li className="list-none w-12 cursor-pointer relative level-2-nav mb-3">
            <div className="w-12 h-12 bg-yellow-500 z-10 relative"></div>
            <div className="mt-3 text-xs leading-4 text-center">仓库管理</div>
          </li>
          <li className="list-none w-12 cursor-pointer relative level-2-nav mb-3">
            <div className="w-12 h-12 bg-yellow-500 z-10 relative"></div>
            <div className="mt-3 text-xs leading-4 text-center">仓库管理</div>
          </li>
        </ul>
      </div>
      <div
        className="h-full flex-1 box-border p-4 bg-zinc-100 overflow-x-hidden overflow-y-auto"
        id="scroll-container"
      >
        <div>render the content of the child application</div>
      </div>
    </div>
  )
}

export default Desktop
