import React from 'react';

// Display product details and optional thumbnails
const ProductDisplay = ({ product }) => {
    const { name, price, images = [] } = product; // Destructure product data

    return (
        <section className="p-4">
            <div className="flex gap-8">
                {/* Main product image */}
                <div className="flex-shrink-0">
                    <img src={images[0]} alt={name} className="w-[400px] h-auto object-cover" />
                </div>

                {/* Product Info */}
                <div className="flex flex-col gap-4">
                    <h1 className="text-3xl font-bold">{name}</h1>
                    <div className="text-2xl text-secondary">${price}</div>
                    <p className="text-gray-600">This is a short product description.</p>

                    {/* Thumbnail images */}
                    <div className="flex gap-4">
                        {images.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt={`Thumbnail ${idx + 1}`}
                                className="w-[99px] h-[99px] object-cover rounded-md cursor-pointer hover:scale-105 transition"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDisplay;
