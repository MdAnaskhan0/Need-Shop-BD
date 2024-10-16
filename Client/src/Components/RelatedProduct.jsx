import React,{useState, useEffect} from 'react'
import Item from './Item'


const RelatedProduct = () => {

    const [popularCollection, setpopularCollection] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/popularproducts').then((res) => res.json()).then((data) => setpopularCollection(data))
    }, [])


    return (
        <section className='bg-primary'>
            <div className='max_padd_container py-12 xl:w-[88%]'>
                <h3 className='h3 text-center'>Related Products</h3>
                <hr className='h-[3px] md:w-1/2 mx-auto bg-gradient-to-l from bg-transparent via-black to-transparent mb-16' />
                {/* Container */}
                <div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
                    {popularCollection.map((item, key) => (
                        <Item key={item.id} id={item.id} image={item.image} name={item.name} old_price={item.old_price} new_price={item.new_price} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default RelatedProduct
