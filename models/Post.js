const {Sequelize,DataTypes}=require('sequelize');
const db=require('../config/database');

const Post=db.define('post',{
    title:{
        type:DataTypes.STRING
    },
    content:{
        type:DataTypes.STRING
    },
    uid:{
        type:DataTypes.INTEGER
    },

    
    
})
Post.sync();

module.exports=Post;