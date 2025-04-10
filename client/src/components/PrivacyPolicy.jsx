import React, { useState } from "react";
import "./css/PrivacyPolicy.css";

function PrivacyPolicy() {
  const [activeIndex, setActiveIndex] = useState(null);

  const policies = [
    {
      question: "Your Payment Details",
      answer:
        "We ensure that your payment information is processed securely. Our systems comply with the highest standards of PCI-DSS (Payment Card Industry Data Security Standard) to safeguard your financial details.",
    },
    {
      question: "Your Sensitive Data",
      answer:
        "Sensitive data such as your personal identification, address, and preferences are encrypted and stored securely. We use state-of-the-art encryption protocols to ensure your privacy.",
    },
    {
      question: "When a Hack or Data Leak Occurs",
      answer:
        "In the rare event of a data breach, we have a rapid response plan in place. Affected users will be notified within 72 hours, and we will take all necessary actions to mitigate the breach and prevent future occurrences.",
    },
    {
      question: "Sri Lankan Law Compliance",
      answer:
        "Our operations comply with the Personal Data Protection Act of Sri Lanka. We ensure that all data processing activities are lawful, fair, and transparent.",
    },
    {
      question: "Our Standards",
      answer:
        "We adhere to global privacy standards, including GDPR (General Data Protection Regulation) and CCPA (California Consumer Privacy Act), to provide you with the best data protection practices.",
    },
  ];

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (<> <br/><br/>
    <div className="privacy-policy-container">
      <h1 className="privacy-policy-heading">Privacy Policy</h1>
      <div className="faq-section">
        {policies.map((policy, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
            onClick={() => toggleAnswer(index)}
          >
            <div className="faq-question">
              {policy.question}
              <span className="toggle-icon">
                {activeIndex === index ? "-" : "+"}
              </span>
            </div>
            {activeIndex === index && (
              <div className="faq-answer">{policy.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
    </>);
}

export default PrivacyPolicy;
