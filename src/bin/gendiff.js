#!/usr/bin/env node

import path from 'path';
import program from 'commander';

import gendiff from '../';

program
  .version('0.4.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [json]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    const inputFormat = path.extname(firstConfig).slice(1);

    console.log(gendiff(firstConfig, secondConfig, inputFormat, program.format));
  })
  .parse(process.argv);

if (!program.args.length) program.help();
