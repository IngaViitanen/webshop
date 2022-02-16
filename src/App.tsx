import { MyGlobalContext } from './context/Context';
import React, {useState} from 'react';
import './App.css';
import ProductList from './components/products/ProductList';
import Header from './partials/Header';
import {Products} from "./models/Products"

// interface Props {
//   handleCart: (item: Products) => void
// }

function App() {
  const [products, setProducts] = useState<Products[]>([])
  const [cart, setCart] = useState([]) //<Products | []>

  const values = {products, setProducts, cart, setCart}
  return (
    <MyGlobalContext.Provider value= { values }>
    <div className="App" >
      <Header id={''} image={''} productName={''} description={''} facts={[]} price={0} quantity={0} cartQuantity={0}/>
      <ProductList />
    </div>
    </MyGlobalContext.Provider>
  );
}

export default App;
