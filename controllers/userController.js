const { sequelize } = require("../services/dbConnect")
const User =require('../models/user')
const Account=require('../models/account')







const createUserAndAssignAccount=async(req,res)=>{
   const {userName,accountCurrency,intialDeposit}=req.body;
    try{
    const result=await sequelize.transaction(async(t)=>{

        const user=await User.create(
            {name:userName},
            {transaction:t}
        );

        const account=await Account.create(
        {balance:intialDeposit,currency:accountCurrency,user_id:user.id},
        {transaction:t}
        );

        return {userId:user.id,accountId:account.id}
    });
    return res.status(201).json({
        result
    })
    }

    catch(error){
    console.error("Error in creating customer and his account",error);
    throw error;
    }
}

module.exports={
    createUserAndAssignAccount
}