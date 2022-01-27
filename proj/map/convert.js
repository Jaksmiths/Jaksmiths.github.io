const csvToJson = require('convert-csv-to-json');
 
const input = './Microplastic_Data_SEA_NorthAtlantic.csv'; 
const output = './Microplastic_Data.json';
 
csvToJson.fieldDelimiter(',')
         .formatValueByType()
         .generateJsonFileFromCsv(input, output);