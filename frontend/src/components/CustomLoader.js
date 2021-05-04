import { CircularProgress, makeStyles } from '@material-ui/core'
import React from 'react'

const CustomLoader = () => {
  const classes = useStyles()
  return <CircularProgress className={classes.root} />
}

export default CustomLoader

const useStyles = makeStyles(() => ({
  root: {
    position: 'absolute',
    top: '45%',
    left: '50%',
    marginLeft: '-1rem',
    marginTop: '-1rem',
  },
}))
