import React from 'react';
import './css/Bottom.css';

const Bottom = () => {
  return (
    <footer className="bottom-bar">
      <div className="bottom-container">
        {/* Column Sections */}
        <div className="footer-columns">
          <div className="footer-column">
            <h3>Explore More </h3>
            <ul className="footer-links">
              <li><a href="#careers">Careers</a></li>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#about">About Chandra</a></li>
              <li><a href="#investor">Investor Relations</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Privacy & Terms</h3>
            <ul className="footer-links">
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#help">Help</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>
        </div>

                {/* Image Section */}
                <div className="footer-images">
          <h3>Our Achievements</h3>
          <div className="image-row">
            <div className="image-box"><img src="https://th.bing.com/th/id/OIP.MraRTq34z4WHd-Zca-eK6gHaDt?rs=1&pid=ImgDetMain" alt="Product 1" /></div>
            <div className="image-box"><img src="https://www.americanbazaaronline.com/wp-content/uploads/2016/07/Life-time-achievment-award-given-to-Hanumandas-Lahoti-by-Prabhulal-Rathi-e1468614830811.jpg" alt="Product 2" /></div>
          </div>
          <div className="image-row">
            <div className="image-box"><img src="https://th.bing.com/th/id/R.b3fca915fb53e81c1049efa14517bca0?rik=tq%2bw9ZVwQNUn3w&riu=http%3a%2f%2fd146tiw5d2a33m.cloudfront.net%2fproduct_images%2fSAM28GO.jpg&ehk=Vl%2fvH0jOLLvRmBOQo%2f5zQHkWiTwAdo%2btkmDPcNiPt7E%3d&risl=&pid=ImgRaw&r=0" alt="Product 3" /></div>
            <div className="image-box"><img src="https://www.diyawards.com/images/products/themes/diy_html5_2018/65-detail-business-achievement-award.jpg" alt="Product 4" /></div>
          </div>
        </div>
        {/* Google Map Section */}
        <div className="footer-map">
          <h3>Visit Us</h3>
          <p>Chandra Textiles</p>
          <p>213 Tissa Road, TG, Colombo 00100 ·  1 km</p>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.912808213814!2d79.85205341531846!3d6.927079495556996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2597496a1c1df%3A0x93edb3e9be1c93cd!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2slk!4v1619037426952!5m2!1sen!2slk"
            width="100%"
            height="250"
            style={{ border: 0, borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>


      </div>

      {/* Footer Bottom Bar */}
      <div className="bottom-bar-text">
        <p>&copy; 2024 Chandra Textile. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Bottom;
