const {sequelize}= require('../../services/dbConnect');


test('Running Test For Database Connection',async()=>{

    try{
    await sequelize.authenticate();
    console.log('Database connected successfully');
    }
    catch(error){
        console.error('Not able to establish connnection',error);
        expect(error).toBeNull();
    }
    finally{
        await sequelize.close();
    }
})