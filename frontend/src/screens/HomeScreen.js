import { Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Product from '../components/Product'
import products from '../products'

const useStyles = makeStyles((theme) => ({
  root: {},
  homeTitle: {
    textTransform: 'uppercase',
    padding: '1.5rem 0',
  },
}))

const HomeScreen = () => {
  const classes = useStyles()
  return (
    <>
      <Typography variant="h4" className={classes.homeTitle}>
        Lastest Products
      </Typography>
      <Grid container alignItems="stretch" spacing={2}>
        {products.map((product, idx) => (
          <Grid item key={idx} xs={12} sm={6} md={4} lg={4} xl={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default HomeScreen
