import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {},
  typography: {
    fontFamily:
      "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    h1: { letterSpacing: '0.1em' },
    h2: { letterSpacing: '0.1em' },
    h3: { letterSpacing: '0.1em' },
    h4: { letterSpacing: '0.1em' },
    h5: { letterSpacing: '0.1em' },
    h6: { letterSpacing: '0.1em' },
    body1: { letterSpacing: '0.1em' },
    body2: { letterSpacing: '0.1em' },
    subtitle1: { letterSpacing: '0.1em' },
    subtitle2: { letterSpacing: '0.1em' },
    caption: { letterSpacing: '0.1em' },
    overline: { letterSpacing: '0.1em' },
  },
})

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
