const imaps = require('imap-simple');
const { convert } = require('html-to-text');
const { READ_MAIL_CONFIG } = require('./mailconfig');

const mailBody = async (date) => {
  try {
    let emailText='';
    let etext='';
    let mlist=[];
    const connection = await imaps.connect(READ_MAIL_CONFIG);
   console.log('CONNECTION SUCCESSFUL', new Date().toString());
    const box = await connection.openBox('INBOX');
   // const d=new Date('8/28/2022')
    const searchCriteria = ['ALL',['TEXT','leave'],['SINCE',date]];
    const fetchOptions = {
      bodies: ['HEADER', 'TEXT'],
      markSeen: false,
    };
    const results = await connection.search(searchCriteria, fetchOptions);
    results.forEach((res) => {
      const text = res.parts.filter((part) => {
        return part.which === 'TEXT';
      });
      let emailHTML = text[0].body;
    let emailText = convert(emailHTML);
    etext=emailText.split('Content-Type: text/')[1];
       mlist.push(emailText);
    });
    connection.end();
   return mlist;
    
  } catch (error) {
    console.log(error);
  }
};
module.exports ={ mailBody}; 
