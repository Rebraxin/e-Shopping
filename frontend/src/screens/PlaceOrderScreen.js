import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomAlert from '../components/CustomAlert'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Collapse from '@material-ui/core/Collapse'
import Container from '@material-ui/core/Container'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core'
import CustomCheckoutStepper from '../components/CustomCheckoutStepper'
import FormContainer from '../components/FormContainer'
import { Link } from 'react-router-dom'
import { createOrder } from '../actions/orderActions'

const PlaceOrderScreen = (props) => {
  const { history } = props

  const classes = useStyles()
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems, paymentMethod, shippingAddress } = cart

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`)
    }
  }, [history, success])

  // Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 10)
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2)

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    )
  }

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
                    <b>Method</b>: {paymentMethod ? paymentMethod : ''}
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
                      <React.Fragment key={item.name}>
                        <ListItem className={classes.nested}>
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
                      </React.Fragment>
                    ))}
                  </>
                )}
              </List>
            </Collapse>
          </List>
        </Grid>
        <Grid item md={4} className={classes.rightSide}>
          <List className={classes.listBorder}>
            <ListItem alignItems="flex-start">
              <ListItemText primary="Order Summary" />
            </ListItem>
            <Divider />
            <ListItem alignItems="flex-start">
              <Grid container>
                <Grid item md={6}>
                  <Typography>Items</Typography>
                </Grid>
                <Grid item md={6}>
                  <Typography>${cart.itemsPrice}</Typography>
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
            <ListItem alignItems="flex-start">
              <Grid container>
                <Grid item md={6}>
                  <Typography>Shipping</Typography>
                </Grid>
                <Grid item md={6}>
                  <Typography>${cart.shippingPrice}</Typography>
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
            <ListItem alignItems="flex-start">
              <Grid container>
                <Grid item md={6}>
                  <Typography>Tax</Typography>
                </Grid>
                <Grid item md={6}>
                  <Typography>${cart.taxPrice}</Typography>
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
            <ListItem alignItems="flex-start">
              <Grid container>
                <Grid item md={6}>
                  <Typography>Total</Typography>
                </Grid>
                <Grid item md={6}>
                  <Typography>${cart.totalPrice}</Typography>
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
            {error && (
              <>
                <ListItem alignItems="flex-start">
                  <CustomAlert
                    alertType="error"
                    alertTitle="Error"
                    alertText={error}
                  />
                </ListItem>
                <Divider />
              </>
            )}
            <ListItem alignItems="flex-start">
              <Button
                onClick={placeOrderHandler}
                variant="contained"
                color="primary"
                fullWidth
              >
                place order
              </Button>
            </ListItem>
          </List>
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
  listBorder: {
    width: '100%',
    border: '1px solid hsla(0, 0%, 0%, 0.25)',
    borderRadius: '0.25rem',
  },
  inline: {
    display: 'inline',
  },
  leftSide: {
    marginTop: '1rem',
    marginBottom: '1rem',
    paddingRight: '0.5rem',
  },
  rightSide: {
    marginTop: '1rem',
    marginBottom: '1rem',
    paddingLeft: '0.5rem',
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
