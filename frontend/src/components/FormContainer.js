import { Container, Grid } from '@material-ui/core'
import React from 'react'

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Grid container justify="center">
        <Grid item xs={12} md={6}>
          {children}
        </Grid>
      </Grid>
    </Container>
  )
}

export default FormContainer
