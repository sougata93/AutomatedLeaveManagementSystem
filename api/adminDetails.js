
module.exports = (app, db) =>
{
    app.get("/admindetails", (req,res)=>{
         db.adminDetails.findAll({})
        .then(data=>{

          //  console.log(data.dataValues);
            res.status(200).json(data);
        })
        .catch(err=>{
            res.status(404).json({"message": "no data found"})
        })
    });

    app.post("/addadmin", (req,res)=>{
        var user={
            name:req.body.ename,
            mail:req.body.mail,
            passcode:req.body.passcode,
        };
        console.log(user);
      db.adminDetails.create({
            name: user['name'],
            email: user['mail'],
            passcode:user['passcode']}) 
        .then((data)=>{
            res.status(200).json(data);
        })
        .catch(err=>{
            res.status(404).json({"message": "unable to insert data"})
        });
    
});

    app.delete("/deleteadmin/:id",(req,res)=>{
        db.adminDetails.destroy
        ({
            where: {id:req.params.id},
        })
        .then(data=>{
            console.log("Deleted successfully")
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({"message": "Can't delete"});
        })
    });
}