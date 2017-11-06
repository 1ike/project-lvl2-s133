const program = require('commander');


export default () => {
  program
    .version('0.0.6')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<firstConfig> <secondConfig>')
    .option('-f, --format [type]', 'Output format')
    .parse(process.argv);

  const { length } = program.args;
  if (!length) program.help();

  const pathToFile1 = program.args[length - 2];
  const pathToFile2 = program.args[length - 1];

  return { program, pathToFile1, pathToFile2 };
};
