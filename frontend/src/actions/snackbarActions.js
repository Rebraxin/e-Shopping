import { SET_SNACKBAR } from '../constants/snackbarContants'

export const setSnackbar = (snOpen, snType, snTitle, snMessage) => (
  dispatch
) => {
  dispatch({
    type: SET_SNACKBAR,
    snackbar: {
      snOpen,
      snType,
      snTitle,
      snMessage,
    },
  })
}
