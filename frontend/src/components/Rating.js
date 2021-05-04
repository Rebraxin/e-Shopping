import React from 'react'
import PropTypes from 'prop-types'
import StarIcon from '@material-ui/icons/Star'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import StarHalfIcon from '@material-ui/icons/StarHalf'
import { Grid, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  root: {},
  rating: {},
  textReview: {
    marginBottom: '-4px',
    marginLeft: '0.25rem',
  },
}))

const Rating = ({ value, text, color }) => {
  const classes = useStyles()
  return (
    <Grid container alignItems="center" className={classes.rating}>
      {value >= 1 ? (
        <StarIcon style={{ color }} />
      ) : value >= 0.5 ? (
        <StarHalfIcon style={{ color }} />
      ) : (
        <StarBorderIcon style={{ color }} />
      )}
      {value >= 2 ? (
        <StarIcon style={{ color }} />
      ) : value >= 1.5 ? (
        <StarHalfIcon style={{ color }} />
      ) : (
        <StarBorderIcon style={{ color }} />
      )}
      {value >= 3 ? (
        <StarIcon style={{ color }} />
      ) : value >= 2.5 ? (
        <StarHalfIcon style={{ color }} />
      ) : (
        <StarBorderIcon style={{ color }} />
      )}
      {value >= 4 ? (
        <StarIcon style={{ color }} />
      ) : value >= 3.5 ? (
        <StarHalfIcon style={{ color }} />
      ) : (
        <StarBorderIcon style={{ color }} />
      )}
      {value >= 5 ? (
        <StarIcon style={{ color }} />
      ) : value >= 4.5 ? (
        <StarHalfIcon style={{ color }} />
      ) : (
        <StarBorderIcon style={{ color }} />
      )}
      <Typography
        variant="body2"
        color="textSecondary"
        className={classes.textReview}
      >
        {text && text}
      </Typography>
    </Grid>
  )
}

Rating.defaultProps = {
  color: '#FDC053',
}

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
}

export default Rating
