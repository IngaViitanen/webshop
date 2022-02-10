import React from 'react';
import './App.css';
import ProductList from './components/products/ProductList';
import Header from './partials/Header';

function App() {
  return (
    <div className="App">
      <Header id={''} image={''} productName={''} description={''} facts={[]} price={0} quantity={0}/>
      <ProductList/>
    </div>
  );
}

export default App;
