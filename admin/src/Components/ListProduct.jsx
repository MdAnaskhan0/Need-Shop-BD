import React, { useEffect, useState } from 'react';
import { BsTrash } from "react-icons/bs";

const ListProduct = () => {
    const [allProduct, setAllProduct] = useState([]);

    // Fetching products
    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const response = await fetch('http://localhost:4000/allproducts');
                const data = await response.json();

                if (data.success) {
                    setAllProduct(data.products);
                    console.log("Fetched products:", data.products);
                } else {
                    console.error("Failed to fetch products:", data.message);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchInfo();
    }, []);

    const removeProduct = async (productId) => {
        try {
            const response = await fetch(`http://localhost:4000/removeproduct`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: productId }),
            });
            const result = await response.json();
            if (result.success) {
                setAllProduct(allProduct.filter(product => product._id !== productId));
                console.log("Product removed successfully:", productId);
            } else {
                console.error("Failed to remove product:", result.message);
            }
        } catch (error) {
            console.error("Error removing product:", error);
        }
    };

    return (
        <div className='p-2 box-border bg-white mb-0 rounded-sm w-full mt-4 sm:p-4 sm:m-7'>
            <h4 className='text-[25px] font-semibold uppercase p-5'>Product List</h4>
            <div className='max-h-[77vh] overflow-auto px-4 text-center'>
                <table className='w-full mx-auto'>
                    <thead>
                        <tr className='bg-primary bold-14 sm:regular-22 text-start py-12'>
                            <th className='p-2'>Products</th>
                            <th className='p-2'>Title</th>
                            <th className='p-2'>Old Price</th>
                            <th className='p-2'>New Price</th>
                            <th className='p-2'>Category</th>
                            <th className='p-2'>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allProduct.map((product) => (
                            <tr className='border-b border-slate-900/20 text-gray-20 p-6 medium-14' key={product._id}>
                                <td className='flexStart sm:flexCenter'>
                                    <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px' }} className='rounded-lg ring-1 ring-stone-900/5 my-1' />
                                </td>
                                <td><div className='line-clamp-3'>{product.name}</div></td>
                                <td>${product.old_price}</td>
                                <td>${product.new_price}</td>
                                <td>{product.category}</td>
                                <td>
                                    <div className='bold-22 pl-6 sm:pl-12'>
                                        <BsTrash
                                            onClick={() => removeProduct(product._id)}
                                            style={{ cursor: 'pointer', color: 'red' }}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListProduct;
