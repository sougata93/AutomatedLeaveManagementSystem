const getMailQ=require('./get_mail_q');
const {isEmployee}=require('../mailbox/isEmp');
const {clean_data}=require('../mailbox/cleaned_text');
const {datediff}=require("../mailbox/days_count");
const {directLeave}=require("./get_direct_leave_days");
const {leaveCount,getday}=require("./actual_leave_count");
const {getDateQ}=require("./get_date_queue");
const {readdata}=require('./retLeave');
const {updateLeave}=require("./updateLeave");
const {insertApps}=require("../insertData/insertInApplications");
const {isPrevData}=require("../findData/isPrevData");
const getMailLeave=async (date)=>{
let data1=[];
let mq= await getMailQ.getMail(date);
const l=mq.length;
for(let i=0;i<l;i++){if(await isEmployee(mq[i])){
    let data=await clean_data(i,date);
    const dateQ=await getDateQ(data);
    let date1=dateQ[0];
    let date2=dateQ[1];
    const dayCount=await datediff(date1,date2);
   
   // console.log(dateQ);
    const actuaLeave=await leaveCount(date1,dayCount);
   // console.log(actuaLeave);
   if(await isPrevData(mq[i],date1,date2)){
  await insertApps(mq[i],date1,date2,actuaLeave);}
    const prevLeave=await readdata(mq[i]);
   // await updateLeave(mq[i],prevLeave-actuaLeave);
    let remaining_leave=await readdata(mq[i]);
    data1.push({MailId:mq[i],Remaining_leave:remaining_leave});

  //  console.log('emai id is'+mq[i]+' and remaining leave count is :'+remaining_leave);
    

}else{//console.log('Record Not Found');
}
}
//console.log(data1)
return data1;
}
module.exports={getMailLeave};
//getMailLeave()
