const Account = require("../models/account");
const Transaction = require("../models/transaction");
const { transactionInQueue } = require("../services/queueService");



const getBalance=async(req,res)=>{
const {account_id}=req.query;

if(!account_id){
    return res.status(400).json({
        error:"Account id is not provided"
    })
}

const deposited=await Transaction.sum("amount",{
    where:{
        account_id,type:'deposit'
    }
}) || 0;

const withdrawn=await Transaction.sum("amount",{
    where:{
        account_id,
        type:'withdraw'
    }
}) || 0;

const balance=deposited-withdrawn;


const pending=transactionInQueue(account_id);

balance+=pending;
const account = await Account.findByPk(account_id);
res.json({balance:balance,currency:account.currency});
}


async function recordTransaction(amount,type,user_id,account_id){

    const timestamp=new Date().toUTCString();
    
    try{
    await Transaction.create({type,amount,user_id,account_id,timestamp});
    
    const [totalDeposits,totalWithdrawls]=await Promise.all([
        Transaction.sum("amount",{
            where:{
                account_id:account_id,
                type:"deposit"
            }
        }),
        Transaction.sum("amount",{
            where:{
                account_id:account_id,
                type:"withdrawl"
            }
        })
    ])

    const balance = (totalDeposits || 0)-(totalWithdrawls || 0);

    const account= await Account.findByPk(account_id);

    if(account){
        await account.update({balance});
    }
    else{
        console.error("Account not found for the given id",account_id);
    }
    }
    catch(error){
    console.log(error);
    }

}


module.exports={
    getBalance
}