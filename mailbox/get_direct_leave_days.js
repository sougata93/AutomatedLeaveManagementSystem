const directLeave=(data)=>{
let f1=/(\d{1,2}(DAYSLEAVE))/g;
let f2=/(\d{1,2}(DAYLEAVE))/g;
let f3=/(\d{1,2}(-DAYLEAVE))/g;
let f4=/((LEAVEFOR)\d{1,2}(DAYS))/g;
let f5=/((LEAVEFOR)\d{1,2}(-DAYS))/g;
let f6=/(\d{1,2}(LEAVE))/g;
let f7=/(\d{1,2}(LEAVES))/g;
if(data.match(f1)){return data.match(f1)[0];}
if(data.match(f2)){return data.match(f2)[0];}
if(data.match(f3)){return data.match(f3)[0];}
if(data.match(f4)){return data.match(f4)[0];}
if(data.match(f5)){return data.match(f5)[0];}
if(data.match(f6)){return data.match(f6)[0];}
if(data.match(f7)){return data.match(f7)[0];}
};

module.exports={directLeave};