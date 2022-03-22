const { Router } = require('express');
const DraftPost=require('../models/DraftPost');

const router=Router();

router.post('/draftpost', async (req,res)=>{
    const draftPost = await DraftPost.create({
        id:req.body.id,
        title: req.body.title,
        content: req.body.content,
        uid:req.body.uid
      });
     
    res.status(200).send({msg:"hello"});
});
router.get('/draftpost', async (req,res)=>{
    const draftPosts = await DraftPost.findAll({where: {
        uid:req.query.id
    },order: [['createdAt', 'DESC']]});

    res.status(200).send(draftPosts);
});

router.put('/draftpost', async (req,res)=>{
    const draftPosts = await DraftPost.update({ 
        title: req.body.title,
        content:req.body.content,
     }, {
        where: {
          id: req.body.id
        }
      });



    res.status(200).send(draftPosts);
});

router.delete('/draftpost',async (req,res)=>{
    const draftposts = await DraftPost.destroy({
        where: {
          id: req.query.id
        }
      });

    res.status(200).send("deleted");
});

module.exports=router;