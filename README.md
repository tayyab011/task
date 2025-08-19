Installation

Clone the repository:

git clone <repository-url>
cd task-management-api


Install dependencies:

npm install


Create a .env file in the root directory:

PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>


Run the server:

npm start


Server will run at http://localhost:5000

Environment Variables
Variable	Description
PORT	Server port (default: 5000)
MONGO_URI	MongoDB connection URI
JWT_SECRET	Secret key for signing JWT tokens
API Endpoints
Auth Routes
Method	Endpoint	Description	Request Body
POST	/api/register	Register a new user	{ fullName, email, mobile, password, role }
POST	/api/login	Login user and return JWT token	{ email, password }
GET	/api/logout	Logout user (clear cookie)	-
User Task Routes (Authenticated)
Method	Endpoint	Description	Request Body / Params
POST	/api/tasks	Create a new task	{ title, description, status, priority, dueDate }
GET	/api/tasks	List all tasks for logged-in user	-
GET	/api/tasks/:id	Get a single task by ID	:id = task ID
PUT	/api/tasks/:id	Update a task	{ title, description, status, priority, dueDate }
DELETE	/api/tasks/:id	Delete a task	:id = task ID
Admin Routes (Admin Only)
Method	Endpoint	Description	Params
GET	/admin/tasks	Get all tasks from all users	-
GET	/admin/tasks/:userId	Get all tasks of a specific user	userId = User ID
Middleware

authMiddleware

Validates JWT token from cookies or Authorization header

Attaches req.user to the request

adminMiddleware

Checks if logged-in user has admin role

Protects admin-only routes

Project Structure
task-management-api/
│
├── server.js           # Main server file
├── package.json
├── .env                # Environment variables
│
├── models/
│   ├── userModel.js    # User schema
│   └── taskModel.js    # Task schema
│
├── controllers/
│   ├── userController.js
│   └── taskController.js
│
├── middlewares/
│   ├── authMiddleware.js
│   └── adminMiddleware.js
│
└── utility/
    └── tokenUtility.js  # JWT encode/decode

Notes

Passwords are securely hashed using bcryptjs

JWT tokens are signed with JWT_SECRET and sent as HTTP-only cookies

Admin routes are protected with both auth and role check middleware

MongoDB connection should use MongoDB Atlas or local MongoDB

This README covers installation, usage, routes, and project structure, so you can quickly set up and run your Task Management API.
