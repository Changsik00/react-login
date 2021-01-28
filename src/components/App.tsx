import React from 'react'
import {RecoilRoot} from 'recoil'
import {ConfigProvider} from 'antd'
import ko_KR from 'antd/lib/locale/ko_KR'
import '../assets/style/app.less'
import Login from './Login'
import {Loading} from './Loading'

const App = () => {
  return (
    <RecoilRoot>
      <ConfigProvider locale={ko_KR}>
        <div style={{width: 400, margin: '100px auto 0 auto'}}>
          <Login />
        </div>
      </ConfigProvider>
      <Loading />
    </RecoilRoot>
  )
}
export default App
