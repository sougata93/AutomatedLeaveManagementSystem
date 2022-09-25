const fs=require('fs');
const mtext=require('./mailbody');

const getText=async (index,date)=>{
  //const text=fs.readFileSync("mailbox/mail2.txt","UTF-8");
   const rdta= await mtext.mailBody(date);
   const text=rdta;
   let datag=text[index].replace(/--00/g, '');
   return datag;
};
module.exports={getText};
