import express from 'express';

const router = express.Router();

router.use('/', await (await import('./routers/example.js')).default);

export default router;