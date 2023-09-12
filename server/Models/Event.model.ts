import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 2000
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required:true
    },
    id:{
        type: String,
        unique:true,
        required: true,
        trim: true,
    }
}, {timestamps: true})

const Event = mongoose.model('Event', EventSchema);
export default Event;