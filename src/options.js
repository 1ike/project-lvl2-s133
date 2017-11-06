var program = require('commander');


export default () => {

  program
    .version('0.0.1')
    .option('-f, --foo', 'enable some foo')
    .option('-b, --bar', 'enable some bar')
    .option('-B, --baz', 'enable some baz')
    .parse(process.argv);

  if (!program.args.length) program.help();

  console.log('Hello!');

}
