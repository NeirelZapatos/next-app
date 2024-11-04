import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { MongoClient } from "mongodb";
import CredentialsProviders from "next-auth/providers/credentials"
import User from "@/app/models/User";
import bcrypt from 'bcrypt';
import dbConnect from "@/app/lib/dbConnect";

const client = new MongoClient(process.env.DATABASE_URL!)
const clientPromise = client.connect();

export const authOptions: NextAuthOptions = {
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        CredentialsProviders({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'Email' },
                password: { label: 'Password', type: 'password', placeholder: 'Password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) return null;

                await dbConnect();

                const user = await User.findOne({
                    email: credentials.email 
                });

                if (!user) return null;

                const passwordsMatch = await bcrypt.compare(
                    credentials.password, 
                    user.hashedPassword!
                );

                return passwordsMatch ? user : null;
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
    ],
    session: {
        strategy: 'jwt'
    },
    theme: {
        colorScheme: "light", // Sets light mode
    },
}