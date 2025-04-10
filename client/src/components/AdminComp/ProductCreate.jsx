import React, { useState } from 'react';
import { createProduct } from '../../service/ApiAdmin';
import'../css/acp.css';

function ProductCreate() {
  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    stockCount: '',
    colors: '',
    availableSize: '',
    rating: 0,
  });
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'category' || name === 'colors' || name === 'availableSize') {
      setProduct({
        ...product,
        [name]: value.split(',').map((item) => item.trim()),
      });
    } else {
      setProduct({
        ...product,
        [name]: value,
      });
    }
  };

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formData = new FormData();
      formData.append('productData', JSON.stringify(product));
      Array.from(images).forEach((file) => {
        formData.append('images', file);
      });
  
      // Debugging FormData contents
      for (const pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
  
      // Call the API
      const response = await createProduct(formData);
      console.log('Product successfully created:', response);
      alert('Product created successfully!');
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Failed to create product.');
    }
  };
  
  return (
    <div className="admin-create-product-page">
      <h2 style={{
  textAlign: 'center',
  fontSize: '2rem',
  color: '#6fdbff',
  marginBottom: '20px'
}}>Create Product</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label className="form-label">Product Name:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Category (comma-separated):</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Price:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Description:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="form-textarea"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Stock Count:</label>
          <input
            type="number"
            name="stockCount"
            value={product.stockCount}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Images:</label>
          <input type="file" multiple onChange={handleImageChange} className="form-input" />
        </div>
        <div className="form-group">
          <label className="form-label">Colors (comma-separated):</label>
          <input
            type="text"
            name="colors"
            value={product.colors}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Available Sizes (comma-separated):</label>
          <input
            type="text"
            name="availableSize"
            value={product.availableSize}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Rating (out of 5):</label>
          <input
            type="number"
            name="rating"
            value={product.rating}
            onChange={handleChange}
            className="form-input"
            max="5"
            min="0"
          />
        </div>
        <button type="submit" className="form-button">Create Product</button>
      </form>
    </div>
  );
}

export default ProductCreate;






// import React, { useState } from 'react';
// import { createProduct } from '../../service/ApiAdmin';
// import'../css/acp.css';
// function ProductCreate() {
//   const [product, setProduct] = useState({
//     name: '',
//     category: '',
//     price: '',
//     description: '',
//     stockCount: '',
//     images: '',
//     colors: '',
//     availableSize: '',
//     rating: 0,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === 'category' || name === 'images' || name === 'colors' || name === 'availableSize') {
//       setProduct({
//         ...product,
//         [name]: value.split(',').map((item) => item.trim()),
//       });
//     } else {
//       setProduct({
//         ...product,
//         [name]: value,
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Call the API to create a product
//       const response = await createProduct(product);
//       console.log('Product successfully created:', response);
//       alert('Product created successfully!');
//       // Reset form after successful submission
//       setProduct({
//         name: '',
//         category: '',
//         price: '',
//         description: '',
//         stockCount: '',
//         images: '',
//         colors: '',
//         availableSize: '',
//         rating: 0,
//       });
//     } catch (error) {
//       console.error('Error creating product:', error);
//       alert('Failed to create product.');
//     }
//   };

//   return (
//     <div className="admin-create-product-page">
//       <h2 className="form-title">Create Product</h2>
//       <form onSubmit={handleSubmit} className="product-form">
//         <div className="form-group">
//           <label className="form-label">Product Name:</label>
//           <input
//             type="text"
//             name="name"
//             value={product.name}
//             onChange={handleChange}
//             className="form-input"
//           />
//         </div>
//         <div className="form-group">
//           <label className="form-label">Category (comma-separated):</label>
//           <input
//             type="text"
//             name="category"
//             value={product.category}
//             onChange={handleChange}
//             className="form-input"
//           />
//         </div>
//         <div className="form-group">
//           <label className="form-label">Price:</label>
//           <input
//             type="number"
//             name="price"
//             value={product.price}
//             onChange={handleChange}
//             className="form-input"
//           />
//         </div>
//         <div className="form-group">
//           <label className="form-label">Description:</label>
//           <textarea
//             name="description"
//             value={product.description}
//             onChange={handleChange}
//             className="form-textarea"
//           />
//         </div>
//         <div className="form-group">
//           <label className="form-label">Stock Count:</label>
//           <input
//             type="number"
//             name="stockCount"
//             value={product.stockCount}
//             onChange={handleChange}
//             className="form-input"
//           />
//         </div>
//         <div className="form-group">
//           <label className="form-label">Images Links (comma-separated):</label>
//           <input
//             type="text"
//             name="images"
//             value={product.images}
//             onChange={handleChange}
//             className="form-input"
//           />
//         </div>
//         <div className="form-group">
//           <label className="form-label">Colors (comma-separated):</label>
//           <input
//             type="text"
//             name="colors"
//             value={product.colors}
//             onChange={handleChange}
//             className="form-input"
//           />
//         </div>
//         <div className="form-group">
//           <label className="form-label">Available Sizes (comma-separated):</label>
//           <input
//             type="text"
//             name="availableSize"
//             value={product.availableSize}
//             onChange={handleChange}
//             className="form-input"
//           />
//         </div>
//         <div className="form-group">
//           <label className="form-label">Rating (out of 5):</label>
//           <input
//             type="number"
//             name="rating"
//             value={product.rating}
//             onChange={handleChange}
//             className="form-input"
//             max="5"
//             min="0"
//           />
//         </div>
//         <button type="submit" className="form-button">Create Product</button>
//       </form>
//     </div>
//   );
// }

// export default ProductCreate;
