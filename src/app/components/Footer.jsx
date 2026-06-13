import React from 'react';
import Link from 'next/link';
import NewsletterForm from './NewsletterForm';
import {
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaYoutube,
} from 'react-icons/fa';
import {
  MdEmail,
  MdPhone,
  MdLocationOn,
} from 'react-icons/md';

const footerLinks = [
  {
    heading: 'Shop',
    links: [
      { label: 'All Products', href: '/products' },
      { label: 'New Arrivals', href: '/products?filter=new' },
      { label: 'Sale', href: '/products?filter=sale' },
      { label: 'Collections', href: '/products?filter=collections' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Press', href: '/press' },
      { label: 'Careers', href: '/careers' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Shipping Policy', href: '/shipping' },
      { label: 'Returns', href: '/returns' },
    ],
  },
];

const socials = [
  { icon: FaInstagram, label: 'Instagram', href: '#' },
  { icon: FaTwitter, label: 'Twitter', href: '#' },
  { icon: FaFacebook, label: 'Facebook', href: '#' },
  { icon: FaYoutube, label: 'YouTube', href: '#' },
];

const Footer = () => {
  return (
    <footer className="bg-gray-950 border-t border-white/10 mt-auto">

      {/* Newsletter Banner */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-1">
              Stay in the loop
            </p>
            <h3 className="text-xl font-bold text-white">
              Get exclusive deals & updates
            </h3>
          </div>
          <NewsletterForm />
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

        {/* Brand Column */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          <Link href="/" className="flex items-center gap-2 w-fit group">
            <span className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-gray-950 font-black text-sm">
              E
            </span>
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors duration-200">
              Estore
            </span>
          </Link>
          <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
            Your one-stop destination for quality products. We bring style,
            value, and convenience right to your door.
          </p>

          {/* Contact Info */}
          <ul className="flex flex-col gap-2.5 text-sm text-gray-400">
            <li className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
              <MdEmail size={16} className="text-emerald-400 shrink-0" />
              <span>support@estore.com</span>
            </li>
            <li className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
              <MdPhone size={16} className="text-emerald-400 shrink-0" />
              <span>+1 (800) 123-4567</span>
            </li>
            <li className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
              <MdLocationOn size={16} className="text-emerald-400 shrink-0" />
              <span>123 Market St, New York, NY</span>
            </li>
          </ul>

          {/* Social Icons */}
          <div className="flex items-center gap-2 mt-1">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-emerald-500 hover:border-emerald-500 transition-all duration-200"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Link Columns */}
        {footerLinks.map(section => (
          <div key={section.heading} className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold text-white uppercase tracking-widest">
              {section.heading}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {section.links.map(link => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-emerald-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Estore. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <Link href="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-emerald-400 transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-emerald-400 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;