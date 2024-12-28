//define Users schema 
import { Schema, model, type Document } from 'mongoose';

interface IUser extends Document {
    first_name: string;
    last_name: string;
    older_than_18: boolean;
    create_date: Date;
}

const userSchema = new Schema<IUser>({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    older_than_18: { type: Boolean, required: true }, 
    create_date: { type: Date, default: Date.now },
});

const User = model('User', userSchema);

User
    .create({
        first_name: 'John',
        last_name: 'Doe',
        older_than_18: true,
    })
    .then(result => console.log('New user created', result))
    .catch(err => console.log(err));

export default User;