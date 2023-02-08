import HomeIcon from '@/assets/images/home.svg'
import { Tooltip } from 'antd'
import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import ServiceCenterIcon from '@/assets/images/service-center.svg'
import DesktopIcon from '@/assets/images/desktop.svg'
import WorkbenchIcon from '@/assets/images/workbench.svg'
import DatabaseIcon from '@/assets/images/database.svg'
import VisualIcon from '@/assets/images/visual.svg'
import DevelopIcon from '@/assets/images/develop.svg'
import './index.scss'

const ISPLayout: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  // 当前选中的导航

  const onClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation()
    e.currentTarget.dataset.path != null && navigate(e.currentTarget.dataset.path)
  }

  const navActive = (path: string): boolean => {
    return location.pathname.startsWith(path)
  }

  return (
    <>
      <header className="w-screen h-14 bg-primary flex items-center py-2 box-border pl-10 overflow-hidden sticky top-0 left-0">
        <div
          className="rounded-full w-8 h-8 bg-white bg-cover"
          style={{
            backgroundImage: `url("https://phostann-1259448770.cos.ap-beijing.myqcloud.com/0.png")`
          }}
        ></div>
        <div className="text-white text-xl ml-2 min-w-[259px]">智慧校园服务平台</div>
        <nav className={'flex'}>
          <Tooltip title={'首页'}>
            <div
              className={`nav-item ${navActive('/home') ? 'active' : ''}`}
              onClick={onClick}
              data-path="/home"
            >
              <HomeIcon></HomeIcon>
            </div>
          </Tooltip>
          <Tooltip title={'业务平台'}>
            <div
              className={`nav-item ${navActive('/service-center') ? 'active' : ''}`}
              onClick={onClick}
              data-path="/service-center"
            >
              <ServiceCenterIcon></ServiceCenterIcon>
            </div>
          </Tooltip>
          <Tooltip title={'应用平台'}>
            <div
              className={`nav-item ${navActive('/desktop') ? 'active' : ''}`}
              onClick={onClick}
              data-path="/desktop"
            >
              <DesktopIcon></DesktopIcon>
            </div>
          </Tooltip>
          <Tooltip title={'定义平台'}>
            <div
              className={`nav-item ${navActive('/workbench') ? 'active' : ''}`}
              onClick={onClick}
              data-path="/workbench"
            >
              <WorkbenchIcon></WorkbenchIcon>
            </div>
          </Tooltip>
          <Tooltip title={'数据平台'}>
            <div
              className={`nav-item ${navActive('/database') ? 'active' : ''}`}
              onClick={onClick}
              data-path="/database"
            >
              <DatabaseIcon></DatabaseIcon>
            </div>
          </Tooltip>
          <Tooltip title={'态势平台'}>
            <div
              className={`nav-item ${navActive('/visual') ? 'active' : ''}`}
              onClick={onClick}
              data-path="/visual"
            >
              <VisualIcon></VisualIcon>
            </div>
          </Tooltip>
          <Tooltip title={'开发平台'}>
            <div
              className={`nav-item ${navActive('/develop') ? 'active' : ''}`}
              onClick={onClick}
              data-path="/develop"
            >
              <DevelopIcon></DevelopIcon>
            </div>
          </Tooltip>
        </nav>
      </header>
      <Outlet></Outlet>
    </>
  )
}

export default ISPLayout
