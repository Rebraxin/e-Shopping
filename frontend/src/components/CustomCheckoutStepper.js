import { makeStyles } from '@material-ui/core'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Stepper from '@material-ui/core/Stepper'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { Link } from 'react-router-dom'

const CustomCheckoutStepper = (props) => {
  const { step } = props

  const classes = useStyles()

  const currentStep = step - 1

  return (
    <div className={classes.root}>
      <Stepper
        className={classes.stepper}
        alternativeLabel
        activeStep={currentStep}
      >
        <Step>
          <StepLabel>
            {currentStep >= 0 ? (
              <Link to="/login?redirect=shipping" className={classes.stepLinks}>
                Sign In
              </Link>
            ) : (
              <Typography className={classes.stepDisabled}>Sign In</Typography>
            )}
          </StepLabel>
        </Step>
        <Step>
          <StepLabel>
            {currentStep >= 1 ? (
              <Link to="/shipping" className={classes.stepLinks}>
                Shipping
              </Link>
            ) : (
              <Typography className={classes.stepDisabled}>Shipping</Typography>
            )}
          </StepLabel>
        </Step>
        <Step>
          <StepLabel>
            {currentStep >= 2 ? (
              <Link to="/payment" className={classes.stepLinks}>
                Payment
              </Link>
            ) : (
              <Typography className={classes.stepDisabled}>Payment</Typography>
            )}
          </StepLabel>
        </Step>
        <Step>
          <StepLabel>
            {currentStep >= 3 ? (
              <Link to="/place-order" className={classes.stepLinks}>
                Place Order
              </Link>
            ) : (
              <Typography className={classes.stepDisabled}>
                Place Order
              </Typography>
            )}
          </StepLabel>
        </Step>
      </Stepper>
    </div>
  )
}

export default CustomCheckoutStepper

const useStyles = makeStyles((theme) => ({
  root: {},
  stepper: {
    backgroundColor: 'transparent',
  },
  stepLinks: {
    fontSize: '14px',
    textTransform: 'capitalize',
    textDecoration: 'none',
    color: theme.palette.primary.main,
    '&:visited': {
      color: theme.palette.primary.main,
    },
  },
  stepDisabled: {
    fontSize: '14px',
    textTransform: 'capitalize',
    opacity: 0.8,
  },
}))
