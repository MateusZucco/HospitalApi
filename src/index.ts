import express from 'express';
import routes from './route';

const app = express();

app.use(express.json());

app.use(routes);

app.listen(process.env.PORT || 8000, () => {
  console.log(`Service running on port ${process.env.PORT || 8000}`);
});
