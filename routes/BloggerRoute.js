const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const BlogController = require('../controllers/BlogController');
const authMiddleware = require('../middleware/Authentication')

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.post('/addBlog', BlogController.addBlog);
router.put('/update/:id', BlogController.updateBlog);
router.delete('/delete/:id', BlogController.deleteBlog);
router.get('/getblog', BlogController.viewBlog);
router.get('/getblogs/:id', BlogController.viewSingleBlog);


module.exports = router;