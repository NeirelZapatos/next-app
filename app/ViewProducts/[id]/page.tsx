import { Metadata } from "next";

export default async function Page({ params }: { params: { id: number } }) {
    const fetchProduct = async () => {
        const res = await fetch(`http://localhost:3000/api/products/${params.id}`);
        const product = await res.json();
        return product;
    }

    const product = await fetchProduct();

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

export async function generateMetadata({ params }: { params: { id: number } }): Promise<Metadata> {
    const fetchProduct = async () => {
        const res = await fetch(`http://localhost:3000/api/products/${params.id}`);
        const product = await res.json();
        return product;
    }

    const product = await fetchProduct();

    if(product.description) {
        return {
            title: product.name,
            description: product.description
        }
    } else {
        return {
            title: product.name
        }
    }

    
}
