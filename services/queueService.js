const Queue = require('bull');
const Account = require('../models/account');




const queue = new Queue('bank_queue',{
    redis:{
        port:  6379,
        host:'localhost'
    }
});



async function startQueueWorker(){

queue.process('record_and_process_transaction',async (job)=>{
    try{
    const {amount, type, user_id, account_id} =job.data;

    if(type=='deposit'){
        await recordTransaction("deposit",amount,user_id,account_id);
    }
    else if(type=='withdrawl'){
      const account=await Account.findByPk(account_id);
      if(account){
      await recordTransaction("withdrawl",amount,user_id,account_id);
      }
    }
    else{
        console.log('Transaction not supported');
    }
    }
    catch(error){
    if(job.attemptsMade<3){
        throw new Error("Retry");
    }
    else{
        console.log('Failed transaction after 3 attempts');
    }
    }
});

const res=await queue.isReady();

}


async function transactionInQueue(account_id)
{
const pendingJobs=await queue.getJobs(['waiting','active']);
let pendingDeposit=0;
let pendingWithdraw=0;
pendingJobs.forEach((job)=>{
    const jobData=job.data;
    if(jobData.type=='deposit' && jobData.account_id==parseInt(account_id)){
        pendingDeposit+=jobData.amount || 0;
    }
    else if(jobData.type=='withdraw' && jobData.account_id==parseInt(account_id)){
        pendingWithdraw+=jobData.amount || 0;
    }
});
return pendingDeposit-pendingWithdraw;
}

module.exports={
    transactionInQueue,
    startQueueWorker
}