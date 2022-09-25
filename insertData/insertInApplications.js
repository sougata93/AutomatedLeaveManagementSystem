const db=require('../models');


const insertApps=async (email,appfrom,appto,lv)=>{
const insertInApps=await db.Applications;
insertInApps.create({
    empmail: email,
    applyfrom:appfrom,
    applyto:appto,
    totalleave:lv,
}).then(res => {
    console.log(res)
}).catch((error) => {
    console.error('Failed to create a new record : ', error);
});
}

module.exports={insertApps};