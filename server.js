//Install express server
const express = require('express');
const path = require('path');

const app = express();
const forceSsl = require('force-ssl-heroku');

// Serve only the static files form the dist directory
app.use(forceSsl);
app.use(express.static('./dist/Political-Tap-Window'));
app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`)
    } else {
      next();
    }
  });

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/Political-Tap-Window/'}),
);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);