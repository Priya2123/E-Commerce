import React, { useState, useEffect } from 'react'
import { commerce } from './lib/commerce'
import { Products, Navbar, Cart,  Checkout } from './components' //for this - default export in index.js in components
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const App = () => {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({})
  const [order, setOrder] = useState({})
  const [errorMessage, setErrorMessage] = useState('')
 
  const fetchProducts = async () => {
    const response = await commerce.products.list() //{data}
    if (response) {
      setProducts([...products, response.data])
    }
  }

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve())
  }

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity)

    setCart(item.cart)
  }

  const handleUpdateCartQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity })
    setCart(cart)
  }

  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId)
    setCart(cart)
  }

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty()
    setCart(cart)
  }

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh()
    setCart(newCart)
  }

  const onCaptureCheckout = (checkoutTokenId, newOrder) => {
    commerce.checkout.capture(checkoutTokenId, newOrder).then((incomingOrder) => setOrder(incomingOrder))
    refreshCart()
  }
  useEffect(() => {
    fetchProducts()
    fetchCart()
  }, [])
  //run at the start on the render

  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items} />
        <Switch>
          <Route exact path="/">
            {products && (
              <Products products={products} onAddToCart={handleAddToCart} />
            )}
          </Route>
          <Route exact path="/cart">
            <Cart
              cart={cart}
              handleUpdateCartQty={handleUpdateCartQty}
              handleRemoveFromCart={handleRemoveFromCart}
              handleEmptyCart={handleEmptyCart}
            />
          </Route>
          <Route exact path="/checkout">
            <Checkout 
              cart={cart}
              order={order}
              onCaptureCheckout={onCaptureCheckout}
              error={errorMessage}
              />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
