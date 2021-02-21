import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import { makeStyles } from '@material-ui/core'
import { FormControl } from '@material-ui/core'
import { MenuItem } from '@material-ui/core'
import { Select } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import CustomLoader from '../components/CustomLoader'
import { Alert, AlertTitle } from '@material-ui/lab'
import { getProductDetails } from '../actions/productActions'

const ProductScreen = ({ history, match }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [qty, setQty] = useState(1)

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  useEffect(() => {
    dispatch(getProductDetails(match.params.id))
  }, [dispatch, match])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  return (
    <>
      <Button variant="text" className={classes.backBtn}>
        <Link className={classes.links} to="/">
          Go back
        </Link>
      </Button>
      {loading ? (
        <CustomLoader />
      ) : error ? (
        <Alert className={classes.alert} severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      ) : (
        <Grid container>
          <Grid item xs={12} md={6}>
            {product.image && (
              <CardMedia
                className={classes.media}
                image={product.image}
                title={product.name}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Grid container>
              <Grid item xs={12}>
                <div className={classes.demo}>
                  <List dense={true} className={classes.listWrapper}>
                    <ListItem className={classes.listItem}>
                      <Typography variant="h4">{product.name}</Typography>
                    </ListItem>
                    <ListItem className={classes.listItem}>
                      {product.rating && (
                        <Rating
                          value={product.rating}
                          text={`${product.numReviews} reviews`}
                        />
                      )}
                    </ListItem>
                    <ListItem className={classes.listItem}>
                      <Typography variant="h6">
                        Price: ${product.price}
                      </Typography>
                    </ListItem>
                    <ListItem className={classes.listItem}>
                      <Typography variant="subtitle2">
                        Description: {product.description}
                      </Typography>
                    </ListItem>
                  </List>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <Grid container>
                <Grid item xs={12}>
                  <List className={classes.cardWrapper}>
                    <ListItem>
                      <Grid container>
                        <Grid item xs={6}>
                          Price:
                        </Grid>
                        <Grid item xs={6}>
                          <strong>${product.price}</strong>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem>
                      <Grid container>
                        <Grid item xs={6}>
                          Status:
                        </Grid>
                        <Grid item xs={6}>
                          {product.countInStock > 0
                            ? 'In Stock'
                            : 'Out Of Stock'}
                        </Grid>
                      </Grid>
                    </ListItem>

                    {product.countInStock > 0 && (
                      <ListItem>
                        <Grid container alignItems="center">
                          <Grid item xs={6}>
                            Quantity
                          </Grid>
                          <Grid item xs={6}>
                            <FormControl className={classes.formControl}>
                              <Select
                                className={classes.dropdown}
                                variant="outlined"
                                id="quantity-select"
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                              >
                                {[...Array(product.countInStock).keys()].map(
                                  (x) => (
                                    <MenuItem key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </MenuItem>
                                  )
                                )}
                              </Select>
                            </FormControl>
                          </Grid>
                        </Grid>
                      </ListItem>
                    )}

                    <ListItem>
                      <Button
                        onClick={addToCartHandler}
                        disabled={product.countInStock === 0}
                        variant="contained"
                        color="primary"
                        size="medium"
                        fullWidth={true}
                      >
                        Add To Cart
                      </Button>
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default ProductScreen

const useStyles = makeStyles((theme) => ({
  listWrapper: {
    padding: '0 0.75rem',
  },
  listItem: {
    paddingBottom: '1rem',
  },
  cardWrapper: {
    padding: '1rem 0.5rem',
  },
  links: {
    textDecoration: 'none',
    color: 'inherit',
  },
  backBtn: {
    margin: '1rem 0',
    color: theme.palette.common.black,
  },
  media: {
    height: 0,
    paddingTop: '70%',
  },
  dropdown: {
    width: '80px',
    '& .MuiSelect-root': {
      textAlign: 'center',
    },
  },
}))
