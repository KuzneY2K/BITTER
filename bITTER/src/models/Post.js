import { Schema } from "mongoose";

export const PostSchema = new Schema({
    contents: { type: String, required: true, maxlength: 250, minlength: 1 },
    mediaUrl: { type: String, required: false },
    authorId: { type: Schema.Types.ObjectId, required: true, ref: 'profileId' },
    authorName: { type: Schema.Types.String, required: true, ref: 'profileName' },
    authorPicture: { type: Schema.Types.String, required: true, ref: 'profilePicture' }
}, { timestamps: true, toJSON: { virtuals: true } })

PostSchema.virtual('profileId', {
    localField: 'authorId',
    ref: 'Account',
    foreignField: 'id',
    justOne: true
})

PostSchema.virtual('profileName', {
    localField: 'authorName',
    ref: 'Account',
    foreignField: 'nickname',
    justOne: true
})

PostSchema.virtual('profilePicture', {
    localField: 'authorPicture',
    ref: 'Account',
    foreignField: 'picture',
    justOne: true
})