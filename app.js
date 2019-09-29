const dotenv = require('dotenv');
const express = require('express');
const app = express();
dotenv.config();
const github = require('./server/routes/api/github');
const buildbot = require('./server/routes/api/buildbot');
const testman = require('./server/routes/api/testman');
const PORT = process.env.PORT || 5000;
const path = require('path');
const dev = app.get('env') !== 'production';

//settings for production Environment
if (!dev) {
  app.disable('x-powered-by');
  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, 'client/build')));
}

//API calls to GitHub API
app.use('/api/github', github);

//API calls to BuildBot Endpoints
app.use('/api/buildbot', buildbot);

//API calls to Testman Endpoints
app.use('/api/testman', testman);

if (!dev) {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
  });
}

app.listen(PORT, () => {
  console.log('server started');
});
