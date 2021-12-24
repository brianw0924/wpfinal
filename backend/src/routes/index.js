import express from 'express'
import newPost from './api/newPost';

const router = express.Router();
router.post('/newPost', newPost);

export default router;