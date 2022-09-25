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

module.exports={leaveCount};