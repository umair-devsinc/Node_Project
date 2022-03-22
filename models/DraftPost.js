const {Sequelize,DataTypes}=require('sequelize');
const db=require('../config/database');

const DraftPost=db.define('draftPost',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true
    },
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
DraftPost.sync();

module.exports=DraftPost;