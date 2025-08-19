import React from "react";
import {
  FaPhone,
  FaMapMarkerAlt,
  FaEnvelope,
  FaClock,
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#2C3E50] text-white font-['Playfair_Display']">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 border-t border-white/40">
        {/* Contact Us */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2">
              <FaPhone className="text-[#F4C430]" /> (091) 1234-567
            </p>
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-[#F4C430]" /> No47, Fort, Galle.
            </p>
            <p className="flex items-center gap-2">
              <FaEnvelope className="text-[#F4C430]" />{" "}
              <a
                href="mailto:lessence@gmail.com"
                className="hover:underline"
              >
                lessence@gmail.com
              </a>
            </p>
          </div>
        </div>

        {/* Opening Hours */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Opening Hours</h4>
          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2">
              <FaClock className="text-[#F4C430]" /> Mon - Thu : 11.00 AM - 10.00 PM
            </p>
            <p className="flex items-center gap-2">
              <FaClock className="text-[#F4C430]" /> Fri - Sat : 11.00 AM - 10.30 PM
            </p>
            <p className="flex items-center gap-2">
              <FaClock className="text-[#F4C430]" /> Sun : 11.30 AM - 11.30 PM
            </p>
          </div>
        </div>

        {/* Subscribe */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Subscribe</h4>
          <p className="text-sm mb-4">
            Subscribe to receive updates and special offers
          </p>
          <div className="flex flex-col sm:flex-row w-full">
            <input
              type="email"
              placeholder="Your Email"
              className="flex-1 px-4 py-2 rounded-t sm:rounded-l sm:rounded-tr-none bg-[#2C3E50] border border-[#F4C430] placeholder-white text-white focus:outline-none"
            />
            <button className="bg-[#F4C430] text-[#2C3E50] px-4 py-2 rounded-b sm:rounded-r sm:rounded-bl-none font-semibold w-full sm:w-auto">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-6xl mx-auto border-t border-white/40 py-4 px-6 flex flex-col md:flex-row justify-between items-center text-xs sm:text-sm text-center md:text-left gap-4">
        <p>2025 L’ESSENCE. All rights reserved</p>
        <div className="flex gap-4">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#F4C430] p-2 rounded-full text-[#F4C430] hover:bg-[#F4C430] hover:text-[#2C3E50] transition"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#F4C430] p-2 rounded-full text-[#F4C430] hover:bg-[#F4C430] hover:text-[#2C3E50] transition"
          >
            <FaFacebookF />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
