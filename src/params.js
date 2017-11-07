import program from 'commander';
import { formats } from './formats';

export default (argv) => {
  program
    .version('0.1.1')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<firstConfig> <secondConfig>')
    .option('-f, --format [json]', 'Output format')
    .parse(argv);

  if (!program.args.length) program.help();

  const pathToFile1 = program.args[0];
  const pathToFile2 = program.args[1];

  const fileFormat = program.format ? program.format.toLowerCase() : 'json';

  if (formats.indexOf(fileFormat) < 0) {
    throw new Error(`Format "${fileFormat}" is not supported.`);
  }

  return { pathToFile1, pathToFile2, fileFormat };
};
