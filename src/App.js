import React, {useState, useEffect} from 'react';
import {Products, Navbar} from './components'; //for this - default export in index.js in components
import {commerce} from './lib/Commerce';

const App = () => {
    const [products, setProducts] = useState([]);
    const fetchProducts = async ()=> {
        const {data} = await commerce.products.list();
        setProducts(data)
    }

    useEffect(() => {
        fetchProducts();
    }, []) //run at the start on the render

    // console.log(products);

    return (
        <div>
            <Navbar />
            <Products products={products}/>
        </div>
    )
}

export default App;