import React from 'react';
import {Products, Navbar} from './components'; //for this - default export in index.js in components

const App = () => {
    return (
        <div>
            <Navbar />
            <Products/>
        </div>
    )
}

export default App;
