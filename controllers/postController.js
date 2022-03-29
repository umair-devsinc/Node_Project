const db = require('../models');

const postCreate=async (req,res)=>{
    const post = await db.Post.create({
        title: req.body.title,
        content: req.body.content,
        uid:req.body.uid
      });
     
      console.log(post.toJSON()); 
    res.status(200).send({msg:"hello"});
}

const postGet=async (req,res)=>{
  let where = {}

  if (req.query.id) {
    where = {
      uid: req.query.id,
      flag:false
    }
  }else{
    where = {
      flag:true
    }
  }
  console.log("in flag scene")
  
    const posts = await db.Post.findAll({
      order: [['createdAt', 'DESC']],
      where:where
    });
    
    res.status(200).send(posts);
}

const postEdit=async (req,res)=>{
    const posts = await db.Post.update({ 
        title: req.body.title,
        content:req.body.content,
     }, {
        where: {
          id: req.params['id']
        }
      });



    res.status(200).send(posts);
}

const postDraft=async (req,res)=>{
  const posts = await db.Post.update({ 
      flag:req.params['flag']
   }, {
      where: {
        id: req.params['id']
      }
    });



  res.status(200).send(posts);
}




const postDelete=async (req,res)=>{
    const posts = await db.Post.destroy({
        where: {
          id: req.query.id
        }
      });

    res.status(200).send("deleted");
}

module.exports={
    postCreate,
    postGet,
    postEdit,
    postDraft,
    postDelete
}