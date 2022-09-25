
const {fn}=require('../mailbox/index')
const { Op } = require("sequelize");
module.exports =(app, db) =>
{
    app.post("/searchApp",  (req,res)=>{
        const date= req.body.date;
        console.log("requiested date is:",date);
         fn(date);

       db.Applications.findAll({})
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err=>{
            res.status(404).json({"message": "no data found"})
        })
    });
    app.get("/searchbydate/:id",  (req,res)=>{

        let date= req.params.id;
        date=new Date(date);
        const endDate=date;
        const startedDate=new Date();
        db.Applications.findAll({ where: { "createdAt" : {[Op.gte] : endDate }} })
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err=>{
            res.status(404).json({"message": "no data found"})
        })
        console.log("requiested date is working:",date);
    });
}