
const empDetails = require('../models/empDetails');

const {readdata}=require('./retLeave')


const updateLeave= async (db,email,lv)=>{
  const prevleave= await readdata(email);
  console.log("code is here");
    db.empDetails.update(
    {leave: (prevleave- lv),},
    {where: { email: email },}
  );
}

module.exports={updateLeave}

//updateLeave('itupload2022@gmail.com',15);