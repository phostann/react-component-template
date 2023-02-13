import { CloseOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons'
import BScroll from '@better-scroll/core'
import MouseWheel from '@better-scroll/mouse-wheel'
import { Dropdown } from 'antd'
import localforage from 'localforage'
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './index.scss'

BScroll.use(MouseWheel)

const routesHistory = 'routes-history'

interface RouteHistory {
  pathname: string
  search?: string
}

const Desktop: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null)
  const scrollRef = React.useRef<BScroll>()
  const location = useLocation()

  const [historyRoutes, setHistoryRoutes] = React.useState<RouteHistory[]>([])
  console.log(historyRoutes)

  const onScrollToLeft = (): void => {
    if (ref.current != null) {
      const rect = ref.current.getBoundingClientRect()
      const half = rect.width / 2
      scrollRef.current?.scrollBy(-half, 0, 300)
    }
  }

  const onScrollToRight = (): void => {
    if (ref.current != null) {
      const rect = ref.current.getBoundingClientRect()
      const half = rect.width / 2
      scrollRef.current?.scrollBy(half, 0, 300)
    }
  }

  useEffect(() => {
    if (ref.current != null) {
      scrollRef.current = new BScroll(ref.current, {
        scrollX: true,
        scrollY: false,
        mouseWheel: {
          speed: 20,
          invert: false,
          easeTime: 300
        }
      })
    }

    return () => {
      scrollRef.current?.destroy()
    }
  }, [])

  useEffect(() => {
    void (async () => {
      try {
        const routes = (await localforage.getItem<RouteHistory[]>(routesHistory)) ?? []
        setHistoryRoutes(routes)
      } catch (e) {
        console.log(e)
      }
    })()
  }, [])

  useEffect(() => {
    const { pathname, search } = location
    void (async () => {
      try {
        let routes = (await localforage.getItem<RouteHistory[]>(routesHistory)) ?? []
        routes = routes.filter((route) => route.pathname !== pathname)
        routes.push({ pathname, search })
        setHistoryRoutes(routes)
        await localforage.setItem('routes', routes)
      } catch (e) {
        console.log(e)
      }
    })()
  }, [location])

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
      <div className="w-full h-full flex-1 flex flex-col overflow-x-hidden">
        <div className="w-full h-11 bg-zinc-200 overflow-hidden relative hide-scrollbar" ref={ref}>
          <div className="w-fit pl-8 pr-14 h-full flex items-center relative">
            {Array.from(new Array(10)).map((_, index) => (
              <div
                className={`h-8 bg-white px-2 flex items-center text-xs shadow cursor-pointer text-zinc-600 ${
                  index === 0 ? '' : 'ml-2'
                }`}
                key={index}
              >
                <div className="w-3 h-3 rounded-full bg-zinc-300"></div>
                <div className="w-auto whitespace-nowrap ml-3 hover:text-zinc-500 transition-colors duration-75">
                  首页 {index}
                </div>
                <CloseOutlined className="ml-3 hover:text-zinc-500 transition-colors duration-75"></CloseOutlined>
              </div>
            ))}
          </div>
          <button
            className="bg-white w-6 h-full flex justify-center items-center absolute left-0 top-0 border-none shadow cursor-pointer"
            onClick={onScrollToLeft}
          >
            <LeftOutlined></LeftOutlined>
          </button>
          <button
            className="bg-white w-6 h-full flex justify-center items-center absolute right-6 top-0 border-none shadow cursor-pointer"
            onClick={onScrollToRight}
          >
            <RightOutlined></RightOutlined>
          </button>
          <button className="bg-white w-6 h-full flex justify-center items-center absolute right-0 top-0 border-none shadow cursor-pointer">
            <Dropdown
              trigger={['click']}
              menu={{
                items: [
                  { key: '1', label: '关闭所有' },
                  { key: '2', label: '关闭其他' }
                ]
              }}
            >
              <CloseOutlined></CloseOutlined>
            </Dropdown>
          </button>
        </div>

        <div
          className="flex-1 box-border p-4 bg-zinc-100 overflow-x-hidden overflow-y-auto"
          id="scroll-container"
        ></div>
      </div>
    </div>
  )
}

export default Desktop
