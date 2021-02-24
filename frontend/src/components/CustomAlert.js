import React from 'react'
import Alert from '@material-ui/lab/Alert'
import AlertTitle from '@material-ui/lab/AlertTitle'

const CustomAlert = ({ alertType, alertTitle, alertText }) => {
  return (
    <Alert severity={alertType}>
      <AlertTitle>{alertTitle}</AlertTitle>
      {alertText}
    </Alert>
  )
}

export default CustomAlert
