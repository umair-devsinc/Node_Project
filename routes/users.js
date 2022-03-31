const { Router } = require('express');
const router=Router();
const userController=require('../controllers/userController');


router.post('/register',userController.register);

router.get('/signIn', userController.login);

router.get('/user',userController.find);

router.get('/logout', userController.logout);



module.exports=router;