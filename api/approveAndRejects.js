const {readdata}=require('../mailbox/retLeave');
const {updateLeave}=require('../mailbox/updateLeave');
//const {readdata}=require('../mailbox/retLeave');


module.exports = async (app, db) =>
{
    let mail='';
    let leave='';
    let status=''
    
    app.post("/approveAndRejects", (req,res)=>{
        var user={
            id:req.body.id,
            empmail:req.body.empmail,
            adminmail:req.body.adminmail,
            status:req.body.status,
            leave:req.body.leave
        };
        console.log(user);

    mail=user["empmail"];
    leave=user["leave"];
    status=user["status"]
    
   updateLeave(db,mail,leave)


db.approvalstatus.create({
    applicationid: user["id"],
    empmail: user["empmail"],
    adminmail: user["adminmail"],
    status:user["status"],
}) .then((data)=>{
    res.status(200).json(data);
})
.catch(err=>{
    res.status(404).json({"message": "unable to insert data"})
});
})


}