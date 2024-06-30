const { sequelize } = require("../app/services/dbConnect")
const User =require('../app/models/user')
const Account=require('../app/models/account')







async function createUserAndAssignAccount(userName,accountCurrency,intialDeposit=0){

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
    return result;
    }

    catch(error){
    console.error("Error in creating customer and his account",error);
    throw error;
    }
}

module.exports={
    createUserAndAssignAccount
}