
module.exports = (app, db) =>
{
    app.get("/empDetails", (req,res)=>{
         db.empDetails.findAll({})
        .then(data=>{

          //  console.log(data.dataValues);
            res.status(200).json(data);
        })
        .catch(err=>{
            res.status(404).json({"message": "no data found"})
        })
    });

    app.get("/empDetails/:id", (req,res)=>{
        db.empDetails.findOne({id:req.body.id})
       .then(data=>{

         //  console.log(data.dataValues);
           res.status(200).json(data);
       })
       .catch(err=>{
           res.status(404).json({"message": "no data found"})
       })
   });
}