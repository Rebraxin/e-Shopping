import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CustomLoader from '../components/CustomLoader'
import { login } from '../actions/userActions'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { TextField } from 'formik-material-ui'
import FormContainer from '../components/FormContainer'
import { makeStyles } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CustomAlert from '../components/CustomAlert'

const LoginScreen = ({ location, history }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])
  return (
    <FormContainer>
      {loading ? (
        <CustomLoader />
      ) : (
        <>
          <Grid>
            {error && (
              <Container style={{ paddingTop: '1.5rem' }}>
                <CustomAlert
                  alertType="error"
                  alertTitle="Error"
                  alertText={error}
                />
              </Container>
            )}
            <Typography
              className={classes.homeTitle}
              color="primary"
              align="center"
              variant="h3"
            >
              Sign In
            </Typography>

            <Formik
              validationSchema={Yup.object(validationLoginForm)}
              initialValues={{
                email: '',
                password: '',
              }}
              onSubmit={(userInfos, { setSubmitting, resetForm }) => {
                dispatch(login(userInfos.email, userInfos.password))
                setSubmitting(false)
                resetForm()
              }}
            >
              <Form>
                <Container maxWidth="sm">
                  <Box margin="auto" marginTop={4}>
                    <Field
                      fullWidth
                      autoFocus={true}
                      name="email"
                      component={TextField}
                      label="Email"
                      variant="outlined"
                      color="primary"
                      placeholder="Adresse email"
                    />
                  </Box>
                  <Box margin="auto" marginTop={4}>
                    <Field
                      fullWidth
                      component={TextField}
                      name="password"
                      type="password"
                      label="Mot de passe"
                      variant="outlined"
                      color="primary"
                      placeholder="Mot de passe"
                    />
                  </Box>
                  <Box marginTop={4}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      className={classes.submitBtn}
                      type="submit"
                    >
                      Sign In
                    </Button>
                  </Box>
                </Container>
              </Form>
            </Formik>
          </Grid>
          <Container maxWidth="sm">
            <Grid className={classes.registerBtn} container justify="flex-end">
              <Typography className={classes.registerTxt}>
                New Custom ?{' '}
                <Link
                  className={classes.registerLink}
                  to={redirect ? `/register?redirect=${redirect}` : '/register'}
                >
                  Register
                </Link>
              </Typography>
            </Grid>
          </Container>
        </>
      )}
    </FormContainer>
  )
}

export default LoginScreen

const useStyles = makeStyles((theme) => ({
  root: {},
  homeTitle: {
    padding: '1.5rem 0',
  },
  submitBtn: {
    display: 'inline-block',
    float: 'right',
  },
  registerBtn: {
    padding: '1.5rem 0',
  },
  registerTxt: {
    fontSize: '14px',
  },
  registerLink: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}))

const validationLoginForm = {
  email: Yup.string()
    .email("L'adresse email n'est pas valide")
    .required('Adresse email requise'),
  password: Yup.string()
    // @TODO : Change validation to 8 characters
    .min(3, 'Doit comprendre 8 caractères au minimum')
    .required('Mot de passe requis'),
}
