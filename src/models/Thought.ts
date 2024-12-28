//define thought schema
import { Schema, model, type Document, Types } from "mongoose";

//define reaction schema
const reactionSchema = new Schema(
	{
		reactionId: {
			type: Schema.Types.ObjectId,
			default: () => new Types.ObjectId(),
		},
		reactionBody: {
			type: String,
			required: true,
			maxlength: 280,
		},
		username: {
			type: String,
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
			get: (timestamp: Date) => timestamp.toISOString(),
		},
	},
	{
		id: false,
		toJSON: { getters: true },
	}
);

interface IReaction extends Document {
	reactionID: Types.ObjectId;
	reactionBody: string;
	username: string;
	createdAt: Date;
}

interface IThought extends Document {
	thoughtText: string;
	createdAt: Date;
	username: string;
	reactions: IReaction[];
}
