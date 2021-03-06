import React from 'react'
import { Container, Typography, Grid, Button } from '@material-ui/core'
import useStyles from './styles'
import CartItem from './cartitem/CardItem'
import { Link } from 'react-router-dom'

const Cart = ({
  cart,
  handleUpdateCartQty,
  handleRemoveFromCart,
  handleEmptyCart,
}) => {
  const classes = useStyles()

  const EmptyCart = () => {
    return (
      <Typography variant="subtitle1">
        You have no items in your shopping cart,
        <Link to="/" className={classes.link}>
          start adding some!!
        </Link>
      </Typography>
    )
  }

  const FilledCart = () => {
    return (
      <>
        <Grid
          container
          spacing={4}
          md={12}
          lg={12}
          style={{ maxWidth: '80%', justifyContent: 'center', margin: 'auto' }}
          justify="center"
        >
          {cart.line_items.map((item) => (
            <Grid item xs={12} sm={4} key={item.id}>
              <CartItem
                item={item}
                handleUpdateCartQty={handleUpdateCartQty}
                handleRemoveFromCart={handleRemoveFromCart}
              />
            </Grid>
          ))}
        </Grid>
        <div className={classes.cardDetails}>
          <Typography variant="h4">
            Subtotal: {cart.subtotal.formatted_with_symbol}
          </Typography>
          <div>
            <Button
              className={classes.emptyButton}
              size="large"
              type="button"
              variant="contained"
              color="secondary"
              onClick={handleEmptyCart}
            >
              Empty Cart
            </Button>
            <Button
              className={classes.checkoutButton}
              size="large"
              type="button"
              variant="contained"
              color="primary"
              component={Link}
              to="/checkout"
            >
              Checkout
            </Button>
          </div>
        </div>
      </>
    )
  }

  if (!cart.line_items)
    return (
      <h3 style={{ color: '#000', marginTop: '20%', textAlign: 'center' }}>
        Loading...
      </h3>
    )

  return (
    <Container>
      <div className={classes.toolbar}>
        <Typography className={classes.title} variant="h3" gutterBottom>
          Your Shopping Cart
        </Typography>
        {!cart?.line_items?.length ? <EmptyCart /> : <FilledCart />}
      </div>
    </Container>
  )
}

export default Cart
