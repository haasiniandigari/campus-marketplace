# Campus Marketplace 🏛️

A full-stack buy and sell platform exclusively for college students. Trade hostel essentials, textbooks, gadgets, and more — within your campus community.

## Features

- Student registration and login with JWT authentication
- Post listings with image upload via Cloudinary
- Browse and search listings by category
- Filter by condition, price, and category
- Listing detail modal with seller info
- Responsive dark-themed UI

## Tech Stack

**Frontend:** React, Vite, Tailwind CSS, React Router DOM
**Backend:** Node.js, Express.js
**Database:** MongoDB with Mongoose
**Media Storage:** Cloudinary
**Authentication:** JSON Web Tokens (JWT), bcryptjs

Set up the backend:
```bash
cd server
npm install
```

Create `server/.env`:
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

Set up the frontend:
```bash
cd campus-marketplace
npm install
```

### Running the App

Start the backend (from the server folder):
```bash
npm run dev
```

Start the frontend (from the campus-marketplace folder):
```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

Backend runs on `http://localhost:5000`

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /api/auth/register | Register a new student | No |
| POST | /api/auth/login | Login and get JWT token | No |
| GET | /api/listings | Get all listings | No |
| POST | /api/listings | Create a new listing | Yes |
| DELETE | /api/listings/:id | Delete a listing | Yes |


