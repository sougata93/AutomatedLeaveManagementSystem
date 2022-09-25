const isEmp=require('../models');
const empDetails=isEmp.empDetails;
const readdata=async (email)=>{
 
    // console.log('my read data section'+email);
     const [user] = await empDetails.findAll({ where: { email: email } });
   
     if (user === null) {
       console.log('Not found!');
     } else {
       return user.leave;
   
     }
   };
   
   module.exports={readdata}
   
   //readdata()