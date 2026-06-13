"use client"

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { AiOutlineClose, AiOutlineMenu, AiOutlineShoppingCart, AiOutlineSearch } from 'react-icons/ai';

const navItems = [
  { id: 1, text: 'Home', url: '/' },
  { id: 2, text: 'Products', url: '/products' },
  { id: 3, text: 'About', url: '/about' },
  { id: 4, text: 'Contact', url: '/contact' },
];

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-gray-950/95 backdrop-blur-md shadow-lg shadow-black/30'
            : 'bg-gray-950'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-gray-950 font-black text-sm">
              E
            </span>
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors duration-200">
              Estore
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <li key={item.id}>
                <Link
                  href={item.url}
                  className="relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200 group"
                >
                  {item.text}
                  <span className="absolute bottom-1 left-4 right-4 h-px bg-emerald-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <button
              aria-label="Search"
              className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              <AiOutlineSearch size={20} />
            </button>
            <Link
              href="/cart"
              aria-label="Cart"
              className="relative p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              <AiOutlineShoppingCart size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-400 rounded-full" />
            </Link>
            <Link
              href="/products"
              className="ml-2 px-4 py-2 text-sm font-semibold text-gray-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors duration-200"
            >
              Shop Now
            </Link>
          </div>

          {/* Mobile: cart + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <Link href="/cart" aria-label="Cart" className="relative p-2 text-gray-400 hover:text-white transition-colors">
              <AiOutlineShoppingCart size={22} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-400 rounded-full" />
            </Link>
            <button
              onClick={() => setNav(true)}
              aria-label="Open menu"
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <AiOutlineMenu size={22} />
            </button>
          </div>

        </nav>
      </header>

      {/* Spacer so content doesn't hide under fixed navbar */}
      <div className="h-16" />

      {/* Mobile Overlay */}
      <div
        onClick={() => setNav(false)}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          nav ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Mobile Drawer */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-gray-950 border-r border-white/10 flex flex-col transform transition-transform duration-300 ease-in-out md:hidden ${
          nav ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <Link href="/" onClick={() => setNav(false)} className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-gray-950 font-black text-sm">
              E
            </span>
            <span className="text-lg font-bold text-white">Estore</span>
          </Link>
          <button
            onClick={() => setNav(false)}
            aria-label="Close menu"
            className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
          >
            <AiOutlineClose size={20} />
          </button>
        </div>

        {/* Drawer Links */}
        <ul className="flex flex-col gap-1 px-3 py-4 flex-1">
          {navItems.map(item => (
            <li key={item.id}>
              <Link
                href={item.url}
                onClick={() => setNav(false)}
                className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200 font-medium"
              >
                {item.text}
              </Link>
            </li>
          ))}
        </ul>

        {/* Drawer Footer CTA */}
        <div className="px-5 py-5 border-t border-white/10">
          <Link
            href="/products"
            onClick={() => setNav(false)}
            className="block w-full text-center py-3 text-sm font-semibold text-gray-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors duration-200"
          >
            Shop Now
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Navbar;