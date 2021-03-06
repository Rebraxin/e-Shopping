import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Menu from '@material-ui/core/Menu'
import Slide from '@material-ui/core/Slide'
import Badge from '@material-ui/core/Badge'
import AppBar from '@material-ui/core/AppBar'
import MailIcon from '@material-ui/icons/Mail'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import { Button, CssBaseline } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'
import MoreIcon from '@material-ui/icons/MoreVert'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { fade, makeStyles } from '@material-ui/core/styles'
import AccountCircle from '@material-ui/icons/AccountCircle'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import NotificationsIcon from '@material-ui/icons/Notifications'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'

function HideOnScroll(props) {
  const { children } = props
  const trigger = useScrollTrigger()

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

const Header = (props) => {
  const { children } = props
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const totalCartItems = cartItems.reduce(
    (accumulator, item) => accumulator + item.qty,
    0
  )

  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null)

  const isMenuOpen = Boolean(anchorEl)

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const logoutHandler = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
    dispatch(logout())
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      className={classes.wrapperMenu}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      id={menuId}
      keepMounted
      getContentAnchorEl={null}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link to="/profile" className={classes.links}>
        <MenuItem onClick={handleMenuClose}>
          <AccountCircle />
          <Typography className={classes.textMenu}>Profile</Typography>
        </MenuItem>
      </Link>
      <Link to="" className={classes.links}>
        <MenuItem onClick={logoutHandler}>
          <ExitToAppIcon />
          <Typography className={classes.textMenu}>Logout</Typography>
        </MenuItem>
      </Link>
    </Menu>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      className={classes.wrapperMenuMobile}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      getContentAnchorEl={null}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <Link to="/cart" className={classes.links}>
        <MenuItem>
          <IconButton aria-label="show 6 cart items" color="inherit">
            <Badge badgeContent={totalCartItems} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <p>Cart</p>
        </MenuItem>
      </Link>
      {userInfo ? (
        <div>
          <Link to="/profile" className={classes.links}>
            <MenuItem onClick={handleMenuClose}>
              <IconButton aria-label="show 6 cart items" color="inherit">
                <AccountCircle />
              </IconButton>
              <Typography className={classes.textMenu}>Profile</Typography>
            </MenuItem>
          </Link>
          <Link to="" className={classes.links}>
            <MenuItem onClick={logoutHandler}>
              <IconButton aria-label="show 6 cart items" color="inherit">
                <ExitToAppIcon />
              </IconButton>
              <Typography className={classes.textMenu}>Logout</Typography>
            </MenuItem>
          </Link>
        </div>
      ) : (
        <Link
          to="/login"
          style={{ padding: '0.25rem' }}
          className={classes.links}
        >
          <Button variant="outlined" aria-label="login page" color="inherit">
            <AccountCircle style={{ marginRight: '0.5rem' }} />
            Sign In
          </Button>
        </Link>
      )}
    </Menu>
  )

  return (
    <>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Link to="/" className={classes.links}>
              <Typography className={classes.title} variant="h6" noWrap>
                eShopping
              </Typography>
            </Link>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton aria-label="show 7 new notifications" color="inherit">
                <Badge badgeContent={7} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <Link to="/cart" className={classes.links}>
                <IconButton aria-label="show 6 cart items" color="inherit">
                  <Badge badgeContent={totalCartItems} color="secondary">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </Link>
              {userInfo ? (
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              ) : (
                <Link
                  to="/login"
                  style={{ padding: '0.25rem' }}
                  className={classes.links}
                >
                  <Button
                    variant="outlined"
                    aria-label="login page"
                    color="inherit"
                  >
                    <AccountCircle style={{ marginRight: '0.5rem' }} />
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      {renderMobileMenu}
      {renderMenu}
      <Toolbar />
      {children}
    </>
  )
}

export default Header

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  links: {
    textDecoration: 'none',
    color: 'inherit',
  },
  textMenu: {
    padding: '0.25rem 1.5rem 0.25rem 0.75rem',
  },
  wrapperMenu: {
    marginTop: '0.5rem',
  },
  wrapperMenuMobile: {
    marginTop: '0.25rem',
  },
}))
