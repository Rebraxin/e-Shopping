import { SET_SNACKBAR } from '../constants/snackbarContants'

export const snackbarReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_SNACKBAR:
      const { snOpen, snType, snTitle, snMessage } = action.snackbar
      return {
        ...state,
        snOpen,
        snType,
        snTitle,
        snMessage,
      }

    default:
      return state
  }
}
