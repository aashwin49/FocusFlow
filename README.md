# FocusFlow 

FocusFlow is a full-stack task management web app built using the MERN stack.  
It helps users manage tasks efficiently with features like authentication, filtering, and real-time updates.

---

## Features

- User authentication (Register / Login with JWT)
- Create, edit, delete tasks
- Mark tasks as completed, archived, or starred
- Filter tasks by status and priority
- Search and sort tasks
- Pagination for better performance
- Responsive UI with clean design

---

## Built With

### Frontend
- React
- Axios (with interceptors)
- TailwindCSS

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)

### Authentication
- JWT (JSON Web Tokens)

---

## How It Works

- User logs in and receives a JWT token  
- Token is stored in localStorage  
- Axios automatically attaches token to every request  
- Backend middleware verifies token  
- Only authenticated users can access their tasks  

---

## Run Locally

Clone the repo:

```bash
git clone https://github.com/aashwin49/focusflow.git
cd focusflow

1) Backend setup:
cd backend
npm install
npm run dev

2) Frontend setup:
cd frontend
npm install
npm run dev

3) Environment variables:
Create a .env file in backend
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

Future Improvements
	•	Add refresh tokens for better authentication
	•	Move JWT to HTTP-only cookies (security)
	•	Add user roles and permissions
	•	Add real-time updates (WebSockets)
	•	Deploy with Docker and CI/CD
