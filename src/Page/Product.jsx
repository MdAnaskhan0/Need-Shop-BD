import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import ProductHd from '../Components/ProductHd';
import ProductDisplay from '../Components/ProductDisplay';

const Product = () => {
    const { all_products } = useContext(ShopContext);
    // console.log(all_products)
    const { productId } = useParams();
    // console.log(productId)
    const product = all_products.find((e) => e.id === Number(productId));
    // console.log(product)
    if (!product) {
        return <div>Product not found!</div>;
    }

    return (
        <section>
            <ProductHd product={product} />
            <ProductDisplay product={product}/>
        </section>
    );
};

export default Product;
