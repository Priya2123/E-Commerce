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
        const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId)
        setShippingCountries(countries) //complete OBJECT and not an array
        //[AL, AT, BA and so on --> object]
        setShippingCountry(Object.keys(countries)[0]) //item with keys as AL for value alabania
    } 

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)
    })

    //converting object into array to map
    const countries = Object.entries(shippingCountries).map(([code, name]) => ({id: code, label: name}))
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
                     <Grid item xs={12} sm={6}>
                         <InputLabel>Shipping Country</InputLabel>
                         <Select value={shippingCountry} onChange={(e) => setShippingCountry(e.target.value)} fullWidth>
                            {countries.map((country) => (
                                <MenuItem key={country.id} value={country.id}>
                                 {country.label}
                             </MenuItem>
                            ))}
                         </Select>
                     </Grid>
                     {/* <Grid item xs={12} sm={6}>
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
