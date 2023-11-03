import express, { Router } from 'express';

const apiRouter = Router();

apiRouter.use(express.json());

interface QueryParams {
  filter: string;
}

apiRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  const { filter } = req.query as unknown as QueryParams;
  
  res.json({ number: 2, message: 'gfsg', id, filter });
  });

export default apiRouter;

