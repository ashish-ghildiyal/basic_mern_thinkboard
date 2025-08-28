import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    
    }},{timestamps: true}) // to add createdAt and updatedAt fields automatically

export default mongoose.model("Note", noteSchema);