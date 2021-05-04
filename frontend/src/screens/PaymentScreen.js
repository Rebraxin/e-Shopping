import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import FormContainer from '../components/FormContainer'
import { FormControlLabel, makeStyles, Radio } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CustomCheckoutStepper from '../components/CustomCheckoutStepper'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = (props) => {
  const { history } = props

  const classes = useStyles()
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress) {
    history.push('/shipping')
  }

  return (
    <FormContainer>
      <Grid>
        <Typography
          className={classes.homeTitle}
          color="primary"
          align="center"
          variant="h4"
        >
          Payment Method
        </Typography>

        <Formik
          validationSchema={Yup.object(validation)}
          initialValues={{
            paymentMethod: 'PayPal',
          }}
          onSubmit={(method, { setSubmitting, resetForm }) => {
            dispatch(savePaymentMethod(method.paymentMethod))
            history.push('/place-order')
            setSubmitting(false)
            resetForm()
          }}
        >
          <Form>
            <Container maxWidth="sm">
              <CustomCheckoutStepper step={3} />
              <Box margin="auto" marginTop={4}>
                <FormControlLabel
                  control={
                    <Field name="payment" component={Radio} color="primary" />
                  }
                  label="PayPal or Credit Card"
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

export default PaymentScreen

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

const validation = {}
