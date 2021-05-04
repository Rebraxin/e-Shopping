import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomLoader from '../components/CustomLoader'
import { getUserDetails } from '../actions/userActions'
import { updateUserProfile } from '../actions/userActions'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { TextField } from 'formik-material-ui'
import { makeStyles } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CustomAlert from '../components/CustomAlert'
import { setSnackbar } from '../actions/snackbarActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

const ProfileScreen = ({ history }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  useEffect(() => {
    success &&
      dispatch(
        setSnackbar(
          true,
          'success',
          'Success',
          'Your profile have been updated!'
        )
      )
  }, [dispatch, success])

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user || !user.name || success) {
        dispatch({
          type: USER_UPDATE_PROFILE_RESET,
        })
        dispatch(getUserDetails('profile'))
      }
    }
  }, [history, userInfo, user, dispatch, success])

  return (
    <>
      {error && (
        <Container style={{ paddingTop: '1.5rem' }}>
          <CustomAlert alertType="error" alertTitle="Error" alertText={error} />
        </Container>
      )}

      {loading ? (
        <CustomLoader />
      ) : (
        <Grid container>
          <Grid item md={3}>
            <Grid>
              <Formik
                validationSchema={Yup.object(validationLoginForm)}
                enableReinitialize={true}
                initialValues={{
                  id: user._id,
                  name: user.name,
                  email: user.email,
                  password: '',
                }}
                onSubmit={(userInfos) => {
                  dispatch(updateUserProfile(userInfos))
                }}
              >
                <Form>
                  <Container maxWidth="sm">
                    <Typography
                      className={classes.homeTitle}
                      color="primary"
                      variant="h4"
                    >
                      User Profile
                    </Typography>
                    <Box margin="auto" marginTop={4}>
                      <Field
                        fullWidth
                        name="name"
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
                        type="submit"
                      >
                        Update
                      </Button>
                    </Box>
                  </Container>
                </Form>
              </Formik>
            </Grid>
          </Grid>
          <Grid item md={9}>
            <h2>My Orders</h2>
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default ProfileScreen

const useStyles = makeStyles(() => ({
  root: {},
  homeTitle: {
    padding: '1.5rem 0',
    fontWeight: 'bold',
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
  name: Yup.string().min(3, 'At least 3 caracters'),
  email: Yup.string().email('Email address is not valid'),
  password: Yup.string().min(8, 'At least 8 caracters'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match'
  ),
}
