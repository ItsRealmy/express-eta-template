import express from 'express';
import path from 'node:path';
import url from 'node:url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const router = express.Router();

router.use('/', await (await import('./routers/example.js')).default);

router.use('/static', express.static(path.join(__dirname, '../static')));

export default router;