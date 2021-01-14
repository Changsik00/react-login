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
			if (timeout) {
				if (prevState.timeout) {
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
		set(loadingState, (prevState) => ({
			...prevState,
			checkCount: prevState.checkCount - 1,
		}))
	},
})

const resetLoadingSelect = selector({
	key: 'resetLoadingSelect',
	set: ({set}) => {
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
	return [showLoadingWithTimeout, hideLoading]
}

export {showLoadingSelect, hideLoadingSelect, resetLoadingSelect, isLoadingSelect, useLoadingSelect}
export default loadingState
