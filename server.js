//Install express server
const express = require('express');
const path = require('path');

const app = express();
const forceSsl = require('force-ssl-heroku');

// Serve only the static files form the dist directory
app.use(express.static('./dist/Political-Tap-Window'));
app.use(forceSsl);

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/Political-Tap-Window/'}),
);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);