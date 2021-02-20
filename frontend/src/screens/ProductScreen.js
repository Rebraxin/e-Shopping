import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import {
  Button,
  Card,
  CardMedia,
  Grid,
  List,
  ListItem,
  makeStyles,
  Typography,
} from '@material-ui/core'
import axios from 'axios'

const ProductScreen = ({ match }) => {
  const classes = useStyles()

  const [product, setProduct] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      const { data } = await axios.get(`/api/products/${match.params.id}`)
      setProduct(data)
      setLoading(false)
    }

    fetchProduct()
  }, [match.params.id])

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Button variant="text" className={classes.backBtn}>
            <Link className={classes.links} to="/">
              Go back
            </Link>
          </Button>
          <Grid container>
            <Grid item xs={12} md={6}>
              <CardMedia
                className={classes.media}
                image={product.image}
                title={product.name}
              />
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
                        <Rating
                          value={product.rating}
                          text={`${product.numReviews} reviews`}
                        />
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
                      <ListItem>
                        <Button
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
        </>
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
    paddingTop: '80%',
  },
}))
