import axios from "axios";
import Link from "next/link";

const getProductDetail = async (id) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/products/${id}`)
        return response.data.product
    } catch (error) {
        return null;
    }
}

export default async function ProductDetail({ params }) {
    const { id } = await params;
    const product = await getProductDetail(id);
    console.log(product)
    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-500 text-sm">Product not found.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">

                {/* Back */}
                <Link
                    href="/products"
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-8"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to products
                </Link>

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="flex flex-col md:flex-row">

                        {/* Image */}
                        <div className="md:w-2/5 bg-gray-50 flex items-center justify-center p-10 min-h-80">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="max-h-72 max-w-full object-contain"
                            />
                        </div>

                        {/* Details */}
                        <div className="md:w-3/5 p-8 flex flex-col gap-5">

                            {/* Category */}
                            <span className="w-fit bg-gray-100 text-gray-500 text-xs font-medium px-3 py-1 rounded-full capitalize">
                                {product.category}
                            </span>

                            {/* Title */}
                            <h1 className="text-2xl font-bold text-gray-900 leading-snug">
                                {product.title}
                            </h1>

                            {/* Rating */}
                            

                            {/* Description */}
                            <p className="text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-5">
                                {product.description}
                            </p>

                            {/* Price + Actions */}
                            <div className="mt-auto border-t border-gray-100 pt-5 flex items-center justify-between gap-4">
                                <span className="text-3xl font-bold text-gray-900">
                                    ${product.price}
                                </span>
                                <div className="flex items-center gap-3">
                                    <button className="border border-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-gray-50 active:scale-95 transition-all duration-150">
                                        Wishlist
                                    </button>
                                    <button className="bg-black text-white text-sm font-medium px-6 py-2.5 rounded-xl hover:bg-gray-800 active:scale-95 transition-all duration-150">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}