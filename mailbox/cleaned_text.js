const { wordsToNumbers } = require('words-to-numbers');
const {getText}=require('./get_text');

const clean_data=async (index,date)=>{
    let data=await getText(index,date);
    let str=wordsToNumbers(data).toUpperCase();
    const cleanedData = str.replace(/\s+/g, '');
    return cleanedData;
};
module.exports={clean_data};
