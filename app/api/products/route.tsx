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

export default async function GET(){
    await dbConnect();

    try {
        const products = await Product.find({});
        return NextResponse.json(products);
    } catch (err: any) {
        return NextResponse.json({ error: err.message })
    }
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = schema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 })
    }
    return NextResponse.json({ id: 10, name: body.name, price: body.price }, { status: 201 });
}