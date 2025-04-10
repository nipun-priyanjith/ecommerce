import React, { useState } from "react";
import "./Chatbot.css";
import { IoCloseCircle } from "react-icons/io5"; // Close button icon
import Loading from "../components/Loading";

const Chatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://192.168.88.131:5002/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      const botMessage = { role: "bot", content: data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error communicating with chatbot:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-box">
        <div className="chatbot-header">
          <h2>Chatbot</h2>
          <IoCloseCircle className="close-icon" onClick={onClose} />
        </div>

        <div className="chatbot-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.role}`}>
              <span className="message-bubble">{msg.content}</span>
            </div>
          ))}
          {loading && <>loading ...</>}
        </div>

        <div className="chatbot-input">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;










// import React, { useState } from "react";
// import './Chatbot.css';

// import Loading from "../components/Loading";
// const Loadingg = () => (

//     <div className="loading-overlay">
//       <div className="loading-spinner"></div>
//     </div>
// );

// const Chatbot = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage = { role: "user", content: input };
//     setMessages([...messages, userMessage]);
//     setInput("");
//     setLoading(true);

//     try {
//       const response = await fetch("http://127.0.0.1:5000/chatbot", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ message: input }),
//       });
//       const data = await response.json();
//       const botMessage = { role: "bot", content: data.reply };
//       setMessages((prev) => [...prev, botMessage]);
//     } catch (error) {
//       console.error("Error communicating with chatbot:", error);
//     } finally {
//       setLoading(false); // Stop loading after response
//     }
//   };

//   return (
//     <div className="chatbot-container">
//       <div className="chatbot-box">
//         <h2 className="chatbot-title">Chatbot</h2>
//         <div className="chatbot-messages">
//           {messages.map((msg, index) => (
//             <div key={index} className={`chat-message ${msg.role === "user" ? "user-message" : "bot-message"}`}>
//               <span className={`message-bubble ${msg.role === "user" ? "user-bubble" : "bot-bubble"}`}>
//                 {msg.content}
//               </span>
//             </div>
//           ))}
//           {loading && <Loadingg/>}
//         </div>
//         <div className="chatbot-input">
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             className="chat-input"
//             placeholder="Type a message..."
//           />
//           <button
//             onClick={sendMessage}
//             className="chat-send-button"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;





