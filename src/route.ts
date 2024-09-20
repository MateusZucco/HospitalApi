import { Router } from 'express';
import * as appointmentsController from './controllers/appointments.controller';
import * as usersController from './controllers/users.controller';
import { verifyToken } from './middleware/verifyToken';

const routes = Router();

routes.get('/users', verifyToken, usersController.getAll);
routes.get('/users/:id', verifyToken, usersController.getById);
routes.post('/login', usersController.login);
routes.post('/users', verifyToken, usersController.create);
routes.put('/users/:id', verifyToken, usersController.update);
routes.delete('/users/:id', verifyToken, usersController.remove);

routes.get('/appointments', verifyToken, appointmentsController.getAll);
routes.get('/appointments/:id', verifyToken, appointmentsController.getById);
routes.post('/appointments', verifyToken, appointmentsController.create);
routes.put('/appointments/:id', verifyToken, appointmentsController.update);
routes.delete('/appointments/:id', verifyToken, appointmentsController.remove);

export default routes;
