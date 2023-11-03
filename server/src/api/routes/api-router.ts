import express, { Router } from 'express';

const apiRouter = Router();

apiRouter.use(express.json());

apiRouter.get('/', (req, res) => {
  res.json({ number: 2, message: 'gfsg' });
  });

export default apiRouter;

