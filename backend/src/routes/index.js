import express from 'express'
import newPost from './api/newPost';
import order from './api/order';
import allPosts from './api/allPosts'
import postDetail from './api/postDetail'

const router = express.Router();
router.post('/newPost', newPost);
router.post('/order', order);
router.get('/allPosts', allPosts);
router.get('/postDetail', postDetail);

export default router;