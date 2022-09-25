

const getDateQ=(data)=>{
    const f1=/(\d{1,4}([.\-/])\d{1,2}([.\-/])\d{1,4})/g;
    let DateQ=data.match(f1);
    return DateQ;
};

module.exports={getDateQ};
