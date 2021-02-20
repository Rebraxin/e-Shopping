import { Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Product from '../components/Product'

const HomeScreen = () => {
  const classes = useStyles()

  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products')
      setProducts(data)
    }

    fetchProducts()
  }, [])

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

const useStyles = makeStyles((theme) => ({
  root: {},
  homeTitle: {
    textTransform: 'uppercase',
    padding: '1.5rem 0',
  },
}))
