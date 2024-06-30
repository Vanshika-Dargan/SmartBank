
const {sequelize} = require('../services/dbConnect');
const {Model,DataTypes} = require('sequelize');

class Transaction extends Model{}


Transaction.init(
    {
       id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
       },
       type:{
        type: DataTypes.ENUM,
        validate:["depost","withdraw"],
        allowNull:false
       },
       amount:{
        type: DataTypes.INTEGER,
        allowNull:false
       },
       timestamp:{
        type:DataTypes.DATE,
        allowNull:false
       },
       user_id:{
        type:DataTypes.INTEGER,
        allowNull:false
       },
       account_id:{
        type:DataTypes.INTEGER,
        allowNull:false
       }
    },
    {sequelize,modelName:"transaction"},
);

module.exports=Transaction;