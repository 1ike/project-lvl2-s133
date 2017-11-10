#!/usr/bin/env node

import program from 'commander';

import gendiff from '../';

program
  .version('0.3.3')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [json]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    const inputFormat = firstConfig.split('.').pop();

    console.log(gendiff(firstConfig, secondConfig, inputFormat, program.format));
  })
  .parse(process.argv);

if (!program.args.length) program.help();
