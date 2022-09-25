const {getMailLeave}=require('./home');

const fn=async(date)=>{
    const fdate= new Date(date);
    const data=await getMailLeave(fdate);
   console.log(data);
}
module.exports={fn}
//fn("9.09.2022")