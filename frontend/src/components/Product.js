import React from 'react'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import CardActionArea from '@material-ui/core/CardActionArea'

import Rating from './Rating'

const useStyles = makeStyles({
  root: {
    padding: '0.75rem',
    height: '100%',
  },
  media: {
    height: 0,
    paddingTop: '80%',
  },
  rating: {
    paddingBottom: '0.75rem',
  },
  price: {
    marginBottom: '2rem',
  },
  routerLink: {
    textDecoration: 'none',
  },
})

const Product = ({ product }) => {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Link to={`/product/${product._id}`}>
          <CardMedia
            className={classes.media}
            image={product.image}
            title={product.name}
          />
        </Link>
      </CardActionArea>
      <CardActions>
        <CardContent>
          <Link className={classes.routerLink} to={`/product/${product._id}`}>
            <Typography
              gutterBottom
              variant="subtitle1"
              component="h2"
              color="textPrimary"
            >
              {product.name}
            </Typography>
          </Link>
          <Grid item className={classes.rating}>
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </Grid>
          <Typography variant="h6" color="textPrimary" component="p">
            ${product.price}
          </Typography>
        </CardContent>
      </CardActions>
    </Card>
  )
}

export default Product
