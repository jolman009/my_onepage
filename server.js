import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import contactRoutes from './routes/contact.js';
import { sequelize } from './config/db.js';

// Initialize express app
const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(helmet()); // Security headers
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Configure CORS - adjust this based on your domain
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:10000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routes
app.get('/', (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: 'Welcome to the Contact API!' 
  });
});
app.use('/api/contact', contactRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'An error occurred on the server.' 
  });
});


// Start server
async function startServer() {
  try {
    // Sync database models
    await sequelize.sync();
    console.log('Database connected and models synced');
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();