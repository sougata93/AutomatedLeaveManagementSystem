const db=require('../models');
const addAdmin=()=>{
const insertInAdmin=db.adminDetails;
insertInAdmin.create({
    name: "Test AdOne",
    email: "specialvideos9303@gmail.com",
    passcode:'admin',
}).then(res => {
    console.log(res)
}).catch((error) => {
    console.error('Failed to create a new record : ', error);
});
}
module.exports={addEmp}