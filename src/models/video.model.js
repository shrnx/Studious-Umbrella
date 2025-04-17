import mongoose from 'mongoose'

const videoSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: "No Description is provided"
    },
    duration: {
        type: Object,       // from cloudinary
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    video: {
        type: String,        // cloudinary URL
        required: true
    },
    thumbnail: {
        type: String,       // cloudinary URL
        required: true
    }
}, {timestamps: true})

export const Video = mongoose.model("Video", videoSchema)