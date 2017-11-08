import program from 'commander';

const toLowerCase = val => val.toLowerCase();

let pathToFile1;
let pathToFile2;

export default (argv) => {
  program
    .version('0.3.2')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [json]', 'Output format', toLowerCase, 'json')
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfig, secondConfig) => {
      pathToFile1 = firstConfig;
      pathToFile2 = secondConfig;
    })
    .parse(argv);

  if (!program.args.length) program.help();

  return { pathToFile1, pathToFile2, fileFormat: program.format };
};
