import mongoose from "mongoose";

const BlacklistSchema = new mongoose.Schema({
    token:{
        type: String,
        required: true,
    }
}, { timestamps: true });

const blacklistModel = mongoose.model('blacklistModel', BlacklistSchema);

export default blacklistModel;