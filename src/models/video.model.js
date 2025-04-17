import mongoose from 'mongoose'
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'   // Use where we don't want to give all data at the same time
// Rather we want pagination or some data then some data

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

videoSchema.plugin(mongooseAggregatePaginate)       // This will let us write us Aggregation Queries(not normal queries)
// This only does from where to where will it return data(videos, comments etc)

export const Video = mongoose.model("Video", videoSchema)