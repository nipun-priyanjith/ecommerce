import React, { useState } from "react";
import "./css/Help.css";


function Help() {
  const faqData = [
    {
      question: "How can I track my order?",
      answer:
        "You can track your order by navigating to the 'My Orders' section and selecting the order you want to track. You’ll find real-time updates there.",
    },
    {
      question: "What is the return policy?",
      answer:
        "You can return items within 30 days of delivery. Make sure the product is in its original condition with all tags intact.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can contact our customer support via the 'Contact Us' page or by emailing support@ecommerce.com.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept major credit/debit cards, PayPal, and other local payment methods based on your region.",
    },
    {
      question: "Can I change or cancel my order?",
      answer:
        "Orders can be modified or canceled within 2 hours of placing them. Visit the 'My Orders' section for options.",
    },
    {
      question: "Other?",
      answer:
        "Send a mail for   helpchandra@gmail.com",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (<><br/><br/>
    
    <div className="help-container">
      <h1 className="help-heading">Help & FAQs</h1>
      <div className="faq-section">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              <span>{faq.question}</span>
              <span className="toggle-icon">
                {activeIndex === index ? "-" : "+"}
              </span>
            </div>
            {activeIndex === index && (
              <div className="faq-answer">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div><br/><br/><br/><br/></>
  );
}

export default Help;
