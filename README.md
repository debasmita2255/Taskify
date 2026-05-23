#  Taskify

A full-stack task management application built with the MERN stack (MongoDB, Express, React, Node.js). Taskify allows users to securely register, log in, and manage their daily tasks with varying priorities and statuses.

##  Features
- **Secure User Authentication:** Registration and login functionality using hashed passwords (bcrypt) and JSON Web Tokens (JWT).
- **Task Management:** Create, read, update, and delete (CRUD) tasks.
- **Categorization:** Track tasks by status (`Yet to Start`, `In Progress`, `Completed`).
- **Prioritization:** Assign priority levels to tasks (`Low`, `Medium`, `High`) with visual color-coding.
- **Responsive UI:** Styled cleanly using Tailwind CSS.

##  Tech Stack
- **Frontend:** React.js, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (Mongoose)
- **Security:** bcryptjs (password hashing), jsonwebtoken (auth), cookie-parser

##  Setting up on local machine

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites
Make sure you have Node.js installed on your computer.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/debasmita2255/Taskify.git
   ```

2. **Install Backend Dependencies:**
   Navigate into the server folder and install packages:
   ```bash
   cd Taskify/server
   npm install
   ```

3. **Install Frontend Dependencies:**
   Open a new terminal, navigate to the client folder, and install packages:
   ```bash
   cd Taskify/client
   npm install
   ```

4. **Environment Variables:**
   Create a `.env` file in your `server` folder and add your specific configuration:
   ```env
   PORT=1000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_key
   ```

5. **Run the Application:**
   Start the backend (from the `server` folder):
   ```bash
   npm run dev
   ```
   
   Start the frontend (from the `client` folder):
   ```bash
   npm run dev
   ```
