# Job Posting & Bidding API

A RESTful API for job posting and bidding system built with Node.js, Express, and MongoDB.

## Features

- User authentication (JWT-based)
- Role-based access control (Freelancer/Employer)
- Job posting and management
- Bid creation and management
- Real-time notifications (WebSocket)
- API documentation with Swagger
- Rate limiting and security features

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd job-bidding-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add the following variables:
```

```

4. Start the server:
```bash
npm start
```

## API Documentation

The API documentation is available at `/api-docs` when the server is running. It provides detailed information about all available endpoints, request/response formats, and authentication requirements.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Jobs
- `POST /api/jobs` - Create a new job (Employer only)
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/:id` - Get a specific job
- `GET /api/jobs?skills=react,nodejs` - Filter jobs by skills

### Bids
- `POST /api/bids/:jobId` - Create a bid (Freelancer only)
- `GET /api/bids/:jobId` - Get all bids for a job
- `PATCH /api/bids/:bidId/accept` - Accept a bid (Employer only)
- `PATCH /api/bids/:bidId/reject` - Reject a bid (Employer only)

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- Rate limiting
- CORS protection
- Helmet for security headers
- Input validation

## Error Handling

The API uses a consistent error response format:
```json
{
  "success": false,
  "message": "Error message"
}
```

