import React from 'react'
import { TextField, Grid } from '@material-ui/core'
import { Controller, useFormContext } from 'react-hook-form'

const CustomTextField = ({ name, label, required }) => {
  const { control } = useFormContext()

  return (
    <Grid item xs={12} sm={6}>
      <Controller
        as={TextField}
        defaultValue=""
        control={control}
        name={name}
        required={required}
        label={label}
        fullWidth
        render={({ field }) => <TextField {...field} fullWidth name={name} label={label} required />}
      />
    </Grid>
  )
}

export default CustomTextField
