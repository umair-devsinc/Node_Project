const { Router } = require('express');
const router=Router();
const userController=require('../controllers/userController');


router.post('/register',userController.userRegister);

router.get('/signIn', userController.userLogin);

router.get('/user',userController.userFind);

router.get('/logout', userController.userLogout);



module.exports=router;