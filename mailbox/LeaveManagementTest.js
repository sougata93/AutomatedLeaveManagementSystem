const { Sequelize,DataTypes } = require('sequelize');
const imaps = require('imap-simple');
const { convert } = require('html-to-text');
const { wordsToNumbers } = require('words-to-numbers');
const db = new Sequelize(
    'postgres',
    'postgres',
    'sougata1234',
     {
       host: 'localhost',
       dialect: 'postgres'
     }
   );
   const mymodel=db.define('emp',{
    eid:{type:DataTypes.INTEGER},
    name:{type:DataTypes.STRING },
    mail:{type:DataTypes.STRING},
    leave:{type:DataTypes.INTEGER}
});
const isEmployee=async (email)=>{
      const user = await mymodel.findAll({ where: { mail: email} });
      if (user.length==0) {
        return null;
      } else {     return 1;}
    };
    const readdata=async (email)=>{
         const [user] = await mymodel.findAll({ where: { mail: email } });
         if (user === null) {
           console.log('Not found!');
         } else {
           return user.leave;
         }
       };
       const updateLeave=async (email,lv)=>{
        await mymodel.update(
         {leave: lv,},
         {where: { mail: email },}
       );}
       const READ_MAIL_CONFIG = {
        imap: {
          user: 'sougatamahata93@gmail.com',
          password: 'kwwwxlxlnkspjvlo',
          host: 'imap.gmail.com',
          port: 993,
          authTimeout: 10000,
          tls: true,
          tlsOptions: { rejectUnauthorized: false },
        },
      };
      const mailBody = async (date) => {
        try {
          let emailText='';
          let etext='';
          let mlist=[];
          const connection = await imaps.connect(READ_MAIL_CONFIG);
         // console.log('CONNECTION SUCCESSFUL', new Date().toString());
          const box = await connection.openBox('INBOX');
          const d=new Date('8/28/2022')
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
      const leaveCount=(date1,daycount)=>{
        let res=daycount%7;
        let day1 = new Date(date1);
        let wk=Math.trunc(daycount/7);
        let d_day=day1.getDay();
        let extra=0;
        if(res>0){
            for(let i=1;i<=res;i++)
            {
                if((Math.trunc((d_day+i-1)%7))==0){extra++;}
                if((d_day+i-1)==0){extra++;}
            }
        }
        //console.log(extra);
        return daycount-wk*2-extra;
    };
    const getText=async (index,date)=>{
        //const text=fs.readFileSync("mailbox/mail2.txt","UTF-8");
         const rdta= await mailBody(date);
         const text=rdta;
         let datag=text[index].replace(/--00/g, '');
         return datag;
      };
    const clean_data=async (index,date)=>{
        let data=await getText(index,date);
        let str=wordsToNumbers(data).toUpperCase();
        const cleanedData = str.replace(/\s+/g, '');
        return cleanedData;
    };
    const datediff=(str1,str2)=>{
        let d1=0,m1=0,y1=0;
        let d2=0,m2=0,y2=0;
        const f1=/(\d{1,2}([.\-/])\d{1,2}([.\-/])\d{1,4})/g;
        const f2=/(\d{1,4}([.\-/])\d{1,2}([.\-/])\d{1,2})/g;
        const mch=/[.\-/]/;
        let dmy1=[];
        let dmy2=[];
        let operator1=str1.match(mch);
        let operator2=str2.match(mch);
        
        if(str1.match(f1))
            {
                dmy1=str1.split(operator1[0]);
                d1=parseInt(dmy1[0]);
                m1=parseInt(dmy1[1]);
                y1=parseInt(dmy1[2]);
                str1=dmy1[1]+'/'+dmy1[0]+'/'+dmy1[2];
            }
        if(str2.match(f1))
            {
                dmy2=str2.split(operator2[0]);
                d2=parseInt(dmy2[0]);
                m2=parseInt(dmy2[1]);
                y2=parseInt(dmy2[2]);
                str2=dmy2[1]+'/'+dmy2[0]+'/'+dmy2[2];
                //console.log(d2);
            }
        const date1 = new Date(str1);  
        const date2 = new Date(str2);
      
        let time_diff = date2.getTime() - date1.getTime();  
     
        var days_diff = time_diff / (1000 * 60 * 60 * 24); 
        return days_diff;	
    };
    const getDateQ=(data)=>{
        const f1=/(\d{1,4}([.\-/])\d{1,2}([.\-/])\d{1,4})/g;
        let DateQ=data.match(f1);
        return DateQ;
    };
    const getMail=async (date)=>{
        let mq=[];
         const rdta= await readMail(date);
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
      const getMailLeave=async (date)=>{
        let data1=[];
        let mq= await getMail(date);
        const l=mq.length;
        for(let i=0;i<l;i++){if(await isEmployee(mq[i])){
           // console.log('record found')
        
            let data=await clean_data(i,date);
        
            const dateQ=await getDateQ(data);
            let date1=dateQ[0];
            let date2=dateQ[1];
            const dayCount=await datediff(date1,date2);
            //const direct_leave=directLeave(data);
           // console.log(dateQ);
            const actuaLeave=await leaveCount(date1,dayCount);
           // console.log(actuaLeave);
            const prevLeave=await readdata(mq[i]);
            await updateLeave(mq[i],prevLeave-actuaLeave);
            let remaining_leave=await readdata(mq[i]);
            data1.push({MailId:mq[i],Remaining_leave:remaining_leave});
          //  console.log('emai id is'+mq[i]+' and remaining leave count is :'+remaining_leave);
            
        
        }else{//console.log('Record Not Found');
        }
        }
        //console.log(data1)
        return data1;
        }
        let fn=async(date)=>{
            const date= new Date(date);
            const data=await getMailLeave(date);
           console.log(data);
        }

     
        fn('08/28/2022');