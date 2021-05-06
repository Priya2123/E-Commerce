// connecting react form hook and material ui

import React from 'react'
import {TextField, Grid} from '@material-ui/core';
import {Controller, useFormContext} from 'react-hook-form';

const CustomTextField = ({name, label , required}) => {
    const {control} = useFormContext();
    return (
        <Grid item xs={12} sm={6}>
         <Controller
            as={TextField}
            control={control}
            name={name}
            required={required}
            label={label}
            fullWidth
            defaultValue=""
            render = {({ field})=> (
                <TextField
                    fullWidth
                    label={label}
                    required
                />
            )}
         />
        </Grid>
    )
}

export default CustomTextField
