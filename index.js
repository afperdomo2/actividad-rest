const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const path = require('path');

const {
  logErrors,
  boomErrorHandler,
  errorHandler,
  ormErrorHandler,
} = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// STATIC FILES
const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));

app.use(express.json());

// CORS
const whiteList = ['http://localhost:8080', 'http://localhost:4000'];
const options = {
  origin: (origin, callback) => {
    if (!whiteList.includes(origin) && origin) {
      callback(new Error('Acceso no permitido'));
    }
    callback(null, true);
  },
};
app.use(cors(options));
//require('./utils/auth');

// ROUTES
routerApi(app);

/**
 * MIDDLEWARES
 * Es importante tener en cuenta el orden de ejecución
 */
app.use(logErrors);
app.use(boomErrorHandler);
app.use(ormErrorHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.info(`✅ Server express on: http://localhost:${PORT}`);
});
