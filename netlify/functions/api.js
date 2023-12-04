// Importing MongoDB client
const { MongoClient } = require('mongodb');

// function to handle requests
exports.handler = async (req, res) => {
  // Only process GET requests
  if (req.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  // Database connection setup
  const mongoClient = new MongoClient('mongodb+srv://tejamoparthi84441:admin@cluster0.srspabd.mongodb.net/');

  try {
    // Connect to MongoDB
    await mongoClient.connect();
    const db = mongoClient.db('universities_database');
    const universities = db.collection('universities_data');
    
    // Fetch data from the collection
    const result = await universities.find({}).toArray();

    // Successful response
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      },
      body: JSON.stringify({ "Top Universities in the world": result }, null, 2)
    };
  } catch (error) {
    // Error handling
    console.error('Database Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server Error' }),
    };
  } finally {
    // Closing the client
    await mongoClient.close();
  }
};
