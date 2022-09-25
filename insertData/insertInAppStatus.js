const db=require('../models');

const insertInAppStatus=db.approvalstatus;
insertInAppStatus.create({
    applicationid: 1,
    empmail: "specialvideos9303@gmail.com",
    adminmail: "specialvideos9303@gmail.com",
    status:'Approve',
}).then(res => {
    console.log(res)
}).catch((error) => {
    console.error('Failed to create a new record : ', error);
});