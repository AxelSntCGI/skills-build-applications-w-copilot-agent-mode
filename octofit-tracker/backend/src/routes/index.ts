import { Router } from 'express';
import type { Model } from 'mongoose';

import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

type ResourceDocument = Record<string, unknown>;

type ResourceModel = Model<ResourceDocument>;

function createResourceRouter(model: ResourceModel, options: { sort?: Record<string, 1 | -1> } = {}) {
  const router = Router();

  router.get('/', async (_request, response) => {
    const documents = await model.find().sort(options.sort ?? { createdAt: -1 });
    response.json(documents);
  });

  router.post('/', async (request, response) => {
    const document = await model.create(request.body);
    response.status(201).json(document);
  });

  router.get('/:id', async (request, response) => {
    const document = await model.findById(request.params.id);
    if (!document) {
      response.status(404).json({ error: 'Resource not found' });
      return;
    }

    response.json(document);
  });

  router.patch('/:id', async (request, response) => {
    const document = await model.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
      runValidators: true,
    });
    if (!document) {
      response.status(404).json({ error: 'Resource not found' });
      return;
    }

    response.json(document);
  });

  router.delete('/:id', async (request, response) => {
    const document = await model.findByIdAndDelete(request.params.id);
    if (!document) {
      response.status(404).json({ error: 'Resource not found' });
      return;
    }

    response.status(204).send();
  });

  return router;
}

export const usersRouter = createResourceRouter(User);
export const teamsRouter = createResourceRouter(Team);
export const activitiesRouter = createResourceRouter(Activity);
export const leaderboardRouter = createResourceRouter(Leaderboard, { sort: { points: -1 } });
export const workoutsRouter = createResourceRouter(Workout);
