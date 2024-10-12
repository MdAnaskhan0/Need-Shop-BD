import React from 'react';
import { TbArrowRight } from 'react-icons/tb';

const ProductHd = ({ product }) => {
    return (
        <div className="flex items-center gap-2 text-gray-600">
            <span>Home</span>
            <TbArrowRight />
            <span>Shop</span>
            <TbArrowRight />
            <span>{product.category}</span>
            <TbArrowRight />
            <span>{product.name}</span>
        </div>
    );
};

export default ProductHd;
