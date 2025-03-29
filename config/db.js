import { Sequelize } from 'sequelize';

// Create a Sequelize instance using SQLite (in-memory)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:', // Use in-memory SQLite for testing
  logging: false
});

// Test database connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully (SQLite in-memory).');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// Export sequelize instance for use in models
export { sequelize, testConnection };