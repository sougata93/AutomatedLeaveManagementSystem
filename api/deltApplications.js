module.exports = (app, db) =>
{
    app.delete("/delete/:id",(req,res)=>{
        db.Applications.destroy
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