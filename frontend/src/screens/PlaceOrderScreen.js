import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, Form, Formik } from 'formik'
import { TextField } from 'formik-material-ui'
import CustomAlert from '../components/CustomAlert'
import {
  Avatar,
  Collapse,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core'
import CustomCheckoutStepper from '../components/CustomCheckoutStepper'
import FormContainer from '../components/FormContainer'
import { Link } from 'react-router-dom'

const PlaceOrderScreen = () => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const cart = useSelector((state) => state.cart)
  const { cartItems, paymentMethod, shippingAddress } = cart

  console.log(cartItems)

  return (
    <>
      <FormContainer>
        <Grid>
          <Typography
            className={classes.homeTitle}
            color="primary"
            align="center"
            variant="h4"
          >
            Place Order
          </Typography>
          <Container maxWidth="sm">
            <CustomCheckoutStepper step={4} />
          </Container>
        </Grid>
      </FormContainer>
      <Grid container>
        <Grid item md={8} className={classes.leftSide}>
          <List className={classes.root}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary="Shipping"
                secondary={
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    <b>Address</b>: {shippingAddress.address},{' '}
                    {shippingAddress.postalCode} {shippingAddress.city},{' '}
                    {shippingAddress.country}
                  </Typography>
                }
              />
            </ListItem>
            <Divider variant="middle" />
            <ListItem alignItems="flex-start">
              <ListItemText
                primary="Payment Method"
                secondary={
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    <b>Method</b>:{' '}
                    {paymentMethod ? paymentMethod.paymentMethod : ''}
                  </Typography>
                }
              />
            </ListItem>
            <Divider variant="middle" />
            <ListItem alignItems="flex-start">
              <ListItemText primary="Order Items" />
            </ListItem>
            <Collapse in>
              <List component="div" disablePadding>
                {cartItems.length === 0 ? (
                  <ListItem alignItems="flex-start">
                    <Grid item xs={12}>
                      <CustomAlert
                        alertType="info"
                        alertTitle="Info"
                        alertText="Your cart is empty"
                      />
                    </Grid>
                  </ListItem>
                ) : (
                  <>
                    {cartItems.map((item, idx) => (
                      <>
                        <ListItem key={item.product} className={classes.nested}>
                          <Grid container alignItems="center">
                            <Grid item md={1}>
                              <Avatar
                                className={classes.avatar}
                                variant="rounded"
                                alt={item.name}
                                src={item.image}
                              />
                            </Grid>
                            <Grid item md={7}>
                              <Link
                                className={classes.links}
                                to={`/product/${item.product}`}
                              >
                                {item.name}
                              </Link>
                            </Grid>
                            <Grid item md={4}>
                              <Typography>
                                {item.qty} x ${item.price} = $
                                {item.qty * item.price}
                              </Typography>
                            </Grid>
                          </Grid>
                        </ListItem>
                        {idx < cartItems.length - 1 && (
                          <Divider variant="middle" />
                        )}
                      </>
                    ))}
                  </>
                )}
              </List>
            </Collapse>
          </List>
        </Grid>
        <Grid item md={4} style={{ border: '1px solid blue' }}>
          <p>test</p>
        </Grid>
      </Grid>
    </>
  )
}

export default PlaceOrderScreen

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  inline: {
    display: 'inline',
  },
  leftSide: {
    marginTop: '1rem',
    marginBottom: '1rem',
    paddingRight: '0.5rem',
  },
  avatar: {
    width: '55px',
    height: 'auto',
  },
  links: {
    marginLeft: '0.5rem',
    fontSize: '1rem',
    textDecoration: 'none',
    color: 'inherit',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  homeTitle: {
    padding: '1.5rem 0',
    fontWeight: 'bold',
  },
}))
