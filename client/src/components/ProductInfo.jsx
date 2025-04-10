// import { useParams, useNavigate } from 'react-router-dom';
// import { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import { ProductContext } from '../context/ProductContext';
// import { CartContext } from '../context/CartContext';
// import './css/ProductInfo.css'; // Import CSS file
// import Loading from './Loading';
// import { toast,ToastContainer  } from 'react-toastify';  // Import toastify
// import 'react-toastify/dist/ReactToastify.css';  // Import CSS for toastify

// function ProductInfo() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);
//   const { products } = useContext(ProductContext);
//   const { addToCart } = useContext(CartContext);

//   const [product, setProduct] = useState(null);
//   const [selectedColor, setSelectedColor] = useState('');
//   const [selectedSize, setSelectedSize] = useState('');
//   const [quantity, setQuantity] = useState(1);
//   const [activeImage, setActiveImage] = useState(0);

//   useEffect(() => {
//     const foundProduct = products.find((prod) => prod._id === id);
//     setProduct(foundProduct);
//   }, [id, products]);

//   const handleAddToCart = () => {
//     if (!user) {
//       toast.error('You must be logged in to add items to the cart');  // Using toast for error
//       return;
//     }

//     if (!selectedColor || !selectedSize || quantity < 1) {
//       toast.error('Please select color, size, and quantity before adding to the cart');  // Error toast
//       return;
//     }

//     const productToAdd = {
//       id: `${product._id}-${selectedColor}-${selectedSize}`,
//       productId: product._id,
//       color: selectedColor,
//       size: selectedSize,
//       quantity,
//       userId: user._id,
//       name: product.name,
//       price: product.price,
//       image: product.images[0],
//     };

//     addToCart(productToAdd);
//     toast.success('Product added to cart!');  // Success toast
//     navigate('/cart');
//   };

//   if (!product) return <Loading />;

//   return (
//     <div className="product-info-container">
//       <header className="product-header">
//         <a href="/" className="logo">
//           Chandra Textile
//         </a>
//         <nav className="nav-links">
//           <a href="/login">User Login</a>
//           <a href="/SignUp">User Register</a>
//         </nav>
//       </header>

//       <div className="product-details">
//         <div className="product-gallery">
//           <img
//             src={product.images[activeImage]}
//             alt={product.name}
//             className="main-product-image"
//           />
//           <div className="image-thumbnails">
//             {product.images.map((img, index) => (
//               <img
//                 key={index}
//                 src={img}
//                 alt={`Thumbnail ${index + 1}`}
//                 className={`thumbnail ${index === activeImage ? 'active' : ''}`}
//                 onClick={() => setActiveImage(index)}
//               />
//             ))}
//           </div>
//         </div>

//         <div className="product-info">
//           <h1 className="product-title">{product.name}</h1>
//           <p className="product-category">
//             Category: {product.category.join(', ')}
//           </p>
//           <p className="product-price">Price: ${product.price.toFixed(2)}</p>
//           <p className="product-rating">
//             Rating: {product.rating} / 5 <span className="rating-stars">⭐⭐⭐⭐⭐</span>
//           </p>
//           <p className="product-description">{product.description}</p>
//           <p className="product-stock">Stock Count: {product.stockCount}</p>

//           <div className="product-options">
//             <div className="color-selection">
//               <p>Select Color:</p>
//               <select
//                 value={selectedColor}
//                 onChange={(e) => setSelectedColor(e.target.value)}
//               >
//                 <option value="">-- Select Color --</option>
//                 {product.colors.map((color, index) => (
//                   <option key={index} value={color}>
//                     {color}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="size-selection">
//               <p>Select Size:</p>
//               <select
//                 value={selectedSize}
//                 onChange={(e) => setSelectedSize(e.target.value)}
//               >
//                 <option value="">-- Select Size --</option>
//                 {product.availableSize.map((size, index) => (
//                   <option key={index} value={size}>
//                     {size}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="quantity-selection">
//               <p>Quantity:</p>
//               <input
//                 type="number"
//                 value={quantity}
//                 onChange={(e) => setQuantity(Number(e.target.value))}
//                 min="1"
//                 max={product.stockCount}
//               />
//             </div>
//           </div>

