import React, { useState, useEffect } from 'react'
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Divider,
  CircularProgress,
  Button,
  Typography,
} from '@material-ui/core'
import useStyles from './styles'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import {commerce} from '../../../lib/commerce'

const steps = ['Shipping address', 'Payment details']

const Checkout = ({cart}) => {
  const classes = useStyles()
  //0 - shipping , 1 - payment, 2 - confirmation
  const [activeStep, setActiveStep] = useState(0)
  const [checkoutToken, setCheckoutToken] = useState(null)

  useEffect(() => {
    const generateToken = async () => {
        try {
            const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'})
            setCheckoutToken(token)
        } catch (error) {
            
        }
    }
    generateToken()
  }, [])

  const Confirmation = () => <div>Confirmation</div>

  const Form = () => (activeStep === 0 ? <AddressForm checkoutToken={checkoutToken} /> : <PaymentForm />)

  return (
    <>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {/* steps.length = last step or last element of array */}
          {activeStep === steps.length ? <Confirmation /> : <Form />}
        </Paper>
      </main>
    </>
  )
}

export default Checkout
