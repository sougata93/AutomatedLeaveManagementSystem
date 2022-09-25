const isPrev=require('../models');
const app=isPrev.Applications;
const isPrevData=async (email,appfrom,appto)=>{
//console.log("this is isemp de:"+appfrom);
  const count= await app.count({ where: { empmail:email,applyfrom:appfrom,applyto:appto} });
  if (count==0) {
    console.log("no prev data");
    return 1;
  } else {
    console.log("record fount");
 return 0;
  }
};
module.exports={isPrevData}

///console.log(isPrevData('sougatamahata@gmail.com','12.9.2022','17.9.2022'));