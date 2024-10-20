import { useEffect, useState } from 'react';

export default async function Page() {
    const fetchProducts = async () => {
        const res = await fetch('http://localhost:3000/api/products');
        const products = await res.json();
        return products;
    }

    const products = await fetchProducts();

    // This works if you change the module to client side
    // const [products, setProducts] = useState([]);

    // useEffect(() => {
    //     fetchProducts().then((products) => {
    //         setProducts(products);
    //     })
    // }, []);

    return (
        <div>
            <h1>Products</h1>
            {products.map((product: any) => (
                <div key={product._id}>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p>{product.price}</p>
                </div>
            ))}
        </div>
    )
}