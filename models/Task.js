import mongoose from 'mongoose';

// This is the blueprint for our Task data
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        // We make the title required so every task has a name
        required: [true, 'Please give your task a title'],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        // These are the only allowed values for status
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    // This automatically records when the task was created or changed
    timestamps: true 
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
