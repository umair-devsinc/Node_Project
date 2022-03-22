const { Router } = require('express');
const Post=require('../models/Post');

const router=Router();

router.post('/post', async (req,res)=>{
    const post = await Post.create({
        title: req.body.title,
        content: req.body.content,
        uid:req.body.uid
      });
     
      console.log(post.toJSON()); 
    res.status(200).send({msg:"hello"});
})

router.get('/post', async (req,res)=>{
    const posts = await Post.findAll({order: [['createdAt', 'DESC']]});

    res.status(200).send(posts);
})

router.put('/post', async (req,res)=>{
    const posts = await Post.update({ 
        title: req.body.title,
        content:req.body.content,
     }, {
        where: {
          id: req.body.id
        }
      });



    res.status(200).send(posts);
});

router.delete('/post',async (req,res)=>{
    const posts = await Post.destroy({
        where: {
          id: req.query.id
        }
      });

    res.status(200).send("deleted");
})


module.exports=router;