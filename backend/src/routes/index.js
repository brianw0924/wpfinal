import express from 'express'
import newPost from './api/newPost';
import order from './api/order';
import allPosts from './api/allPosts'
import postDetail from './api/postDetail'
import givePost from './api/givePost'
import validPost from './api/validPost'
import obtainPost from './api/obtainPost'

const router = express.Router();
router.post('/newPost', newPost);
router.post('/order', order);
router.get('/allPosts', allPosts);
router.get('/postDetail', postDetail);

router.post('/givePost', givePost); // 贈送
router.post('/validPost', validPost); // 可領取
router.post('/obtainPost', obtainPost); // 已搶到

export default router;