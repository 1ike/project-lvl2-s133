const program = require('commander');

export default (argv) => {
  program
    .version('0.1.0')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<firstConfig> <secondConfig>')
    .option('-f, --format [json]', 'Output format')
    .parse(argv);

  const { length } = argv;
  if (length === 2) program.help();

  const pathToFile1 = argv[length - 2];
  const pathToFile2 = argv[length - 1];

  return { program, pathToFile1, pathToFile2 };
};
