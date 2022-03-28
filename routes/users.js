const { Router } = require('express');
const router=Router();
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { Sequelize } = require('../config/database');
const User=require('../models/user');
const db = require('../models');
const cookieParser = require('cookie-parser')

dotenv.config({ path: "./config.env" });


router.post('/register', async (req,res)=>{
    try{
            const userExist = await db.User.findOne({ email:req.body.email });
        
            if (userExist) {
              return res.status(422).json({ error: "Email already Exist" });
            }  
            else {
                const user = await db.User.create({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email:req.body.email,
                    password:req.body.password,
                });
        
                console.log(user.toJSON()); 
                res.status(200).send({msg:"hello"});
           }
    }
    catch(err)
    {
        res.status(400).json({error:err});
    }
      
   
}

);
router.get('/signIn', async (req,res)=>{
    try{
        const { email, password } = req.query;
    
        if (!email || !password) {
          return res.status(400).json({ error: "Plz filled the data" });
        }
        const user = await db.User.findOne({
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
    const user = await db.User.findOne({
        where:{
            id:req.query.id
        }
    });
     
    res.status(200).send(user);
      
   
});

router.get('/logout', async (req,res)=>{
  
    
    let token = jwt.sign({ id: '123' }, process.env.SECRET_KEY);

    res.cookie("jwwwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: false,
      });
      res.status(200).json({message: "Logout removed cookie" });
      
   
});



module.exports=router;