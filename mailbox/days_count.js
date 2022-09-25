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
	return days_diff+1;	
};

module.exports={datediff}; 
