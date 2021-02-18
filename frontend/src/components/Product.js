import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Link,
  makeStyles,
  Typography,
} from '@material-ui/core'
import React from 'react'
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
  price: { marginBottom: '2rem' },
})

const Product = ({ product }) => {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Link href={`/product/${product._id}`}>
          <CardMedia
            className={classes.media}
            image={product.image}
            title={product.name}
          />
        </Link>
      </CardActionArea>
      <CardActions>
        <CardContent>
          <Link underline="none" href={`/product/${product._id}`}>
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
