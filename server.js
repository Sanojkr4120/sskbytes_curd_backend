/**
 * MAIN SERVER FILE
 * This is the entry point of SSKBYTES Task Manager API.
 */

// Import necessary tools
import 'dotenv/config';      // Loads variables from .env file
import express from 'express'; // The framework for our API
import cors from 'cors';       // Allows our frontend to talk to this backend
import connectDB from './config/db.js'; // Our database connection logic
import taskRoutes from './routes/taskRoutes.js'; // Our task-related endpoints

// Step 1: Connect to the Database
// We call this function to start our connection to MongoDB Atlas
connectDB();

// Step 2: Initialize the Express Application
const app = express();

// Step 3: Setup Middleware
// Middleware are like filters that requests go through
app.use(cors());         // 1. Enable CORS for all requests
app.use(express.json()); // 2. Tell Express we want to handle JSON data in request bodies

// Step 4: Define API Routes
// Any request starting with /api/tasks will be handled by taskRoutes
app.use('/api/tasks', taskRoutes);

// Step 5: Root Route
// A simple message for anyone visiting the base URL
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Step 6: Handle 404 Errors
// If a user tries a route that doesn't exist, we send this back
app.use((req, res) => {
    res.status(404).json({ 
        success: false,
        message: 'Error 404: The endpoint you are looking for does not exist.' 
    });
});

// Step 7: Start the Server
// We use the PORT from .env or default to 5000
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {

    console.log(`Server is running on: http://localhost:${PORT}`);
    
});

// Export handles Vercel deployment
export default app;

