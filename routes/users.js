const { Router } = require('express');
const router=Router();
const db=require('../config/database');
const User=require('../models/User');
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");


dotenv.config({ path: "./config.env" });




router.post('/register', async (req,res)=>{
    const user = await User.create({
        firstname: req.body.fname,
        lastname: req.body.lname,
        email:req.body.email,
        password:req.body.password,
      });
     
      console.log(user.toJSON()); 
    res.status(200).send({msg:"hello"});
      
   
}

);
router.get('/signIn', async (req,res)=>{
    try{
        const { email, password } = req.query;
    
        if (!email || !password) {
          return res.status(400).json({ error: "Plz filled the data" });
        }
        const user = await User.findOne({
            where:{
                email:email,
                password:password,
            }
          });
        if(!user){
            res.status(400).json({ error: "Plz enter correct email and password" });
        }else{
            
            let token = jwt.sign({ id: user.id.toString() }, process.env.SECRET_KEY);

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: false,
              });
              res.status(200).json({id:user.id, message: "User Signin Successfully" });
    
            
        }
          
    

    } catch(error){
        console.log(error);
    }
   

});

router.get('/user', async (req,res)=>{
    const user = await User.findOne({
        where:{
            id:req.query.id
        }
    });
     
      console.log(user.toJSON()); 
    res.status(200).send(user);
      
   
});



module.exports=router;