#!/usr/bin/env node

import gendiff from '../';
import getParams from '../params';


const { pathToFile1, pathToFile2, fileFormat } = getParams(process.argv);

console.log(gendiff(pathToFile1, pathToFile2, fileFormat));
