import React, { useState } from "react";
import { useToast } from "../context/ToastContext";

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!name || !email || !message) {
      addToast("Please fill out all required fields (Name, Email, Message).", "warning");
      return;
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      addToast("Please enter a valid email address.", "warning");
      return;
    }
    // Phone number validation (exactly 10 digits)
    if (phone && !/^\d{10}$/.test(phone)) {
      addToast("Please enter a valid 10-digit phone number.", "warning");
      return;
    }

    setLoading(true);

    // Simulate form submission
    try {
      // In a real application, you would send data to your backend here
      // await axios.post('/api/contact', { name, email, phone, message });

      // Simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      addToast("Your message has been sent successfully!", "success");
      // Clear the form
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (error) {
      console.error("Contact form submission failed:", error);
      addToast("Failed to send your message. Please try again later.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact section" id="contact">
      <div className="section-title">
        <h2>contact us</h2>
      </div>
      <div className="contact-center section-center">
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="input-name">
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-email">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-phone-no">
            <input
              type="text"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="input-msg">
            <textarea
              placeholder="Enter your message here...."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <div className="form-btn">
            <button type="submit" className="submit-btn btn" disabled={loading}>
              {loading ? 'Sending...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
