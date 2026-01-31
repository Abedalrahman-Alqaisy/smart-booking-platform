# Step-by-Step Instructions to Run the Smart Booking Platform

This guide provides the necessary steps to set up and run the Smart Booking Platform locally.

## Prerequisites

You must have the following software installed on your system:

1.  **Node.js** (LTS version recommended)
2.  **npm** (Node Package Manager, comes with Node.js)
3.  **SQLite3** (The backend uses the `sqlite3` npm package, which requires the SQLite library to be installed on your system)

## Project Setup

1.  **Unzip the Project:**
    Unzip the provided `smart-booking-platform.zip` file to a location of your choice.

2.  **Navigate to the Backend Directory:**
    Open your terminal or command prompt and navigate to the backend folder:
    \`\`\`bash
    cd smart-booking-platform/backend
    \`\`\`

3.  **Install Dependencies:**
    Install all required Node.js packages:
    \`\`\`bash
    npm install
    \`\`\`

## Running the Backend Server

The backend server is built with Node.js and Express.js. It uses SQLite3 for the database, and the database file (`smart_booking.db`) will be automatically created and initialized with a sample user upon first run.

1.  **Start the Server:**
    Run the server using the following command:
    \`\`\`bash
    node server.js
    \`\`\`
    You should see the message: \`Server running at http://localhost:3000\`

## Running the Frontend

The frontend is a static application built with HTML, Bootstrap, and Vanilla JavaScript. It communicates with the backend API running on port 3000.

1.  **Open the Login Page:**
    Navigate to the `smart-booking-platform/frontend` directory.
    Open the `login.html` file in your web browser (e.g., by double-clicking it).

2.  **Login Credentials:**
    Use the following default credentials to log in:
    *   **Username:** \`admin\`
    *   **Password:** \`admin123\`

3.  **Access the Dashboard:**
    Upon successful login, you will be redirected to the `dashboard.html`, where you can manage bookings.

## Key Files

| File | Description |
| :--- | :--- |
| \`backend/server.js\` | The main Express.js server file containing all API routes and database logic. |
| \`frontend/login.html\` | The login page. |
| \`frontend/dashboard.html\` | The main booking management interface. |
| \`frontend/js/auth.js\` | JavaScript logic for handling user login. |
| \`frontend/js/app.js\` | JavaScript logic for handling all booking CRUD operations and UI updates. |
| \`database/schema.sql\` | The original MySQL schema (for reference). The SQLite schema is created programmatically in \`server.js\`. |
