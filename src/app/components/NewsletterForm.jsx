"use client"

import React from 'react';

const NewsletterForm = () => {
  return (
    <form
      onSubmit={e => e.preventDefault()}
      className="flex w-full max-w-md gap-2"
    >
      <input
        type="email"
        placeholder="Enter your email"
        className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-colors"
      />
      <button
        type="submit"
        className="px-5 py-2.5 text-sm font-semibold text-gray-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors duration-200 whitespace-nowrap"
      >
        Subscribe
      </button>
    </form>
  );
};

export default NewsletterForm;