const {Op}=require('sequelize');
module.exports = (app, db) =>
{
    let arr=[]
    app.get("/appSinceDate", (req,res)=>{

        db.approvalstatus.findAll({
            attributes: ['applicationid'],
            raw : true
          }).then(dbUser=> {
            console.log(dbUser.length);
            for(let val=0;val<dbUser.length;val++){arr.push(Object.values(dbUser[val])[0])}
            console.log(arr)

          });
          
         db.Applications.findAll({
            where:{
                id:{[Op.notIn]: arr}
            }
         })
        .then(data=>{

         //  console.log(data.dataValues);
            res.status(200).json(data);
        })
        .catch(err=>{
            res.status(404).json({"message": "no data found"})
        })
    });
}

