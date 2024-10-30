import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    username: string;
    age: number;
    email: string;
}

const userSchema: Schema = new mongoose.Schema({
    username: {
        type: String,
    },
    age: {
        type: Number,
    },
    email: {
        type: String,
        required: true,
    },
    hashedPassword: {
        type: String,
        required: true
    }
});

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;