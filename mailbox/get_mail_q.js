const fs=require('fs');
const mtext=require('./readmail');

const getMail=async (date)=>{
  let mq=[];
   const rdta= await mtext.readMail(date);
   console.log(rdta)
   const f=/<.+>/g;
   const f2=/([<"''">])/g;
   const l= rdta.length
   let jsontext='';
   for(let i=0;i<l;i++)
   {
    let t1='';
    let t2='';
    jsontext=rdta[i];
    if(jsontext.match(f)){
      t1=jsontext.match(f);
      t2=t1[0].replace(f2,'');
      mq.push(t2)}
    else{mq.push(rdta[i])}
   }
   const text=rdta;
   return mq;
};
module.exports={getMail};