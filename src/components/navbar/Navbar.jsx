import React from 'react';
import {AppBar, Toolbar, IconButton, Badge, Typography} from '@material-ui/core';
import {ShoppingCart} from '@material-ui/icons';
import logo from '../../assets/logo.jpeg';
import useStyles from './styles';
import {Link, useLocation} from 'react-router-dom'

const Navbar = ({totalItems}) => {
    const classes = useStyles();
    const location = useLocation();
    return(
        <>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography variant="h6" className={classes.title} color="inherit" component={Link} to="/">
                        <img src={logo} alt="commerce.js" height="25px" className={classes.image} />
                        E-Commerce
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.button}>
                       { location.pathname === "/" && (
                        <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                            <Badge badgeContent={totalItems} color="secondary">
                                <ShoppingCart/>
                            </Badge>
                        </IconButton>
                       )}
                    </div>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar;