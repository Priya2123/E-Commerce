import React, {useState, useEffect} from 'react';
import {commerce} from './lib/commerce';
import {Products, Navbar} from './components'; //for this - default export in index.js in components

const App = () => {
    const [products, setProducts] = useState([]);
    
    // const fetchProducts = () => {
    //     commerce.products
    //       .list()
    //       .then((res) => {
    //         setProducts([...products, res.data]); //wrapping in array
    //       })
    //       .catch((err) => {
    //         console.log(err, "error");
    //         console.log('Hey beb')
    //       });
    //   };
    const fetchProducts = async () => {
        const response = await commerce.products.list();   //{data}
       if (response) {
        setProducts([...products,response.data]);
       }
    };

    useEffect(() => {
        fetchProducts();
    }, []);
     //run at the start on the render

    console.log(products);

    return (
        <div>
            <Navbar />
            {products && <Products products={products} />} 
            {/* {products?.length > 0 && <Products products={products} />} */}
        </div>
    )
}

export default App;