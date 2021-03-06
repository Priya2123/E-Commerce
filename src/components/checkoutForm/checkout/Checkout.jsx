import React, { useState, useEffect } from 'react'
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Divider,
  Button,
  CircularProgress,
  CssBaseline
} from '@material-ui/core'
import useStyles from './styles'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import {commerce} from '../../../lib/commerce'
import {useHistory, Link} from 'react-router-dom'
const steps = ['Shipping address', 'Payment details']

const Checkout = ({cart, order, onCaptureCheckout, error}) => {
  const classes = useStyles()
  const history = useHistory();
  //0 - shipping , 1 - payment, 2 - confirmation
  const [activeStep, setActiveStep] = useState(0)
  const [checkoutToken, setCheckoutToken] = useState(null)
  const [shippingData, setShippingData] = useState({})
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    const generateToken = async () => {
        try {
            const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'})
            setCheckoutToken(token)
        }catch {
          if (activeStep !== steps.length) history.push('/');
        }
    }
    generateToken()
  }, [cart])

  const nextStep = () => setActiveStep((prevStep) => prevStep + 1);
  const backStep = () => setActiveStep((prevStep) => prevStep - 1);

//as soon as the cart changes, we have to recall for another token --> to avoid error of undefined on refresh

const timeout = () => {
  setTimeout(() => {
    setIsFinished(true)
  }, 3000)
}

let Confirmation = () => (order.customer ? (
  <>
    <div>
      <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
      <Divider className={classes.divider} />
      <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
    </div>
    <br />
    <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
  </>
) : isFinished ? (
  <>
    <div>
      <Typography variant="h5">Thank you for your purchase</Typography>
      <Divider className={classes.divider} />
    </div>
    <br />
    <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
  </>
) : (
  <div className={classes.spinner}>
    <CircularProgress />
  </div>
));

  if (error) {
    Confirmation = () => (
      <>
        <Typography variant="h5">Error: {error}</Typography>
        <br />
        <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
      </>
    );
  }

  const Form = () => (activeStep === 0 
    ? <AddressForm checkoutToken={checkoutToken} next={next} nextStep={nextStep} setShippingData={setShippingData}/> 
    : <PaymentForm nectStep={nextStep} onCaptureCheckout={onCaptureCheckout} backStep={backStep} shippingData={shippingData} checkoutToken={checkoutToken} nextStep={nextStep} timeout={timeout} />)

    const next = (data) => {
      setShippingData(data)
      console.log("data",data)
      nextStep()
    }
  return (
    <>
    <CssBaseline />
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
          {/* steps.length = last step or last element of array  */}
          {/* checkoutToken && Form --> renders the form only when we have token so that no null error occurs */}
          {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
        </Paper>
      </main>
    </>
  )
}

export default Checkout
