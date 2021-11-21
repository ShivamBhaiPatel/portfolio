import React from "react";
import "./contact.css";

const Contact = () => {
  return (
    <div>
      <h1>Contact Us</h1>
      <div className="contact-container">
        <div className="contact-info">
          <h4>Contact Information</h4>
          <p>some text</p>
          <div className="icon-text">
            <i className="icon"></i>
            <span>text</span>
          </div>
          <div className="social-media">
              <a href="#" className="icon-circle">
              <i class="fas fa-mobile-alt"></i>
              </a>
          </div>
        </div>
        <form></form>
      </div>
    </div>
  );
};

export default Contact;
