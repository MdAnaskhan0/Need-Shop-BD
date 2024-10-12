import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import ProductHd from '../Components/ProductHd';
import ProductDisplay from '../Components/ProductDisplay';

const Product = () => {
    const { all_products } = useContext(ShopContext);
    const { productId } = useParams();

    // Safely convert productId to number
    const product = all_products.find((e) => e.id === parseInt(productId, 10));

    if (!product) {
        return <div>Product not found!</div>;
    }

    return (
        <section className="p-8">
            <ProductHd product={product} />
            <ProductDisplay product={product} />
        </section>
    );
};

export default Product;
