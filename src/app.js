import express from 'express';
import cors from 'cors';
import recommendationsRouter from './routers/recommendationsRouter.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/recommendations', recommendationsRouter);

export default app;
