import React from 'react';
import { Link } from 'react-router-dom';
const ProductsList = ({ products }) => {
  return (
    <div>
      <h2>Product List</h2>
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>${product.price.toFixed(2)}</p>
          <Link to={`/product/${product.id}`}> view more</Link>
        </div>
      ))}
    </div>
  );
};

export default ProductsList;
