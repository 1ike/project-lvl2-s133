import getParams from './params';

const argv = process.argv;
const { program: options, pathToFile1, pathToFile2 } = getParams(argv);

console.log(options.format);
console.log(pathToFile1);
console.log(pathToFile2);
const gendiff = (pathToFile1, pathToFile2) => {


};


export const launch = () => 'поехали';
export { gendiff };
