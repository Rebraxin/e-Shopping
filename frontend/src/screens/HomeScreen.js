import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/'
import Typography from '@material-ui/core/Typography'
import Product from '../components/Product'
import CustomLoader from '../components/CustomLoader'
import { getProductList } from '../actions/productActions'
import { Alert, AlertTitle } from '@material-ui/lab'

const HomeScreen = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  useEffect(() => {
    dispatch(getProductList())
  }, [dispatch])

  return (
    <>
      {loading ? (
        <CustomLoader />
      ) : error ? (
        <Alert className={classes.alert} severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      ) : (
        <>
          <Typography
            className={classes.homeTitle}
            color="primary"
            variant="h4"
          >
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
      )}
    </>
  )
}

export default HomeScreen

const useStyles = makeStyles((theme) => ({
  root: {},
  alert: {
    marginTop: theme.spacing(5),
  },
  homeTitle: {
    padding: '1.5rem 0',
    fontWeight: 'bold',
  },
}))
