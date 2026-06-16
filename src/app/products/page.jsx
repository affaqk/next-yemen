"use client"

import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllProducts = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products")
      setProducts(response.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-black rounded-full animate-spin" />
          <p className="text-gray-500 text-sm tracking-wide">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">All Products</h1>
          <p className="mt-1 text-gray-500 text-sm">{products.length} items available</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group"
            >
              {/* Image */}
              <div className="relative bg-gray-50 h-52 flex items-center justify-center p-6">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-white text-gray-500 text-xs font-medium px-2 py-1 rounded-full border border-gray-200 capitalize">
                  {product.category}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-4 gap-3">
                <h2 className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2">
                  {product.title}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-3.5 h-3.5 ${star <= Math.round(product.rating.rate) ? 'text-amber-400' : 'text-gray-200'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">({product.rating.count})</span>
                </div>

                {/* Price + Button */}
                <div className="mt-auto flex items-center justify-between pt-2 border-t border-gray-100">
                  <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                  <button className="bg-black text-white text-xs font-medium px-4 py-2 rounded-xl hover:bg-gray-800 active:scale-95 transition-all duration-150">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Products