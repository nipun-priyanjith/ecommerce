import React, { useContext} from 'react';
import { ProductContext } from '../../context/ProductContext';
import'../css/avp.css';
import Loading from '../Loading';
function ProductRead() {

  const { products, loading, error } = useContext(ProductContext);

  if (loading) return <Loading/>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="product-read-container">
      <h1 className="product-title">Product List</h1>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product._id} className="product-item">
            <h2 className="product-name">{product.name}</h2>
            <p className="product-category">Category: {product.category.join(", ")}</p>
            <p className="product-price">Price: ${product.price.toFixed(2)}</p>
            <p className="product-description">Description: {product.description}</p>
            <p className="product-stock">Stock Count: {product.stockCount}</p>
            <p className="product-colors">Colors: {product.colors.join(", ")}</p>
            <p className="product-sizes">Sizes: {product.availableSize.join(", ")}</p>
            <p className="product-rating">Rating: {product.rating} / 5</p>
            <div className="product-images">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.name} image ${index + 1}`}
                  className="product-image"
                />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ProductRead