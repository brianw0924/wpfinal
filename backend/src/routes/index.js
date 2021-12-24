import express from 'express'
import newPost from './api/newPost';
import order from './api/order';

const router = express.Router();
router.post('/newPost', newPost);
router.post('/order', order);

export default router;