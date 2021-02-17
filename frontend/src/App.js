import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { Box, Container, Typography } from '@material-ui/core'

const App = () => {
  return (
    <Header>
      <main>
        <Box py={3}>
          <Container>
            <Typography variant="h3">Welcome to e-Shopping</Typography>
          </Container>
        </Box>
      </main>
      <Footer />
    </Header>
  )
}

export default App
