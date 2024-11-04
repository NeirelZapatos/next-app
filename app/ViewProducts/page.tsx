import { IProduct } from "../models/Product";
export default async function Page() {
    const fetchProducts = async (): Promise<IProduct[]> => {
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
            {products.map((product: IProduct) => (
                <div key={product._id}>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p>{product.price}</p>
                </div>
            ))}
        </div>
    )
}