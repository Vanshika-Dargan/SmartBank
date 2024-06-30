const {Router} = require('express');

const router=Router();

const {createUserAndAssignAccount} =require('../controllers/userController');


router.post('/create',createUserAndAssignAccount);

module.exports=router;