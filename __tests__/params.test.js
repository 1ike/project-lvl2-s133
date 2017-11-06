import getParams from '../src/params';


test('params', () => {
  const argv = [
    'node',
    'C:\\TEMP\\Programming\\hexlet\\js2\\src\\bin\\gendiff.js',
    '-f',
    'yml',
    'la-la-la',
    'bla-bla-bla'
  ];
  const { program: options, pathToFile1, pathToFile2 } = getParams(argv);

  expect(options.format).toBe('yml');
  expect(pathToFile1).toBe('la-la-la');
  expect(pathToFile2).toBe('bla-bla-bla');

});
