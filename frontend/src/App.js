import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { Container } from '@material-ui/core'
import HomeScreen from './screens/HomeScreen'

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Container>
          <HomeScreen />
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default App
