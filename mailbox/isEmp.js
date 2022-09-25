const isEmp=require('../models');
const emp=isEmp.empDetails;
const isEmployee=async (email)=>{
// console.log("this is isemp de:"+email);
  const user = await emp.findAll({ where: { email: email} });
  if (user.length==0) {
    return null;
  } else {
//  console.log(user.dataValues);
    //console.log(user.leave);
   // return user.dataValues;
 return 1;
  }
};
module.exports={isEmployee}
