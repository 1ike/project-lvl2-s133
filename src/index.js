import getParams from './params';
const fs = require('fs');

const { argv } = process;
console.log('obj:', argv);
const {
  program: options,
  pathToFile1: path1,
  pathToFile2: path2
} = getParams(argv);


console.log('options.format:', options.format);
const gendiff = (pathToFile1, pathToFile2) => {
  console.log('pathToFile1:', pathToFile1);
  const file1 = fs.readFileSync(pathToFile1);
  const file2 = fs.readFileSync(pathToFile2);

  const ast1 = file1.split('\n');
  console.log('ast1:', ast1);

};

gendiff(path1, path2);

export const launch = () => gendiff(path1, path2);
export { gendiff };
