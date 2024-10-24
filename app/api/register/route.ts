import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import dbConnect from "@/app/lib/dbConnect";
import bcrypt from 'bcrypt';
import User from "@/app/models/User";

const schema = z.object({
    // username: z.string().min(3),
    // age: z.number().max(100).optional(),
    email: z.string().email(),
    password: z.string().min(5),
    username: z.string().min(5).optional()
});

export async function POST(request: NextRequest) {
    const body = await request.json();

    const validation = schema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.errors, {
            status: 400
        });
    }

    await dbConnect();

    const user = await User.findOne({
        email: body.email
    });

    if (user) {
        return NextResponse.json(
            { error: "User already exists"},
            { status: 400}
        );
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const newUser = new User({
        "email": body.email,
        "hashedPassword": hashedPassword
    });

    await newUser.save();

    return NextResponse.json({ email: newUser.email });
}