//           <button onClick={handleAddToCart} className="add-to-cart-button">
//             Add to Cart
//           </button>
//         </div>
//       </div>

//       {/* ToastContainer to display the toast notifications */}
//       <ToastContainer />
//     </div>
//   );
// }

// export default ProductInfo;


import { useParams, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ProductContext } from '../context/ProductContext';
import { CartContext } from '../context/CartContext';
import './css/ProductInfo.css'; // Import CSS file
import Loading from './Loading';
import { toast, ToastContainer } from 'react-toastify';  // Import toastify
import 'react-toastify/dist/ReactToastify.css';  // Import CSS for toastify

function ProductInfo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [ratings, setRatings] = useState([]);

  // Fetch product details
  useEffect(() => {
    const foundProduct = products.find((prod) => prod._id === id);
    setProduct(foundProduct);
  }, [id, products]);

  // Fetch product ratings from backend using Fetch API
  useEffect(() => {
    if (!product) return;

    const fetchRatings = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users/ratings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productId: product._id }),
        });

        const data = await response.json();

        if (data.success) {
          setRatings(data.ratings);
        }
      } catch (error) {
        console.error("Error fetching ratings:", error);
      }
    };

    fetchRatings();
  }, [product]);

  // Handle Add to Cart
  const handleAddToCart = () => {
    if (!user) {
      toast.error('You must be logged in to add items to the cart');
      return;
    }

    if (!selectedColor || !selectedSize || quantity < 1) {
      toast.error('Please select color, size, and quantity before adding to the cart');
      return;
    }

    const productToAdd = {
      id: `${product._id}-${selectedColor}-${selectedSize}`,
      productId: product._id,
      color: selectedColor,
      size: selectedSize,
      quantity,
      userId: user._id,
      name: product.name,
      price: product.price,
      image: product.images[0],
    };

    addToCart(productToAdd);
    toast.success('Product added to cart!');
    navigate('/cart');
  };

  if (!product) return <Loading />;

  return (
    <div className="product-info-container">
      <header className="product-header">
        <a href="/" className="logo">
          Chandra Textile
        </a>
        <nav className="nav-links">
          <a href="/login">User Login</a>
          <a href="/SignUp">User Register</a>
        </nav>
      </header>

      <div className="product-details">
        <div className="product-gallery">
          <img
            src={product.images[activeImage]}
            alt={product.name}
            className="main-product-image"
          />
          <div className="image-thumbnails">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`thumbnail ${index === activeImage ? 'active' : ''}`}
                onClick={() => setActiveImage(index)}
              />
            ))}
          </div>
        </div>

        <div className="product-info">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-category">
            Category: {product.category.join(', ')}
          </p>
          <p className="product-price">Price: ${product.price.toFixed(2)}</p>
          <p className="product-rating">
            Rating: {product.rating} / 5 <span className="rating-stars">⭐⭐⭐⭐⭐</span>
          </p>
          <p className="product-description">{product.description}</p>
          <p className="product-stock">Stock Count: {product.stockCount}</p>

          <div className="product-options">
            <div className="color-selection">
              <p>Select Color:</p>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
              >
                <option value="">-- Select Color --</option>
                {product.colors.map((color, index) => (
                  <option key={index} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>
            <div className="size-selection">
              <p>Select Size:</p>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                <option value="">-- Select Size --</option>
                {product.availableSize.map((size, index) => (
                  <option key={index} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
            <div className="quantity-selection">
              <p>Quantity:</p>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min="1"
                max={product.stockCount}
              />
            </div>
          </div>

          <button onClick={handleAddToCart} className="add-to-cart-button">
            Add to Cart
          </button>
        </div>
      </div>

      {/* Display Product Ratings */}<center>
      <div className="product-reviews">
  <h3>Customer Reviews</h3>
  {ratings.length > 0 ? (
    ratings.map((rating) => (
      <div key={rating._id} className="review">
        <p><strong>{rating.fullName}</strong>: 
          {Array.from({ length: rating.rating }, (_, i) => (
            <span key={i}>⭐</span>
          ))}
        </p>
        <p>{rating.message}</p>
      </div>
    ))
  ) : (
    <p>No reviews yet.</p>
  )}
</div></center>


      {/* ToastContainer to display the toast notifications */}
      <ToastContainer />
    </div>
  );
}

export default ProductInfo;













