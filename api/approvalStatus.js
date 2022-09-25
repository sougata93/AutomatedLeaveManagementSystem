
module.exports = (app, db) =>
{
    app.get("/approvalstatus", (req,res)=>{
        db.approvalstatus.findAll({})
       .then(data=>{

         //  console.log(data.dataValues);
           res.status(200).json(data);
       })
       .catch(err=>{
           res.status(404).json({"message": "no data found"})
       })
   });
}