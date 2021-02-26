import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../actions/cartActions'
import { removeFromCart } from '../actions/cartActions'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import DeleteIcon from '@material-ui/icons/Delete'
import CustomAlert from '../components/CustomAlert'

const CatScreen = ({ match, location, history }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const productId = match.params.id

  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  return (
    <>
      {cartItems.length === 0 ? (
        <Container maxWidth="sm">
          <Grid item xs={12} className={classes.alert}>
            <CustomAlert
              alertType="info"
              alertTitle="Info"
              alertText="Your cart is empty"
            />
          </Grid>
        </Container>
      ) : (
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h4" className={classes.cartTitle}>
              Shopping Cart
            </Typography>
          </Grid>
          <Grid item md={8}>
            <List>
              {cartItems.map((item) => (
                <ListItem key={item.product}>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item md={3}>
                      <CardMedia
                        className={classes.media}
                        image={item.image}
                        title={item.name}
                      />
                    </Grid>
                    <Grid item md={3}>
                      <Link
                        className={classes.productLinks}
                        to={`/product/${item.product}`}
                      >
                        {item.name}
                      </Link>
                    </Grid>
                    <Grid item md={2}>
                      <Typography align="center">${item.price}</Typography>
                    </Grid>
                    <Grid item md={2}>
                      <FormControl fullWidth className={classes.formControl}>
                        <Select
                          className={classes.dropdown}
                          variant="outlined"
                          id="quantity-select"
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              addToCart(item.product, Number(e.target.value))
                            )
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <MenuItem key={x + 1} value={x + 1}>
                              {x + 1}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item md={1}>
                      <IconButton
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item md={4} className={classes.cardInfos}>
            <Card>
              <List>
                <ListItem
                  style={{
                    width: '100%',
                    margin: 'auto',
                    textAlign: 'center',
                  }}
                >
                  <Typography align="center" variant="h5" component="h3">
                    Subtotal (
                    {cartItems.reduce(
                      (accumulator, item) => accumulator + item.qty,
                      0
                    )}
                    ) items
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography component="p">
                    $
                    {cartItems
                      .reduce(
                        (accumulator, item) =>
                          accumulator + item.qty * item.price,
                        0
                      )
                      .toFixed(2)}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed To Checkout
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default CatScreen

const useStyles = makeStyles((theme) => ({
  root: {},
  dropdown: {
    '& .MuiSelect-root': {
      textAlign: 'center',
    },
  },
  cartTitle: {
    textTransform: 'uppercase',
    padding: '1.5rem 0',
  },
  cardInfos: {
    padding: '1.5rem 0',
  },
  alert: {
    marginTop: theme.spacing(5),
  },

  links: {
    textDecoration: 'none',
    color: 'inherit',
    textTransform: 'capitalize',
    '&:hover': {
      textDecoration: 'underLine',
    },
  },
  productLinks: {
    textDecoration: 'none',
    color: 'inherit',
    '&:hover': {
      textDecoration: 'underLine',
    },
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
    borderRadius: '5px',
  },
}))
