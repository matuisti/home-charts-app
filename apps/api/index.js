const express = require('express');
const app = express();
const router = express.Router();
const routes = require('./routes/router');

const logger = (req, res, next) => {
  console.log(`${res.statusCode} ${req.method} ${req.originalUrl}`)
  next();
}
app.use(logger);

router.use(routes);
app.use('/api', router);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Home-chart server running port: %s', port);
});
