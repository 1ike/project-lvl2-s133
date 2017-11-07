#!/usr/bin/env node

import gendiff from '../';
import getParams from '../params';

const { argv } = process;

const { pathToFile1, pathToFile2, fileFormat } = getParams(argv);

console.log(gendiff(pathToFile1, pathToFile2, fileFormat));
