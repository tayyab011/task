1 / Clone the repository:
git clone <repository-url>
cd task-management-api


2/ Install dependencies:
npm install

3/ Run the server:
node --watch app.js

Server will run at http://localhost:5050





| Variable     | Description                       |
| ------------ | --------------------------------- |
| PORT         | Server port  5050                 |
| MONGO_URI    | MongoDB connection URI            |
| JWT_SECRET   | Secret key for signing JWT tokens |








| Method | Endpoint        | Description                     | Request Body                                  |
| ------ | --------------- | ------------------------------- | --------------------------------------------- |
| POST   | /api/register   | Register a new user             | { fullName, email, mobile, password, role }   |
| POST   | /api/login      | Login user and return JWT token | { email, password }                            
                                         



| Method | Endpoint         | Description                       | Request Body / Params                               |
| ------ | ---------------- | --------------------------------- | --------------------------------------------------- |
| POST   | /api/tasks     | Create a new task                 | { title, description, status, priority, dueDate }     |
| GET    | /api/tasks     | List all tasks for logged-in user | -                                                     |
| GET    | /api/tasks/:id | Get a single task by ID           | :id = task ID                                         |
| PUT    | /api/tasks/:id | Update a task                     | { title, description, status, priority, dueDate }     |
| DELETE | /api/tasks/:id | Delete a task                     | :id = task ID                                         |



| Method | Endpoint               | Description                      | Params             |
| ------ | ---------------------- | -------------------------------- | ------------------ |
| GET    | /admin/tasks           | Get all tasks from all users     | -                  |



Middleware:

1 /authMiddleware

 * Validates JWT token from cookies or Authorization header

 * Attaches req.user to the request

2/adminMiddleware

 * Checks if logged-in user has admin role

 * Protects admin-only routes




Notes:

* Passwords are securely hashed using bcryptjs

* JWT tokens are signed with JWT_SECRET and sent as HTTP-only cookies

* Admin routes are protected with both auth and role check middleware

* MongoDB connection can be either MongoDB Atlas or local MongoDB


