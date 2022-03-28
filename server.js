const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/apiRoute');
const htmlRoutes = require('./routes/htmlRoute');

const PORT = process.env.PORT || 3001;

// initializes express
const app = express();

// Sets up the static files
app.use(express.static(path.join(__dirname, 'public')));


// parse application/json
app.use(express.json());


//Sets up data parsing
app.use(express.urlencoded({ extended: true }));

// Set ups the HTML directory path for startup
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public'))
);


//app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


// Listening on PORT
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`),
  // console.log('Follow this link to get there http://localhost:3001/api/db 🚀')
);
