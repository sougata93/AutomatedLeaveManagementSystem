module.exports = (app, db) =>
{
    app.put("/empupdate/:id",(req,res)=>{
        db.adminDetails.update
        (req.body,{
            where: {id:req.params.id},
        })
        .then(data=>{
            console.log("Updated successfully")
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({"message": "Can't update"});
        })
    });

    app.delete("/empdelete/:id",(req,res)=>{
        db.empDetails.destroy
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