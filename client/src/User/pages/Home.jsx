import React, { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../context/ProductContext';
import { Link } from 'react-router-dom';
import ProductsList from '../../components/ProductsList';
import NavBar from '../../components/NavBar';
import SerchBar from '../../components/SerchBar';
import '../../components/css/h.css';
import Loading from '../../components/Loading';
import Bottom from '../../components/Buttom';
import { FaRobot } from 'react-icons/fa';

function Home() {
  const { products, loading, error } = useContext(ProductContext);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(true);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");

  // Get user data from localStorage
  const userData = JSON.parse(localStorage.getItem('user'));
  const userId = userData ? userData._id : null;
  console.log(userId);

  useEffect(() => {
    if (userId) {
      const fetchRecommendations = async () => {
        try {
          const response = await fetch(`http://ml-service:5001/recommend/${userId}`);
          console.log(response);
          const data = await response.json();
          
          if (data.recommendations) {
            setRecommendedProducts(data.recommendations);
          } else {
            setRecommendedProducts([]);
          }
        } catch (err) {
          console.error('Error fetching recommendations:', err);
        } finally {
          setLoadingRecommendations(false);
        }
      };
      fetchRecommendations();
    }
  }, [userId]);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;

    const newMessage = { text: userMessage, sender: "user" };
    setChatMessages([...chatMessages, newMessage]);
    setUserMessage("");

    try {
      const response = await fetch('http://192.168.88.131:5002/chatbot', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await response.json();
      setChatMessages([...chatMessages, newMessage, { text: data.reply, sender: "bot" }]);
    } catch (err) {
      console.error("Chatbot error:", err);
    }
  };

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <NavBar />
      <div className="home-container">
        <SerchBar />
        <h1 className="home-heading"></h1>

        {loadingRecommendations ? (
          <Loading />
        ) : (
          <div className="product-grid">
            {recommendedProducts.length > 0 ? (
              recommendedProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-img-container">
                    <img src={product.images[0]} alt={product.name} className="product-img" />
                  </div>
                  <div className="product-info">
                    <h2 className="product-name">{product.name}</h2>
                    <p className="product-category">
                      Category: {product.category && Array.isArray(product.category) ? product.category.join(", ") : product.category || "N/A"}
                    </p>
                    <div className="product-price-rating">
                      <p className="product-price">${product.price.toFixed(2)}</p>
                      <p className="product-rating">
                        {product.rating} <span className="star-rating">★</span>
                      </p>
                    </div>
                    <Link to={`/product/${product.id}`} className="view-more-btn">
                      <button>View More</button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p>No recommendations available.</p>
            )}
          </div>
        )}
      </div>
      <Bottom />

      <div className="chatbot-icon" onClick={toggleChatbot} style={{ backgroundColor: 'white', borderRadius: '50%', padding: '10px' }}>
  
  
  
  <FaRobot color="#ff3131" size={60} />
</div>

      {/* Chatbot Window */}
      {isChatbotOpen && (
        <div className="chatbot-container open">
          <div className="chatbot-header">
            <span>Chatbot</span>

















            <FaRobot className="close-icon" onClick={toggleChatbot} />
          </div>
          <div className="chatbot-messages">
            {chatMessages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender}`}>
                <div className={`message-bubble ${msg.sender}`}>{msg.text}</div>
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Type a message..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;























// import React, { useContext, useEffect, useState } from 'react';
// import { ProductContext } from '../../context/ProductContext';
// import { Link } from 'react-router-dom';
// import ProductsList from '../../components/ProductsList';
// import NavBar from '../../components/NavBar';
// import SerchBar from '../../components/SerchBar';
// import '../../components/css/h.css';
// import Loading from '../../components/Loading';
// import Bottom from '../../components/Buttom';

// function Home() {
//   const { products, loading, error } = useContext(ProductContext);
//   const [recommendedProducts, setRecommendedProducts] = useState([]);
//   const [loadingRecommendations, setLoadingRecommendations] = useState(true);

//   // Get user data from localStorage
//   const userData = JSON.parse(localStorage.getItem('user'));
//   const userId = userData ? userData._id : null;
//   console.log(userId); 
//   useEffect(() => {
//     if (userId) {
//       // Fetch recommendations from Flask API
//       const fetchRecommendations = async () => {
//         try {
//           const response = await fetch(`http://127.0.0.1:5000/recommend/${userId}`);
//           console.log(response);
//           const data = await response.json();
          
//           if (data.recommendations) {
//             setRecommendedProducts(data.recommendations);
//           } else {
//             setRecommendedProducts([]);
//           }
//         } catch (err) {
//           console.error('Error fetching recommendations:', err);
//         } finally {
//           setLoadingRecommendations(false);
//         }
//       };

//       fetchRecommendations();
//     }
//   }, [userId]);

//   if (loading) return <Loading/>;
//   if (error) return <div>Error: {error}</div>;

//   return (<><NavBar />
//     <div className="home-container">
      
//       <SerchBar />
//       <h1 className="home-heading"></h1>
      
//       {loadingRecommendations ? (
//         <Loading/>
//       ) : (
//         <div className="product-grid">
//           {recommendedProducts.length > 0 ? (
//             recommendedProducts.map((product) => (
//               <div key={product.id} className="product-card">
//                 <div className="product-img-container">
//                   <img
//                     src={product.images[0]}
//                     alt={product.name}
//                     className="product-img"
//                   />
//                 </div>
//                 <div className="product-info">
//                   <h2 className="product-name">{product.name}</h2>
//                   <p className="product-category">
//   Category: {product.category && Array.isArray(product.category) ? product.category.join(", ") : product.category || "N/A"}
// </p>

//                   <div className="product-price-rating">
//                     <p className="product-price">${product.price.toFixed(2)}</p>
//                     <p className="product-rating">
//                       {product.rating} <span className="star-rating">★</span>
//                     </p>
//                   </div>
//                   <Link to={`/product/${product.id}`} className="view-more-btn">
//                     <button>View More</button>
//                   </Link>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No recommendations available.</p>
//           )}
//         </div>
//       )}
//     </div><Bottom/></>
//   );
// }

// export default Home;


