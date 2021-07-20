const express = require('express');


const userController = require('../controllers/user');

const isAuth = require('../middleware/isAuth');

const router = express.Router();



router.get('/user',isAuth,userController.getProfile);

router.post('/user',isAuth,userController.createProfilePicture);



router.put('/user',isAuth,userController.updateUser)

router.delete('/user',isAuth,userController.deleteUser);

module.exports = router;