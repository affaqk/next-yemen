"use client"

import { useState } from "react"

export default function ImageGallery({ images, thumbnail, title }) {
    const allImages = images?.length > 0 ? images : [thumbnail]
    const [selected, setSelected] = useState(0)

    return (
        <>
            {/* Main Image */}
            <div className="relative bg-white rounded-xl overflow-hidden flex items-center justify-center h-72 border border-gray-100">
                <img
                    src={allImages[selected]}
                    alt={title}
                    className="max-h-full max-w-full object-contain transition-opacity duration-200"
                />
            </div>

            {/* Thumbnail Strip */}
            {allImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                    {allImages.map((img, i) => (
                        <button
                            key={i}
                            onClick={() => setSelected(i)}
                            className={`flex-shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden bg-white transition-all duration-150 ${selected === i ? 'border-black' : 'border-gray-200 hover:border-gray-400'}`}
                        >
                            <img
                                src={img}
                                alt={`${title} ${i + 1}`}
                                className="w-full h-full object-contain p-1"
                            />
                        </button>
                    ))}
                </div>
            )}
        </>
    )
}