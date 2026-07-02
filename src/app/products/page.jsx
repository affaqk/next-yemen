"use client"

import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/products")
      console.log(response.data.products)
      setProducts(response.data.products)
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
            <Link href = {`/products/${product._id}`}>
            <div
              key={product._id}
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
                

                {/* Price + Button */}
                <div className="mt-auto flex items-center justify-between pt-2 border-t border-gray-100">
                  <span className="text-lg font-bold text-gray-900">${product.price}</span>
                  <button className="bg-black text-white text-xs font-medium px-4 py-2 rounded-xl hover:bg-gray-800 active:scale-95 transition-all duration-150">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Products


// <Routes>
  // <Route path ="/product" element = {<Product/>}/>
  // <Route path = "/products/:id" element = {<ProductDetail/>}/>
// </Routes>

// Link to = { /products/${product.id}}


// two api // POST => signup // POST // Login
