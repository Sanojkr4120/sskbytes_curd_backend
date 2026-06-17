# SSKBYTES - My Task Manager API

This is a simple backend project. It is a **Task Manager API** that helps you keep track of things you need to do. I used **Node.js**, **Express**, and **MongoDB Atlas** to build this.

## What can this API do?

I have added all the basic features (CRUD) for managing tasks:
- **Add a Task**: You can create a new task with a title and description.
- **See All Tasks**: You can see a list of all tasks you created.
- **Filter by Status**: If you only want to see "pending" tasks, you can do that!
- **Update a Task**: You can change the title, description, or status of a task later.
- **Delete a Task**: If you don't need a task anymore, you can remove it.

## How I organized the code (MVC Pattern)

I followed the **MVC pattern** to keep the code clean and easy to read:
- **models/**: This folder has my "Task" blueprint (how a task looks in the database).
- **controllers/**: This folder has all the logic (what happens when you click a button).
- **routes/**: This folder has the URL paths for our API.
- **config/**: Here I added the code to connect to my MongoDB database.

## How to run this project on your computer

Follow these simple steps to get the project working:

1. **Install everything**:
   Open your terminal in the `backend` folder and type:
   ```bash
   npm install
   ```
2. **Set up your secrets (.env)**:
   Create a new file named `.env` and add these two lines (use your own MongoDB link):
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_atlas_connection_string
   ```
3. **Start the server**:
   Type this to start the server:
   ```bash
   npm run dev
   ```

## 📡 API Link Table

**Live API URL:** `https://sskbytes-curd-backend-version-1.vercel.app`

Use these links to talk to the API:

| Task Operation | Request Type | URL | What it does? |
| :--- | :--- | :--- | :--- |
| **Create Task** | POST | `https://sskbytes-curd-backend-version-1.vercel.app/api/tasks` | Create a new task |
| **Get All Tasks** | GET | `https://sskbytes-curd-backend-version-1.vercel.app/api/tasks` | See all tasks |
| **Filter by Status**| GET | `.../api/tasks?status=pending` | See tasks by their status |
| **Get One Task** | GET | `.../api/tasks/:id` | Find a single task by its ID |
| **Edit Task** | PUT | `.../api/tasks/:id` | Change task details |
| **Remove Task** | DELETE | `.../api/tasks/:id` | Permanentely delete a task |



![image alt](https://github.com/Sanojkr4120/sskbytes_curd_backend/blob/424f252868fe4f8b5fc537dfe5f59b7be620e4f7/Screenshot%202026-06-17%20105452.png)
![image alt](https://github.com/Sanojkr4120/sskbytes_curd_backend/blob/99814ab50fe9bf0c64a7709259452047bf30c4d2/Screenshot%202026-06-17%20105603.png)
![image alt](https://github.com/Sanojkr4120/sskbytes_curd_backend/blob/99814ab50fe9bf0c64a7709259452047bf30c4d2/Screenshot%202026-06-17%20105646.png)
![image alt](https://github.com/Sanojkr4120/sskbytes_curd_backend/blob/99814ab50fe9bf0c64a7709259452047bf30c4d2/Screenshot%202026-06-17%20105733.png)
![image alt](https://github.com/Sanojkr4120/sskbytes_curd_backend/blob/99814ab50fe9bf0c64a7709259452047bf30c4d2/Screenshot%202026-06-17%20105913.png)
![image alt](https://github.com/Sanojkr4120/sskbytes_curd_backend/blob/99814ab50fe9bf0c64a7709259452047bf30c4d2/Screenshot%202026-06-17%20110010.png)
