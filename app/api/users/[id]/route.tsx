import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import User from "@/app/models/User";
import dbConnect from "@/app/lib/dbConnect";

// interface Props {
//     params: { id: number }
// }

export async function PUT(request: NextRequest, { params }: { params: { id: number } }) {
    await dbConnect();

    try {
        const body = await request.json();
        const validation = schema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(validation.error.errors, { status: 400 })
        }

        const existingUser = await User.findById(params.id);
        if(!existingUser) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })

        }

        existingUser.username = body.username ?? existingUser.username; // Update username if provided
        existingUser.email = body.email ?? existingUser.email; // Update email if provided
        existingUser.age = body.age ?? existingUser.age; // Update age if provided

        await existingUser.save();

        return NextResponse.json(existingUser, { status: 200 });
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(err); // Log the error
            return NextResponse.json({ error: err.message }, { status: 500 });
        }

        return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: number } }) {
    await dbConnect();

    try {
        const existingUser = await User.findById(params.id);
        if(!existingUser) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })

        }

        await User.deleteOne({ _id: params.id });
    
        return NextResponse.json({ message: `User named ${existingUser.username} deleted successfully`}, { status: 200 });
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(err); // Log the error
            return NextResponse.json({ error: err.message }, { status: 500 });
        }

        return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
}

export async function GET(request: NextRequest, { params }: { params: { id: number } }) {
    await dbConnect();

    try {
        const user = await User.findById(params.id);

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (err: unknown) {
        if (err instanceof Error) {
            return NextResponse.json({ error: err.message }, { status: 500 })
        }

        return NextResponse.json({ error: 'An Unkown error occurred' }, { status: 500 })
    }
}