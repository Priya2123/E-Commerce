import React from 'react'
import {InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core'
import {useForm, FormProvider} from 'react-hook-form'
import CustomTextField from './CustomTextField';

const AddressForm = () => {

    const methods = useForm();
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
                 </Grid>
             </form>
         </FormProvider>
        </>
    )
}

export default AddressForm
