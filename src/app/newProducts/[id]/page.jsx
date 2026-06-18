import axios from "axios";
import Link from "next/link";
import ImageGallery from "./ImageGallery";

const getProductDetail = async (id) => {
    try {
        const response = await axios.get(`https://dummyjson.com/products/${id}`)
        return response.data
    } catch (error) {
        return null
    }
}

export default async function NewProductDetail({ params }) {
    const { id } = await params;
    const product = await getProductDetail(id)

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-500 text-sm">Product not found.</p>
            </div>
        )
    }

    const originalPrice = (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
    const hasDiscount = product.discountPercentage >= 5

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">

                {/* Back */}
                <Link
                    href="/newProducts"
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-8"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to new products
                </Link>

                {/* Main Card */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="flex flex-col lg:flex-row">

                        {/* Image Gallery */}
                        <div className="lg:w-5/12 bg-gray-50 p-6 flex flex-col gap-4">
                            <ImageGallery images={product.images} thumbnail={product.thumbnail} title={product.title} />
                        </div>

                        {/* Details */}
                        <div className="lg:w-7/12 p-8 flex flex-col gap-5 border-t lg:border-t-0 lg:border-l border-gray-100">

                            {/* Badges */}
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="bg-gray-100 text-gray-500 text-xs font-medium px-3 py-1 rounded-full capitalize">
                                    {product.category}
                                </span>
                                {product.brand && (
                                    <span className="bg-black text-white text-xs font-medium px-3 py-1 rounded-full">
                                        {product.brand}
                                    </span>
                                )}
                                {hasDiscount && (
                                    <span className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                        -{Math.round(product.discountPercentage)}% OFF
                                    </span>
                                )}
                            </div>

                            {/* Title */}
                            <h1 className="text-2xl font-bold text-gray-900 leading-snug">
                                {product.title}
                            </h1>

                            {/* Rating */}
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-0.5">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <svg
                                            key={star}
                                            className={`w-4 h-4 ${star <= Math.round(product.rating) ? "text-amber-400" : "text-gray-200"}`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-sm text-gray-500">
                                    {product.rating.toFixed(1)}
                                    <span className="text-gray-300 mx-1">·</span>
                                    {product.reviews?.length ?? 0} reviews
                                </span>
                            </div>

                            {/* Price */}
                            <div className="flex items-end gap-3">
                                <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                                {hasDiscount && (
                                    <span className="text-base text-gray-400 line-through mb-0.5">${originalPrice}</span>
                                )}
                            </div>

                            {/* Description */}
                            <p className="text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-5">
                                {product.description}
                            </p>

                            {/* Tags */}
                            {product.tags?.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {product.tags.map((tag) => (
                                        <span key={tag} className="text-xs text-gray-500 border border-gray-200 px-2.5 py-1 rounded-lg capitalize">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Info pills */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-gray-100 pt-5">
                                <div className="flex flex-col gap-1 bg-gray-50 rounded-xl p-3">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                    </svg>
                                    <span className="text-xs text-gray-400 mt-1">Shipping</span>
                                    <span className="text-xs font-medium text-gray-700">{product.shippingInformation ?? 'Standard delivery'}</span>
                                </div>
                                <div className="flex flex-col gap-1 bg-gray-50 rounded-xl p-3">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                    <span className="text-xs text-gray-400 mt-1">Warranty</span>
                                    <span className="text-xs font-medium text-gray-700">{product.warrantyInformation ?? 'No warranty'}</span>
                                </div>
                                <div className="flex flex-col gap-1 bg-gray-50 rounded-xl p-3">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                                    </svg>
                                    <span className="text-xs text-gray-400 mt-1">Returns</span>
                                    <span className="text-xs font-medium text-gray-700">{product.returnPolicy ?? 'No returns'}</span>
                                </div>
                            </div>

                            {/* Stock + Actions */}
                            <div className="flex items-center justify-between gap-4 border-t border-gray-100 pt-5">
                                <span className={`text-sm font-medium ${product.stock > 10 ? 'text-emerald-600' : product.stock > 0 ? 'text-amber-500' : 'text-red-500'}`}>
                                    {product.stock > 10 ? `In Stock (${product.stock})` : product.stock > 0 ? `Only ${product.stock} left!` : 'Out of Stock'}
                                </span>
                                <div className="flex items-center gap-3">
                                    <button className="border border-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-gray-50 active:scale-95 transition-all duration-150">
                                        Wishlist
                                    </button>
                                    <button
                                        disabled={product.stock === 0}
                                        className="bg-black text-white text-sm font-medium px-6 py-2.5 rounded-xl hover:bg-gray-800 active:scale-95 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Reviews */}
                {product.reviews?.length > 0 && (
                    <div className="mt-8 bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6">
                            Customer Reviews <span className="text-gray-400 font-normal text-base">({product.reviews.length})</span>
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {product.reviews.map((review, i) => (
                                <div key={i} className="bg-gray-50 rounded-xl p-4 flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-semibold text-gray-800">{review.reviewerName}</span>
                                        <div className="flex items-center gap-0.5">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <svg
                                                    key={star}
                                                    className={`w-3 h-3 ${star <= review.rating ? "text-amber-400" : "text-gray-200"}`}
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-500 leading-relaxed">{review.comment}</p>
                                    <span className="text-xs text-gray-400 mt-auto">
                                        {new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}