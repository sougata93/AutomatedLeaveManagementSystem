const db=require('../models');
const addEmp=(name,mail,lv,sal,pass)=>{
const insertInEmp=db.empDetails;
insertInEmp.create({
    name: name,
    email: mail,
    leave: lv,
    salary:sal,
    passcode:pass,
}).then(res => {
    console.log(res)
}).catch((error) => {
    console.error('Failed to create a new record : ', error);
});
}
module.exports={addEmp}