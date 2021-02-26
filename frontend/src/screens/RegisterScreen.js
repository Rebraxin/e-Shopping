import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CustomLoader from '../components/CustomLoader'
import { register } from '../actions/userActions'
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

const RegisterScreen = ({ location, history }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

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
              Sign Up
            </Typography>

            <Formik
              validationSchema={Yup.object(validationLoginForm)}
              initialValues={{
                name: '',
                email: '',
                password: '',
              }}
              onSubmit={(userInfos, { setSubmitting, resetForm }) => {
                dispatch(
                  register(userInfos.name, userInfos.email, userInfos.password)
                )
                setSubmitting(false)
                resetForm()
              }}
            >
              <Form>
                <Container maxWidth="sm">
                  <Box margin="auto" marginTop={4}>
                    <Field
                      fullWidth
                      // autoFocus={true}
                      name="email"
                      component={TextField}
                      label="Name"
                      variant="outlined"
                      color="primary"
                      placeholder="Enter name"
                    />
                  </Box>
                  <Box margin="auto" marginTop={4}>
                    <Field
                      fullWidth
                      name="email"
                      component={TextField}
                      label="Email"
                      variant="outlined"
                      color="primary"
                      placeholder="Enter email address"
                    />
                  </Box>
                  <Box margin="auto" marginTop={4}>
                    <Field
                      fullWidth
                      component={TextField}
                      name="password"
                      type="password"
                      label="Password"
                      variant="outlined"
                      color="primary"
                      placeholder="Enter password"
                    />
                  </Box>
                  <Box margin="auto" marginTop={4}>
                    <Field
                      fullWidth
                      component={TextField}
                      name="confirmPassword"
                      type="password"
                      label="Confirm Password"
                      variant="outlined"
                      color="primary"
                      placeholder="Confirm password"
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
                      Register
                    </Button>
                  </Box>
                </Container>
              </Form>
            </Formik>
          </Grid>
          <Container maxWidth="sm">
            <Grid className={classes.registerBtn} container justify="flex-end">
              <Typography className={classes.registerTxt}>
                Have an Account ?{' '}
                <Link
                  className={classes.registerLink}
                  to={redirect ? `/Login?redirect=${redirect}` : '/login'}
                >
                  Login
                </Link>
              </Typography>
            </Grid>
          </Container>
        </>
      )}
    </FormContainer>
  )
}

export default RegisterScreen

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
  name: Yup.string()
    .min(3, 'At least 3 caracters')
    .required('Name is required'),
  email: Yup.string()
    .email('Email address is not valid')
    .required('Email address required'),
  password: Yup.string()
    .min(8, 'At least 8 caracters')
    .required('Password required'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match'
  ),
}
