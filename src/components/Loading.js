import React from 'react'
import '../assets/style/loading.less'
import {Spin} from 'antd'
import {useRecoilValue} from 'recoil'
import {isLoadingSelect} from '../store/recoil/loading'
export const Loading = () => {
	const isLoading = useRecoilValue(isLoadingSelect)
	return (
		isLoading && (
			<div className={'loading-layer'}>
				<div className={'loading'}>
					<Spin tip='Loading...' size='large' />
				</div>
			</div>
		)
	)
}