import { Box, Container, Grid, makeStyles } from '@material-ui/core'
import React from 'react'

const Footer = () => {
  const classes = useStyles()
  return (
    <footer>
      <Container className={classes.root}>
        <Grid item>
          <Box my={3} align="center">
            Copyright &copy; e-Shopping
          </Box>
        </Grid>
      </Container>
    </footer>
  )
}

export default Footer

const useStyles = makeStyles((theme) => ({
  root: {},
}))
