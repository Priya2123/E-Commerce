import React from 'react';
import {Grid} from '@material-ui/core';
import Product from './product/Product';

const productList = [
    {id:1, name:"Shoes", description:"Running shoes", price:"$5" ,image:'https://images.pexels.com/photos/1989836/pexels-photo-1989836.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'},
    {id:2, name:"MacBook", description:"mac", price: "$20", image:'https://images.pexels.com/photos/1181288/pexels-photo-1181288.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'},
]

const Products = () => {
    return(
        <main>
        <Grid container justify="center" spacing={4}>
            {productList.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                    <Product product={product} />
                </Grid> 
            )) }
        </Grid>
    </main>
)
}

export default Products;