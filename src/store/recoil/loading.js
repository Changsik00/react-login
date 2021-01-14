import {atom, selector} from 'recoil'

const LOADING_MAX_TIME = 5000

const loadingState = atom({
	key: 'loadingState',
	default: {
		checkCount: 0,
		timeout: null,
	},
})

const showLoadingSelector = selector({
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

const hideLoadingSelector = selector({
	key: 'hideLoadingSelector',
	set: ({set}) => {
		set(loadingState, (prevState) => ({
			...prevState,
			checkCount: prevState.checkCount - 1,
		}))
	},
})

const resetLoadingSelector = selector({
	key: 'resetLoadingSelector',
	set: ({set}) => {
		set(loadingState, {checkCount: 0, timeout: null})
	},
})

export const isLoadingSelector = selector({
	key: 'isLoadingSelector',
	get: ({get}) => {
		const state = get(loadingState)
		return state.checkCount > 0
	},
})

export const useLoadingSelector = (useSetRecoilState) => {
	const showLoading = useSetRecoilState(showLoadingSelector)
	const hideLoading = useSetRecoilState(hideLoadingSelector)
	const resetLoading = useSetRecoilState(resetLoadingSelector)
	const showLoadingWithTimeout = () => showLoading(setTimeout(() => resetLoading(), LOADING_MAX_TIME))
	return [showLoadingWithTimeout, hideLoading]
}

export default loadingState
