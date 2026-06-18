"use client"

import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react'

export default function NewProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const getAllProducts = async () => {
        try {
            const response = await axios.get("https://dummyjson.com/products?limit=30")
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

    const filtered = products.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    )

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-gray-200 border-t-black rounded-full animate-spin" />
                    <p className="text-gray-500 text-sm tracking-wide">Loading new arrivals...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <div>
                        <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase">Just Arrived</span>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight mt-1">New Products</h1>
                        <p className="mt-1 text-gray-500 text-sm">{filtered.length} items available</p>
                    </div>

                    {/* Search */}
                    <div className="relative w-full sm:w-72">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full border border-gray-200 bg-white rounded-xl pl-9 pr-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition"
                        />
                    </div>
                </div>

                {/* Grid */}
                {filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <svg className="w-12 h-12 text-gray-200 mb-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
                        </svg>
                        <p className="text-gray-500 text-sm">No products match &quot;{search}&quot;</p>
                        <button onClick={() => setSearch('')} className="mt-3 text-xs text-gray-900 font-medium underline underline-offset-2">
                            Clear search
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filtered.map((product) => (
                            <Link href={`/newProducts/${product.id}`}>
                            <div
                                key={product.id}
                                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group"
                            >
                                {/* Image */}
                                <div className="relative bg-gray-50 h-52 flex items-center justify-center overflow-hidden">
                                    <img
                                        src={product.thumbnail}
                                        alt={product.title}
                                        className="max-h-full max-w-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />

                                    {/* Discount badge */}
                                    {product.discountPercentage >= 5 && (
                                        <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                                            -{Math.round(product.discountPercentage)}%
                                        </span>
                                    )}

                                    {/* Category badge */}
                                    <span className="absolute top-3 left-3 bg-white text-gray-500 text-xs font-medium px-2 py-1 rounded-full border border-gray-200 capitalize">
                                        {product.category}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="flex flex-col flex-1 p-4 gap-2.5">

                                    {/* Brand */}
                                    <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">{product.brand ?? 'Unbranded'}</span>

                                    {/* Title */}
                                    <h2 className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2">
                                        {product.title}
                                    </h2>

                                    {/* Rating */}
                                    <div className="flex items-center gap-1.5">
                                        <div className="flex items-center gap-0.5">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <svg
                                                    key={star}
                                                    className={`w-3.5 h-3.5 ${star <= Math.round(product.rating) ? 'text-amber-400' : 'text-gray-200'}`}
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <span className="text-xs text-gray-400">{product.rating.toFixed(1)}</span>
                                    </div>

                                    {/* Stock */}
                                    <span className={`text-xs font-medium ${product.stock > 10 ? 'text-emerald-600' : product.stock > 0 ? 'text-amber-500' : 'text-red-500'}`}>
                                        {product.stock > 10 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock'}
                                    </span>

                                    {/* Price + Button */}
                                    <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                                        <div className="flex flex-col">
                                            <span className="text-base font-bold text-gray-900">${product.price.toFixed(2)}</span>
                                            {product.discountPercentage >= 5 && (
                                                <span className="text-xs text-gray-400 line-through">
                                                    ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                                                </span>
                                            )}
                                        </div>
                                        <button
                                            disabled={product.stock === 0}
                                            className="bg-black text-white text-xs font-medium px-4 py-2 rounded-xl hover:bg-gray-800 active:scale-95 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
                                        >
                                            Add to Cart
                                        </button>
                                    </div>

                                </div>
                            </div>
                            </Link>
                        ))}
                    </div>
                )}

            </div>
        </div>
    )
}