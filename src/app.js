import express from 'express';
import cors from 'cors';
import recommendationsRouter from './routers/recommendationsRouter.js';
import severErrorMiddleware from './middlewares/severErrorMiddleware.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/recommendations', recommendationsRouter);

app.use(severErrorMiddleware);
export default app;
