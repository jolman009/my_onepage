# Portfolio Backend

This is a Node.js backend for your portfolio website's contact form, built with Express and MySQL.

## Features

- **Contact Form Processing**: Receives and validates form submissions
- **Database Storage**: Stores contact submissions in a MySQL database
- **Email Notifications**: Sends email notifications for new messages
- **Security Features**: 
  - Input validation
  - Rate limiting to prevent spam
  - CORS configuration
  - Security headers with Helmet
  - Protection against common web vulnerabilities

## Tech Stack

- **Node.js & Express**: Server framework
- **MySQL & Sequelize**: Database and ORM
- **Nodemailer**: Email sending
- **Express Validator**: Input validation
- **Express Rate Limit**: Rate limiting
- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing

## Setup Instructions

### Prerequisites

- Node.js (v14+)
- MySQL
- npm or yarn

### Installation

1. **Clone the repository**

```bash
git clone [your-repo-url]
cd portfolio-backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

- Copy `sample.env` to `.env`
- Fill in your database and email credentials

```bash
cp sample.env .env
```

4. **Create the database**

```sql
CREATE DATABASE portfolio_db;
```

5. **Start the server**

```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The server will start at `http://localhost:5000`.

## API Endpoints

### POST /api/contact

Send a contact form message.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'd like to discuss a potential project."
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Your message has been sent successfully!",
  "contactId": 1
}
```

### GET /api/contact

Get all contact submissions (would require authentication in a real app).

**Success Response (200):**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "subject": "Project Inquiry",
      "message": "I'd like to discuss a potential project.",
      "isRead": false,
      "createdAt": "2023-10-25T12:34:56.789Z",
      "updatedAt": "2023-10-25T12:34:56.789Z"
    }
  ]
}
```

### PUT /api/contact/:id/read

Mark a contact submission as read.

**Success Response (200):**
```json
{
  "success": true,
  "message": "Contact marked as read.",
  "data": {
    "id": 1,
    "isRead": true,
    ...
  }
}
```

## Frontend Integration

To integrate with your frontend, add the following component to your portfolio:

- `ContactForm.js`: React component for the contact form

Make sure to update the API URL in the component to match your backend deployment.

## Deployment Options

### Hosting the API:

- **Render**: Free tier available, easy deployment
- **Vercel**: Good integration with frontend, free tier available
- **Railway**: Simple database and application deployment

### Database:

- **PlanetScale**: MySQL-compatible serverless database (free tier available)
- **Railway**: MySQL hosting
- **AWS RDS**: MySQL database (not free but reliable)

## Adding to Your Portfolio

This backend implementation demonstrates your skills in:

1. **Node.js/Express**: Building RESTful APIs
2. **Database Design**: Modeling data and relationships
3. **Security**: Implementing best practices for web security
4. **API Design**: Creating a clean, well-documented API
5. **Error Handling**: Proper error management and reporting

Make sure to mention these aspects in your portfolio to showcase your backend skills!