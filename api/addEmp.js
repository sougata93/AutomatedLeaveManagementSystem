module.exports = (app, db) =>
{
    app.post("/addEmp", (req,res)=>{
        var user={
            name:req.body.ename,
            mail:req.body.mail,
            leave:req.body.leave,
            salary:req.body.salary,
            passcode:req.body.passcode,
        };
        console.log(user);
      db.empDetails.create({
            name: user['name'],
            email: user['mail'],
            leave: user['leave'],
            salary:user['salary'],
            passcode:user['passcode']}) 
        .then((data)=>{
            res.status(200).json(data);
        })
        .catch(err=>{
            res.status(404).json({"message": "unable to insert data"})
        });
    
})
}