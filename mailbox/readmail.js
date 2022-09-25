const imaps = require('imap-simple');
const { READ_MAIL_CONFIG } = require('./mailconfig');

const readMail = async (date) => {
  try {
    let emailText='';
    let etext='';
    let mlist=[];
    const connection = await imaps.connect(READ_MAIL_CONFIG);
   // console.log('CONNECTION SUCCESSFUL', new Date().toString());
    const box = await connection.openBox('INBOX');
    const searchCriteria = ['ALL',['TEXT','leave'],['SINCE',date]];
    const fetchOptions = {
      bodies: ['HEADER', 'TEXT'],
      markSeen: false,
    };
    const results = await connection.search(searchCriteria, fetchOptions);
    results.forEach((res) => {
      try{
      const text = res.parts.filter((part) => {
        return part.which === 'HEADER';
      });
      let emailHTML = text[0].body;
     //emailText = convert(emailHTML);
      etext=emailHTML['from'];
  mlist.push(etext[0]);
    }
    catch(e){console.log('catch error',e)}
    });
    connection.end();
   // console.log(mlist);
    return mlist;
  } catch (error) {
    console.log(error);
  }
};
module.exports ={ readMail}; 
