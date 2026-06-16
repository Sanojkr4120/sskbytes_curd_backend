import Task from '../models/Task.js';
import mongoose from 'mongoose';

/**
 * FEATURE: CREATE A NEW TASK
 * This function handles the logic for adding a new task into our database.
 */
export const createTask = async (req, res) => {
    try {
        // Step 1: Extract data from the request body
        const { title, description, status } = req.body;

        // Step 2: Basic Input Validation
        // We must have a title to create a task
        if (!title) {
            return res.status(400).json({ 
                success: false,
                message: 'Validation Error: Please provide a title for the task. Title is required.' 
            });
        }

        // Step 3: Create the task in MongoDB
        const newTask = new Task({
            title,
            description,
            status: status || 'pending' // If no status is given, we default to 'pending'
        });

        // Step 4: Save to database
        const savedTask = await newTask.save();

        // Step 5: Send success response
        console.log('Success: New task created!');
        res.status(201).json({
            success: true,
            data: savedTask
        });

    } catch (error) {
        // Log the error for the developer
        console.error('Error creating task:', error.message);
        
        // Send a friendly error message back to the user
        res.status(500).json({ 
            success: false,
            message: 'Server Error: We encountered a problem while creating your task.',
            error: error.message 
        });
    }
};

/**
 * FEATURE: GET ALL TASKS
 * This function fetches tasks from the database. It also supports filtering by status.
 */
export const getAllTasks = async (req, res) => {
    try {
        // Step 1: Check if there is a 'status' filter in the URL (e.g., ?status=pending)
        const { status } = req.query;
        let filterObject = {};

        if (status) {
            filterObject.status = status;
        }

        // Step 2: Fetch tasks from the database using the filter (if any)
        // We also sort them so the newest tasks show up first
        const tasks = await Task.find(filterObject).sort({ createdAt: -1 });
        
        // Step 3: Return the list of tasks
        res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks
        });

    } catch (error) {
        console.error('Error fetching tasks:', error.message);
        res.status(500).json({ 
            success: false,
            message: 'Server Error: Could not retrieve tasks from the database.',
            error: error.message 
        });
    }
};

/**
 * FEATURE: GET A SINGLE TASK BY ID
 * This function looks for one specific task using its unique database ID.
 */
export const getSingleTask = async (req, res) => {
    try {
        const { id } = req.params;

        // Step 1: Check if the ID provided is a valid MongoDB format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ 
                success: false,
                message: 'Invalid ID: The ID you provided is not in the correct format.' 
            });
        }

        // Step 2: Try to find the task
        const task = await Task.findById(id);

        // Step 3: If task doesn't exist, tell the user
        if (!task) {
            return res.status(404).json({ 
                success: false,
                message: 'Not Found: No task was found with that specific ID.' 
            });
        }

        // Step 4: Return the found task
        res.status(200).json({
            success: true,
            data: task
        });

    } catch (error) {
        console.error('Error getting single task:', error.message);
        res.status(500).json({ 
            success: false,
            message: 'Server Error: An error occurred while searching for the task.',
            error: error.message 
        });
    }
};

/**
 * FEATURE: UPDATE AN EXISTING TASK
 * This function allows users to change the details of a task they already created.
 */
export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;

        // Step 1: Validate the ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ 
                success: false,
                message: 'Invalid ID: Cannot update because the ID is not valid.' 
            });
        }

        // Step 2: Attempt to find and update the task
        // { new: true } makes sure it returns the UPDATED version of the task
        // { runValidators: true } makes sure the new data follows the rules in our Task model
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { title, description, status },
            { new: true, runValidators: true }
        );

        // Step 3: Check if the task was actually found
        if (!updatedTask) {
            return res.status(404).json({ 
                success: false,
                message: 'Not Found: We could not find a task with that ID to update.' 
            });
        }

        // Step 4: Send back the updated task
        res.status(200).json({
            success: true,
            message: 'Task updated successfully!',
            data: updatedTask
        });

    } catch (error) {
        console.error('Error updating task:', error.message);
        res.status(500).json({ 
            success: false,
            message: 'Server Error: We failed to update the task details.',
            error: error.message 
        });
    }
};

/**
 * FEATURE: DELETE A TASK
 * This function removes a task permanentely from our database.
 */
export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        // Step 1: Validate the ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ 
                success: false,
                message: 'Invalid ID: Cannot delete because the ID format is wrong.' 
            });
        }

        // Step 2: Try to find and delete the task
        const deletedTask = await Task.findByIdAndDelete(id);

        // Step 3: If it wasn't there, tell the user
        if (!deletedTask) {
            return res.status(404).json({ 
                success: false,
                message: 'Not Found: This task does not exist, so it cannot be deleted.' 
            });
        }

        // Step 4: Send confirmation message
        res.status(200).json({ 
            success: true,
            message: 'Task successfully deleted from the system.' 
        });

    } catch (error) {
        console.error('Error deleting task:', error.message);
        res.status(500).json({ 
            success: false,
            message: 'Server Error: We could not delete the task at this time.',
            error: error.message 
        });
    }
};

