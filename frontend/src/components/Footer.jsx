import React from "react";
import { FaPhone, FaMapMarkerAlt, FaEnvelope, FaClock, FaInstagram, FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#2C3E50] pt-10 pb-10 text-white font-['Playfair_Display'] ">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10 border-t border-white/40">
        {/* Contact Us */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2"><FaPhone /> (091) 1234-567</p>
            <p className="flex items-center gap-2"><FaMapMarkerAlt /> No47, Fort, Galle.</p>
            <p className="flex items-center gap-2"><FaEnvelope /> <a href="mailto:lessence@gmail.com" className="hover:underline">lessence@gmail.com</a></p>
          </div>
        </div>

        {/* Opening Hours */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Openning Hours</h4>
          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2"><FaClock /> Mon - Thu : 11.00 AM - 10.00 PM</p>
            <p className="flex items-center gap-2"><FaClock /> Fri - Sat : 11.00 AM - 10.30 PM</p>
            <p className="flex items-center gap-2"><FaClock /> Sun : 11.30 AM - 11.30 PM</p>
          </div>
        </div>

        {/* Subscribe */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Subscribe</h4>
          <p className="text-sm mb-4">Subscribe to recieve updates and special offers</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your Email"
              className="px-4 py-2 rounded-l bg-[#2C3E50] border border-[#F4C430] placeholder-white text-white focus:outline-none"
            />
            <button className="bg-[#F4C430] text-[#2C3E50] px-4 py-2 rounded-r font-semibold">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto border-t border-white/40 py-4 px-6 flex flex-col md:flex-row justify-between items-center text-sm">
        <p className="mb-3 md:mb-0">2025 L’ESSENCE. All rights reserved</p>
        <div className="flex gap-4">
          <a href="#" className="border border-[#F4C430] p-2 rounded-full text-[#F4C430] hover:bg-[#F4C430] hover:text-[#2C3E50] transition">
            <FaInstagram />
          </a>
          <a href="#" className="border border-[#F4C430] p-2 rounded-full text-[#F4C430] hover:bg-[#F4C430] hover:text-[#2C3E50] transition">
            <FaFacebookF />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
