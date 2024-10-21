import { NextRequest, NextResponse } from 'next/server';
import schema from './schema';
import dbConnect from '@/app/lib/dbConnect';
import Product from '@/app/models/Product';

// export function GET(request: NextRequest) {
//     return NextResponse.json([
//         { id: 1, name: 'Milk', price: 2.5},
//         { id: 2, name: 'Eggs', price: 4}
//     ]);
// }

export async function GET(request: NextRequest){
    await dbConnect();

    try {
        const products = await Product.find({});
        return NextResponse.json(products);
    } catch (err: unknown) {
        if (err instanceof Error) {
            return NextResponse.json({ error: err.message }, { status: 500 })
        }

        return NextResponse.json({ error: 'An Unkown error occurred' }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    await dbConnect();

    try {
        const body = await request.json();
        const validation = schema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(validation.error.errors, { status: 400 })
        }

        const checkProduct = await Product.findOne({ name: body.name });

        if (checkProduct) {
            return NextResponse.json({ error: 'Prodcut already exits' }, { status: 409 })
        }

        const newProduct = new Product(body);
        await newProduct.save();

        return NextResponse.json(newProduct, { status: 201 });

    } catch (err: unknown) {
        if (err instanceof Error) {
            return NextResponse.json({ error: err.message }, { status: 500 })
        }

        return NextResponse.json({ error: 'An Unkown error occurred' }, { status: 500 })
    }
}