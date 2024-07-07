
async function deposit(req,res){
    const {amount,customer_id,account_id}=req.body;

    await producer.send({
        topic:"topicDeposit",
        messages:[
            {
                value: JSON.stringify({
                    customer_id,
                    account_id,
                    amount
                })
            }
        ]
    });

    res.json({message:"Deposit request recieved"});
}

async function withdraw(req,res){
    const {amount,customer_id,}=req.body;

    await producer.send({
        topic:"topicWithdraw",
        messages:[{
            value:JSON.stringify({
            customer_id,
            account_id,
            amount
            })
        }]
    });

    res.json({message:"Withdraw request recieved."})

}

module.export={
    deposit,
    withdraw
}