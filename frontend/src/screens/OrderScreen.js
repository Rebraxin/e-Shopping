import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { useDispatch, useSelector } from 'react-redux'
import CustomAlert from '../components/CustomAlert'
import Avatar from '@material-ui/core/Avatar'
import Collapse from '@material-ui/core/Collapse'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core'
import CustomLoader from '../components/CustomLoader'
import FormContainer from '../components/FormContainer'
import { Link } from 'react-router-dom'
import { getOrderDetails, payOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET } from '../constants/orderConstants'

const OrderScreen = (props) => {
  const { match } = props
  const orderId = match.params.id

  const [sdkReady, setSdkReady] = useState(false)

  const classes = useStyles()
  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  // Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  if (!loading) {
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&locale=fr_FR`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!order || order._id !== orderId || successPay) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [order, orderId, successPay])

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(payOrder(orderId, paymentResult))
  }

  return loading ? (
    <CustomLoader />
  ) : error ? (
    <CustomAlert alertType="error" alertTitle="Error" alertText={error} />
  ) : (
    <>
      <FormContainer>
        <Grid>
          <Typography
            className={classes.homeTitle}
            color="primary"
            align="center"
            variant="h4"
          >
            Order number: {order._id}
          </Typography>
        </Grid>
      </FormContainer>
      <Grid container>
        <Grid item md={8} className={classes.leftSide}>
          <List className={classes.root}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary="Shipping"
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      <strong>Name:</strong> {order.user.name}{' '}
                      <a href={`mailto:${order.user.email}`}>
                        {order.user.email}
                      </a>
                    </Typography>
                    <Typography variant="body2" color="textPrimary">
                      <b>Address</b>: {order.shippingAddress.address},{' '}
                      {order.shippingAddress.postalCode}{' '}
                      {order.shippingAddress.city},{' '}
                      {order.shippingAddress.country}
                    </Typography>
                    {order.isDelivered ? (
                      <CustomAlert
                        alertType="success"
                        alertTitle="Success"
                        alertText={`Delivered on ${order.deliveredAt}`}
                      />
                    ) : (
                      <CustomAlert
                        alertType="warning"
                        alertTitle="Alert"
                        alertText="Not Delivered"
                      />
                    )}
                  </>
                }
              />
            </ListItem>
            <Divider variant="middle" />
            <ListItem alignItems="flex-start">
              <ListItemText
                primary="Payment Method"
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      <b>Method</b>:{' '}
                      {order.paymentMethod ? order.paymentMethod : ''}
                      {order.isPaid ? (
                        <CustomAlert
                          alertType="success"
                          alertTitle="Success"
                          alertText={`Paid on ${order.paidAt}`}
                        />
                      ) : (
                        <CustomAlert
                          alertType="warning"
                          alertTitle="Alert"
                          alertText="Not Paid"
                        />
                      )}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            <Divider variant="middle" />
            <ListItem alignItems="flex-start">
              <ListItemText primary="Order Items" />
            </ListItem>
            <Collapse in>
              <List component="div" disablePadding>
                {order.orderItems.length === 0 ? (
                  <ListItem alignItems="flex-start">
                    <Grid item xs={12}>
                      <CustomAlert
                        alertType="info"
                        alertTitle="Info"
                        alertText="Order is empty"
                      />
                    </Grid>
                  </ListItem>
                ) : (
                  <>
                    {order.orderItems.map((item, idx) => (
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
                        {idx < order.orderItems.length - 1 && (
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
                  <Typography>${order.totalPrice}</Typography>
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
                  <Typography>${order.shippingPrice}</Typography>
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
                  <Typography>${order.taxPrice}</Typography>
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
                  <Typography>${order.totalPrice}</Typography>
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
            {!order.isPaid && (
              <ListItem alignItems="center">
                {loadingPay && <CustomLoader />}
                {!sdkReady ? (
                  <CustomLoader />
                ) : (
                  <Grid item xs={12}>
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                      // onClick={placeOrderHandler}
                      variant="contained"
                      color="primary"
                      fullWidth
                    />
                  </Grid>
                )}
              </ListItem>
            )}
          </List>
        </Grid>
      </Grid>
    </>
  )
}

export default OrderScreen

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
