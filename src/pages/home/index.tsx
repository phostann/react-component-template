import { Button } from 'antd'
import React, { useEffect } from 'react'

const Home: React.FC = () => {
  useEffect(() => {
    void (async () => {
      // const res = await request.get('http://localhost:4000')
      // console.log(res)
    })()
  }, [])

  return (
    <React.Fragment>
      <div className="text-red-500">
        <h1>LOCAL HOME</h1>
        <Button type="primary">ANTD</Button>
      </div>
    </React.Fragment>
  )
}

export default Home
