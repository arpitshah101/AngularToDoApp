import * as Promise from 'bluebird';
import { Request, Response, Router } from 'express';

import { TaskManager } from '../modules/taskManager';
import { verifyAuthentication } from './common-util';

const router = Router();

router.get('/allTasks', verifyAuthentication, (req: Request, res: Response, next: () => void) => {
    TaskManager.getAll()
        .then(tasks => res.json(tasks))
        .finally(next);
});

export const TaskRoutes = router;
