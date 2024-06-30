
const {sequelize} = require('../services/dbConnect');
const {Model,DataTypes} = require('sequelize');

class Account extends Model{}


Account.init(
    {
       id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
       },
       balance:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0
       },
       currency:{
        type: DataTypes.STRING(3),
        allowNull:false,
       },
       user_id:{
        type:DataTypes.INTEGER,
        allowNull:false
       },
    },
    {sequelize,modelName:"account"},
);

module.exports=Account;