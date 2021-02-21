import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles, Snackbar } from '@material-ui/core'
// import MuiAlert from '@material-ui/labAlert'
import { Alert, AlertTitle } from '@material-ui/lab'
import { setSnackbar } from '../actions/snackbarActions'

// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />
// }

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(7),
    '& .MuiPaper-root': {
      padding: `${theme.spacing(0)} ${theme.spacing(3)}`,
    },
  },
}))

const CustomSnackbar = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const snackbar = useSelector((state) => state.snackbar)
  const { snOpen, snType, snTitle, snMessage } = snackbar

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(setSnackbar(false, snType, snTitle, snMessage))
  }

  return (
    <div>
      <Snackbar
        className={classes.root}
        open={snOpen}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={handleClose}
      >
        <Alert
          elevation={2}
          variant="filled"
          onClose={handleClose}
          severity={snType}
        >
          <AlertTitle>{snTitle}</AlertTitle>
          {snMessage}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default CustomSnackbar
