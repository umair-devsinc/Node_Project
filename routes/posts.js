const { Router } = require('express');
const db = require('../models');
const postController=require('../controllers/postController');

const router=Router();

router.post('/post',postController.postCreate);

router.get('/post',postController.postGet);

router.put('/post/:id',postController.postEdit);

router.put('/dPost/:id/:flag', postController.postDraft);

router.delete('/post',postController.postDelete);


module.exports=router;