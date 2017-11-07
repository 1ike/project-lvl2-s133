import program from 'commander';

export default (argv) => {
  program
    .version('0.3.1')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<firstConfig> <secondConfig>')
    .option('-f, --format [json]', 'Output format')
    .parse(argv);

  if (!program.args.length) program.help();

  const pathToFile1 = program.args[0];
  const pathToFile2 = program.args[1];

  const fileFormat = program.format ? program.format.toLowerCase() : 'json';

  return { pathToFile1, pathToFile2, fileFormat };
};
