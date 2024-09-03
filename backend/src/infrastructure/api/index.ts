import express, { json, urlencoded } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import { RegisterRoutes } from '../../../build/routes';
import swaggerDocument from '../../../build/swagger.json';

import { errorHandler } from './error-handler';

import config from './api.config';

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

RegisterRoutes(app);

app.use(errorHandler);

const server = app.listen(config.port, async () => {
  console.log(`Listening at http://localhost:${config.port}`);
});
server.on('error', console.error);
