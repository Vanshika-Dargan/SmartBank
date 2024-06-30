const express =require('express');
const app=express();
const routes=require('./routes');
const {sequelize} = require('./services/dbConnect');




app.use(express.json());

app.use('/bank-api/v1/',routes);




const PORT=process.env.PORT || 6001;
app.listen(PORT,async()=>{
    console.log(`Server listening on port ${PORT}`);
    await sequelize.sync({force:false})
});





