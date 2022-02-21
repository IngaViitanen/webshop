import { GlobalContext, MyGlobalContext } from './context/Context';
import React, {useState} from 'react';
import './App.css';
import ProductList from './components/products/ProductList';
import Header from './partials/Header';
import {Products, CartItem} from "./models/Products"

function App() {
  const [products, setProducts] = useState<Products[]>([] as Products[])
  const [cart, setCart] = useState<CartItem[]>([] as CartItem[]) 
  console.log(cart)

  const values: GlobalContext = {products, setProducts, cart, setCart}
  return (
    <MyGlobalContext.Provider value={ values }>
    <div className="App" >
      <Header id={''} image={''} productName={''} description={''} facts={[]} price={0} quantity={0} />
      <ProductList />
    </div>
    </MyGlobalContext.Provider>
  );
}

export default App;
