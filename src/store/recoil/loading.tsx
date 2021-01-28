import {atom, selector} from 'recoil'
import {useSetRecoilState} from 'recoil'
const LOADING_MAX_TIME = 5000

export interface LoadingAtomObject {
  loadingCount: number
  timeout: any | null
}
const loadingState = atom({
  key: 'loadingState',
  default: {
    loadingCount: 0,
    timeout: null,
  },
})

const showLoadingSelector = selector({
  key: 'showLoadingSelect',
  get: () => null,
  set: ({set}, timeout) => {
    set(loadingState, (prevState: LoadingAtomObject) => {
      if (timeout) {
        if (prevState.timeout) {
          clearTimeout(prevState.timeout as any)
        }
        return {
          loadingCount: prevState.loadingCount + 1,
          timeout,
        }
      } else {
        return {
          ...prevState,
          loadingCount: prevState.loadingCount + 1,
        }
      }
    })
  },
})

const hideLoadingSelector = selector({
  get: () => null,
  key: 'hideLoadingSelector',
  set: ({set}) => {
    set(loadingState, prevState => ({
      ...prevState,
      loadingCount: prevState.loadingCount - 1,
    }))
  },
})

const resetLoadingSelector = selector({
  get: () => null,
  key: 'resetLoadingSelector',
  set: ({set}) => {
    set(loadingState, {loadingCount: 0, timeout: null})
  },
})

export const isLoadingSelector = selector<boolean>({
  key: 'isLoadingSelector',
  get: ({get}) => {
    const state = get(loadingState)
    return state.loadingCount > 0
  },
})

export const useLoadingSelector = () => {
  const showLoading = useSetRecoilState(showLoadingSelector)
  const hideLoading = useSetRecoilState(hideLoadingSelector)
  const resetLoading = useSetRecoilState(resetLoadingSelector)
  const showLoadingWithTimeout = () =>
    showLoading(setTimeout(() => resetLoading(null), LOADING_MAX_TIME) as any)
  return [showLoadingWithTimeout, hideLoading]
}

export const useFunctionWithLoading = (_errorHandler: any | null) => {
  const [showLoading, hideLoading] = useLoadingSelector()
  return async (func: any | null, errorHandler: any | null) => {
    let ret = null
    showLoading(null)
    try {
      if (func) ret = await func()
    } catch (err) {
      if (errorHandler) errorHandler(err)
      else _errorHandler && _errorHandler(err)
    }
    hideLoading(null)
    return ret
  }
}

export default loadingState
