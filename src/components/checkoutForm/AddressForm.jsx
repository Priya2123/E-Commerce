import React, {useEffect, useState} from 'react'
import {InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core'
import {useForm, FormProvider} from 'react-hook-form'
import CustomTextField from './CustomTextField';
import {commerce} from '../../lib/commerce';

const AddressForm = ({checkoutToken}) => {
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');

    const methods = useForm();

    const fetchShippingCountries = async (checkoutTokenId) => {
        const {countries} = await commerce.services.locale.ListShippingCountries(checkoutTokenId)
        setShippingCountries(countries)
    } 

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)
    })
    return (
        <>
         <Typography variant="h6" gutterBottom>Shipping Address</Typography>   
         <FormProvider {...methods}>
             <form onSubmit=''>
                 <Grid container spacing={3}>
                     <CustomTextField required name='first name' label='First name' />
                     <CustomTextField required name='last name' label='Last name' />
                     <CustomTextField required name='address' label='Address' />
                     <CustomTextField required name='email' label='Email' />
                     <CustomTextField required name='city' label='City' />
                     <CustomTextField required name='zip' label='ZIP / Portal code' />
                     {/* <Grid item xs={12} sm={6}>
                         <InputLabel>Shipping Country</InputLabel>
                         <Select value={} onChange={} fullWidth>
                             <MenuItem key={} value={}>
                                 Select Me
                             </MenuItem>
                         </Select>
                     </Grid>
                     <Grid item xs={12} sm={6}>
                         <InputLabel>Shipping Subdivision</InputLabel>
                         <Select value={} onChange={} fullWidth>
                             <MenuItem key={} value={}>
                                 Select Me
                             </MenuItem>
                         </Select>
                     </Grid>
                     <Grid item xs={12} sm={6}>
                         <InputLabel>Shipping Options</InputLabel>
                         <Select value={} onChange={} fullWidth>
                             <MenuItem key={} value={}>
                                 Select Me
                             </MenuItem>
                         </Select>
                     </Grid> */}
                 </Grid>
             </form>
         </FormProvider>
        </>
    )
}

export default AddressForm
