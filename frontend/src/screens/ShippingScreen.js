import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
import { saveShippingAddress } from '../actions/cartActions'
import CustomCheckoutStepper from '../components/CustomCheckoutStepper'

const ShippingScreen = ({ history }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  return (
    <FormContainer>
      <Grid>
        <Typography
          className={classes.homeTitle}
          color="primary"
          align="center"
          variant="h4"
        >
          Shipping
        </Typography>

        <Formik
          validationSchema={Yup.object(validationLoginForm)}
          initialValues={{
            address: shippingAddress.address,
            city: shippingAddress.city,
            postalCode: shippingAddress.postalCode,
            country: shippingAddress.country,
          }}
          onSubmit={(userInfos, { setSubmitting, resetForm }) => {
            dispatch(saveShippingAddress(userInfos))
            history.push('/payment')
            setSubmitting(false)
            resetForm()
          }}
        >
          <Form>
            <Container maxWidth="sm">
              <CustomCheckoutStepper step={2} />
              <Box margin="auto" marginTop={4}>
                <Field
                  fullWidth
                  name="address"
                  component={TextField}
                  label="Address"
                  variant="outlined"
                  color="primary"
                  placeholder="Enter your Address"
                />
              </Box>
              <Box margin="auto" marginTop={4}>
                <Field
                  fullWidth
                  name="city"
                  component={TextField}
                  label="City"
                  variant="outlined"
                  color="primary"
                  placeholder="Enter your City"
                />
              </Box>
              <Box margin="auto" marginTop={4}>
                <Field
                  fullWidth
                  component={TextField}
                  name="postalCode"
                  label="Postal Code"
                  variant="outlined"
                  color="primary"
                  placeholder="Enter your Postal Code"
                />
              </Box>
              <Box margin="auto" marginTop={4}>
                <Field
                  fullWidth
                  component={TextField}
                  name="country"
                  label="Country"
                  variant="outlined"
                  color="primary"
                  placeholder="Enter your Country"
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
                  Continue
                </Button>
              </Box>
            </Container>
          </Form>
        </Formik>
      </Grid>
    </FormContainer>
  )
}

export default ShippingScreen

const useStyles = makeStyles(() => ({
  root: {},
  homeTitle: {
    padding: '1.5rem 0',
    fontWeight: 'bold',
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
  address: Yup.string()
    .min(3, 'At least 3 caracters')
    .required('Address is required'),
  city: Yup.string()
    .min(3, 'At least 3 caracters')
    .required('City is required'),
  postalCode: Yup.number().required('Postal Code is required'),
  country: Yup.string()
    .min(3, 'At least 3 caracters')
    .required('Country is required'),
}
