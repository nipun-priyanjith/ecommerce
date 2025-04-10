import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [userId, setUserId] = useState(() => localStorage.getItem('user')); // Replace 'guest' with actual user logic
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem(`cartItems_${userId}`);
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem(`cartItems_${userId}`, JSON.stringify(cartItems));
  }, [cartItems, userId]);

  const addToCart = (product) => {
    if (!product.price || isNaN(product.price)) {
      console.error('Invalid product price:', product);
      return;
    }

    if (!product.quantity || isNaN(product.quantity) || product.quantity < 1) {
      console.error('Invalid product quantity:', product);
      return;
    }

    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      }
      return [...prev, product];
    });
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const switchUser = (newUserId) => {
    localStorage.setItem('userId', newUserId);
    setUserId(newUserId);
    const savedCart = localStorage.getItem(`cartItems_${newUserId}`);
    setCartItems(savedCart ? JSON.parse(savedCart) : []);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        switchUser,
        userId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};


























// // CartContext.js
// import React, { createContext, useState, useEffect } from 'react';

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState(() => {
//     const savedCart = localStorage.getItem('cartItems');
//     return savedCart ? JSON.parse(savedCart) : [];
//   });

//   useEffect(() => {
//     localStorage.setItem('cartItems', JSON.stringify(cartItems));
//   }, [cartItems]);

//   const addToCart = (product) => {
//     if (!product.price || isNaN(product.price)) {
//       console.error('Invalid product price:', product);
//       return;
//     }
  
//     if (!product.quantity || isNaN(product.quantity) || product.quantity < 1) {
//       console.error('Invalid product quantity:', product);
//       return;
//     }
  
//     setCartItems((prev) => {
//       const existingItem = prev.find((item) => item.id === product.id);
//       if (existingItem) {
//         return prev.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + product.quantity }
//             : item
//         );
//       }
//       return [...prev, product];
//     });
//   };
  
  

//   const updateQuantity = (productId, quantity) => {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item.id === productId ? { ...item, quantity } : item
//       )
//     );
//   };

//   const removeFromCart = (productId) => {
//     setCartItems((prev) => prev.filter((item) => item.id !== productId));
//   };

//   const clearCart = () => {
//     setCartItems([]);
//   };

//   return (
//     <CartContext.Provider
//       value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

