import React, {useState, useEffect} from 'react';
import {commerce} from './lib/commerce';
import {Products, Navbar} from './components'; //for this - default export in index.js in components
import Cart from './components/cart/Cart';

const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});

    const fetchProducts = async () => {
        const response = await commerce.products.list();   //{data}
       if (response) {
        setProducts([...products,response.data]);
       }
    };
 
    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve())
    }

    const handleAddToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity)

        setCart(item.cart);
    }
    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);
     //run at the start on the render

    console.log(products);
    console.log(cart);

    return (
        <div>
            <Navbar totalItems={cart.total_items} />
            {/* {products && <Products products={products} onAddToCart={handleAddToCart} />}  */}
            <Cart cart={cart}/>
            {/* {products?.length > 0 && <Products products={products} />} */}
        </div>
    )
}

export default App;