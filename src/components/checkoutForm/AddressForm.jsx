import React, { useEffect, useState } from 'react'
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'
import CustomTextField from './CustomTextField'
import { commerce } from '../../lib/commerce'

const AddressForm = ({ checkoutToken }) => {
  const [shippingCountries, setShippingCountries] = useState([])
  const [shippingCountry, setShippingCountry] = useState(" ")
  const [shippingSubdivisions, setShippingSubdivisions] = useState([])
  const [shippingSubdivision, setShippingSubdivision] = useState(" ")
  const [shippingOptions, setShippingOptions] = useState([])
  const [shippingOption, setShippingOption] = useState(" ")

  const methods = useForm()

  //converting object into array to map
  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }))
  const subdivisions = Object.entries(
    shippingSubdivisions,
  ).map(([code, name]) => ({ id: code, label: name }))
  const options = shippingOptions?.map((option) => ({id: option.id, label: `${option.description} - (${option.price.formatted_with_symbol})`}))
  
  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    )
    setShippingCountries(countries) //complete OBJECT and not an array
    //[AL, AT, BA and so on --> object]
    setShippingCountry(Object.keys(countries)[0]) //item with keys as AL for value alabania
  }

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    )
    setShippingSubdivisions(subdivisions)
    setShippingSubdivision(Object.keys(subdivisions)[0])
  }
  //options - array
  const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
    const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {country, region})
    setShippingOptions(options);
    setShippingOption(options[0].id)
  }

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id)
  }, [])

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry)
  }, [shippingCountry])

  useEffect(() => {
    if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision )
  }, [shippingSubdivision])

  const handleCountryChange = (event) => {
    setShippingCountry(event.target.value)
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit="">
          <Grid container spacing={3}>
            <CustomTextField required name="first name" label="First name" />
            <CustomTextField required name="last name" label="Last name" />
            <CustomTextField required name="address" label="Address" />
            <CustomTextField required name="email" label="Email" />
            <CustomTextField required name="city" label="City" />
            <CustomTextField required name="zip" label="ZIP / Portal code" />
            <Grid item xs={12} sm={6}>
              <InputLabel id="shippingCountry" >Shipping Country</InputLabel>
              <Select
                labelId="shippingCountry"
                id="shippingCountry"
                value={shippingCountry}
                fullWidth
                onChange={handleCountryChange}
              >      
                {countries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select
                value={shippingSubdivision}
                labelId="shippingSubdivision"
                id="shippingSubdivision"
                fullWidth
                onChange={(event) => setShippingSubdivision(event.target.value)}
              >
                {subdivisions.map((subdivision) => (
                  <MenuItem key={subdivision.id} value={subdivision.id}>
                    {subdivision.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
                         <InputLabel>Shipping Options</InputLabel>
                         <Select
                value={shippingOption}
                labelId="shippingOption"
                id="shippingOption"
                fullWidth
                onChange={(event) => setShippingOption(event.target.value)}
              >
                {options.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
                     </Grid>
          </Grid>
        </form>
      </FormProvider>
    </>
  )
}

export default AddressForm
