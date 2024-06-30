
const {sequelize} = require('../services/dbConnect');
const {Model,DataTypes} = require('sequelize');

class User extends Model{}


User.init(
    {
       id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
       },
       name:{
        type: DataTypes.STRING,
        allowNull:false
       }
    },
    {sequelize,modelName:"user"},
);

module.exports=User;