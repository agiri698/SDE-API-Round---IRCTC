Railway Management System API
This project is a simple API for a railway management system where users can check train availability, book seats, and admins can manage trains. It includes role-based access control and handles race conditions to ensure that bookings are done in real-time and without conflicts.

Tech Stack
Node.js with Express.js
MySQL with Sequelize ORM
JWT for authentication
API Key for admin authorization
Features
Register a User: Register a new user to access the system.
Login: User authentication using JWT tokens.
Add a Train (Admin): Admins can add a train with total seats, source, and destination.
Check Seat Availability: Users can check the seat availability between two stations.
Book a Seat: Users can book a seat on a train if seats are available. The system handles race conditions efficiently.
Get Booking Details: Users can view their booking details for a particular train.
Requirements
Node.js (v12 or above)
MySQL (v8.0 or above)
Setup Instructions
1. Clone the Repository
bash
Copy code
git clone https://github.com/yourusername/railway-management-system.git
cd railway-management-system
2. Install Dependencies
bash
Copy code
npm install
3. Configure Environment Variables
Create a .env file in the root of the project and add the following:

makefile
Copy code
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=railway_management
JWT_SECRET=your_jwt_secret
PORT=3000
API_KEY=your_admin_api_key
DB_HOST: The hostname where MySQL is running.
DB_USER: The MySQL user.
DB_PASS: The MySQL password.
DB_NAME: The database name where you want to store the data.
JWT_SECRET: A secret key for JWT token signing.
API_KEY: The API key used for admin authentication.
4. Database Setup
Make sure MySQL is running, and create a new database for the project:

sql
Copy code
CREATE DATABASE railway_management;
Run the following command to sync the models to the database:

bash
Copy code
npm run sync-db
This will create the necessary tables for Users, Trains, and Bookings.

5. Run the Application
bash
Copy code
npm start
The server will start on http://localhost:3000.

6. Run Tests (Optional)
If you've written any tests (you can use tools like Jest or Mocha), run the tests using:

bash
Copy code
npm test
API Endpoints
User Endpoints
1. Register a User
POST /api/user/register
Request Body:
json
Copy code
{
  "username": "user123",
  "password": "password123"
}
2. Login User
POST /api/user/login
Request Body:
json
Copy code
{
  "username": "user123",
  "password": "password123"
}
Response:
json
Copy code
{
  "token": "jwt_token_here"
}
3. Check Seat Availability
POST /api/user/seat-availability
Headers: Authorization: Bearer <JWT_TOKEN>
Request Body:
json
Copy code
{
  "source": "Station A",
  "destination": "Station B"
}
4. Book a Seat
POST /api/user/book-seat
Headers: Authorization: Bearer <JWT_TOKEN>
Request Body:
json
Copy code
{
  "trainId": 1
}
5. Get Booking Details
GET /api/user/booking-details/:bookingId
Headers: Authorization: Bearer <JWT_TOKEN>
Admin Endpoints
1. Add a Train
POST /api/admin/train
Headers: x-api-key: your_admin_api_key
Request Body:
json
Copy code
{
  "name": "Express Train",
  "source": "Station A",
  "destination": "Station B",
  "totalSeats": 100
}
Error Handling
All endpoints return errors in the following format:
json
Copy code
{
  "message": "Error message here"
}
Notes
Race Conditions: The booking system ensures that only one seat is booked when multiple users try to book the same seat simultaneously. This is handled by decrementing seat availability only when a booking is confirmed.
Admin Protection: All admin routes are protected by an API key which is checked before performing any operations.
Future Enhancements
Add more detailed error handling and logging.
Implement pagination for train listings.
Add a front-end to visualize the API's functionality.
