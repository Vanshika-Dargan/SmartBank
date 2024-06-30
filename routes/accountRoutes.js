const {Router} =require('express');
const router=Router();
const {getBalance} =require('../controllers/accountController');

router.get('/get-balance',getBalance);


module.exports=router;
