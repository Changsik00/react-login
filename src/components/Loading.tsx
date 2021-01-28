import React from 'react'
import {Spin} from 'antd'
import {useRecoilValue} from 'recoil'
import '../assets/style/loading.less'
import {isLoadingSelector} from '../store/recoil/loading'
export function Loading() {
  const isLoading = useRecoilValue(isLoadingSelector)
  return isLoading ? (
    <div className={'loading-layer'}>
      <div className={'loading'}>
        <Spin tip="Loading..." size="large" />
      </div>
    </div>
  ) : (
    <></>
  )
}
