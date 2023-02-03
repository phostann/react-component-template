import microApp from '@micro-zoe/micro-app'
import { notification } from 'antd'
import React, { useEffect } from 'react'

microApp.start()

interface ChildrenProps {
  children?: React.ReactNode
}

// 初始配置
const App: React.FC<ChildrenProps> = ({ children }) => {
  // 通知配置
  useEffect(() => {
    notification.config({
      maxCount: 3
    })
  }, [])

  return <>{children}</>
}

export default App
