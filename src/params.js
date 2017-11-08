import program from 'commander';

export default (argv) => {
  program
    .version('0.3.2')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<firstConfig> <secondConfig>')
    .option('-f, --format [json]', 'Output format')
    .parse(argv);

  if (!program.args.length) program.help();

  const [pathToFile1, pathToFile2] = program.args;

  const fileFormat = program.format ? program.format.toLowerCase() : 'json';

  return { pathToFile1, pathToFile2, fileFormat };
};
