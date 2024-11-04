import { NextRequest, NextResponse } from "next/server";
import schema from './schema';
import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/models/User";

export async function GET(){
    await dbConnect();

    try {
        const users = await User.find({});
        return NextResponse.json(users);
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

        const checkUser = await User.findOne({ username: body.username });

        if (checkUser) {
            return NextResponse.json({ error: 'Username already exits' }, { status: 409 })
        }

        const newUser = new User(body);
        await newUser.save();

        return NextResponse.json(newUser, { status: 201 });

    } catch (err: unknown) {
        if (err instanceof Error) {
            return NextResponse.json({ error: err.message }, { status: 500 })
        }

        return NextResponse.json({ error: 'An Unkown error occurred' }, { status: 500 })
    }
}
