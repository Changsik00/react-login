import {atom, selector} from 'recoil'

const LOADING_MAX_TIME = 5000

const loadingState = atom({
	key: 'loadingState',
	default: {
		checkCount: 0,
		timeout: null,
	},
})

const showLoadingSelect = selector({
	key: 'showLoadingSelect',
	set: ({set}, timeout) => {
		set(loadingState, (prevState) => {
			console.log('#@# showLoading')
			if (timeout) {
				if (prevState.timeout) {
					console.log('#@# clearTimeout')
					clearTimeout(prevState.timeout)
				}
				return {
					checkCount: prevState.checkCount + 1,
					timeout,
				}
			} else {
				return {
					...prevState,
					checkCount: prevState.checkCount + 1,
				}
			}
		})
	},
})

const hideLoadingSelect = selector({
	key: 'hideLoadingSelect',
	set: ({set}) => {
		console.log('#@# hideLoading')
		set(loadingState, (prevState) => ({
			...prevState,
			checkCount: prevState.checkCount - 1,
		}))
	},
})

const resetLoadingSelect = selector({
	key: 'resetLoadingSelect',
	set: ({set}) => {
		console.log('#@# reset')
		set(loadingState, {checkCount: 0, timeout: null})
	},
})

const isLoadingSelect = selector({
	key: 'isLoadingSelect',
	get: ({get}) => {
		const state = get(loadingState)
		return state.checkCount > 0
	},
})

const useLoadingSelect = (useSetRecoilState) => {
	const showLoading = useSetRecoilState(showLoadingSelect)
	const hideLoading = useSetRecoilState(hideLoadingSelect)
	const resetLoading = useSetRecoilState(resetLoadingSelect)
	const showLoadingWithTimeout = () => showLoading(setTimeout(() => resetLoading(), LOADING_MAX_TIME))

	// return {showLoading, showLoadingWithTimeout, hideLoading}
	return [showLoadingWithTimeout, hideLoading]
}

export {showLoadingSelect, hideLoadingSelect, resetLoadingSelect, isLoadingSelect, useLoadingSelect}
export default loadingState
