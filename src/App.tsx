import React from 'react';
import './App.css';
import ProductList from './components/products/ProductList';
import Header from './partials/Header';

function App() {
  return (
    <div className="App">
      <Header/>
      <ProductList/>
    </div>
  );
}

export default App;
