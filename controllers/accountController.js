const Account = require("../models/account");



const getBalance=async(req,res)=>{
const {account_id}=req.query;

if(!account_id){
    return res.status(400).json({
        error:"Account id is not provided"
    })
}



res.json({})
}


module.exports={
    getBalance
}