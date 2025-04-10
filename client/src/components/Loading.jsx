// import React from 'react';
// import './css/Loading.css'; // Import the CSS file

// const Loading = () => {
//   return (
//     <div className="loading-container">
//       <div className="spinner"></div>
//       <p className="loading-text">Loading...</p>
//     </div>
//   );
// };

// export default Loading;






import React from 'react';
import './css/Loading.css'; // Import the CSS file

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="multi-spinner">
        <div className="spinner-circle"></div>
        <div className="spinner-circle"></div>
        <div className="spinner-circle"></div>
      </div>
      <p className="loading-text">Please wait...</p>
    </div>
  );
};

export default Loading;
