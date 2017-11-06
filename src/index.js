import getParams from './params';

const { program: options, pathToFile1, pathToFile2 } = getParams();

console.log(options.format);
console.log(pathToFile1);
console.log(pathToFile2);
const gendiff = (pathToFile1, pathToFile2) => {


};


export const launch = () => 'поехали';
export { gendiff };
