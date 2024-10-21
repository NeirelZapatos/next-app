export default async function Page({ params }: { params: { id: number } }) {
    const fetchProducts = async () => {
        const res = await fetch(`http://localhost:3000/api/products/${params.id}`);
        const product = await res.json();
        return product;
    }

    const product = await fetchProducts();

    return (
        <div>
            <h1>Products</h1>
            <div key={product._id}>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>{product.price}</p>
            </div>
        </div>
    );
}