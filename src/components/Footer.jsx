// src/components/Footer.jsx
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-20 py-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div>
          <h2 className="text-lg font-bold mb-4">📞 Contact Us</h2>
          <p>Phone: +977-9851024439</p>
          <p>Email: machhapuchhrey.grocery@gmail.com</p>
        </div>

        {/* Address */}
        <div>
          <h2 className="text-lg font-bold mb-4">📍 Our Location</h2>
          <p>Koteshwor, Basukinagar Marga</p>
          <p>Kathmandu, Nepal</p>
        </div>

        {/* Google Map Embed */}
        <div className="h-40">
          <iframe
            title="Our Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.513438254236!2d85.34993507509448!3d27.702737525609105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19913a419187%3A0x5a9f3f9ab95750e1!2sBasuki%20Nagar%20Marg%2C%20Kathmandu%2044600!5e0!3m2!1sen!2snp!4v1718700000000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <div className="text-center text-sm text-gray-300 mt-8">
        © {new Date().getFullYear()} Machhapuchhrey Dairy and Grocery Store. All rights reserved.
      </div>
    </footer>
  );
}
