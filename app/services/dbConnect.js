
const {Sequelize} =require('sequelize');


const host=process.env.DB_HOST || 'localhost';
const port=process.env.DB_PORT || 3306;
const user=process.env.DB_USER || "root";
const password=process.env.DB_PASS || "akihsnav@18";
const db=process.env.DB_NAME || "smart_bank_db";

const sequelize=new Sequelize(`mysql://${user}:${password}@${host}:${port}/${db}`);

module.exports={
    sequelize
}