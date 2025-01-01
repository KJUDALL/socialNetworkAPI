//define Users schema
import { Schema, model, type Document, Types } from "mongoose";

interface IUser extends Document {
	_id: Types.ObjectId;
	username: string;
	email: string;
	create_date: Date;
	thoughts: Types.ObjectId[];
	friends: Types.ObjectId[];
	friendCount?: number;
}

const userSchema = new Schema<IUser>({
	username: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
	},
	create_date: {
		type: Date,
		default: Date.now,
	},
	thoughts: [
		{
			type: Schema.Types.ObjectId,
			ref: "Thought",
		},
	],
	friends: [
		{
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	],
});

userSchema.virtual("friendCount").get(function (this: IUser) {
	return this.friends.length;
});

userSchema.set("toJSON", {
	virtuals: true,
});
userSchema.set("toObject", {
	virtuals: true,
});

const User = model("User", userSchema);

export default User;
