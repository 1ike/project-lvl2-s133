import getParams from '../src/params';


describe('params', function() {

  test('format default', () => {
    const argv = [
      'node',
      'C:\\TEMP\\Programming\\hexlet\\js2\\src\\bin\\gendiff.js',
      'la-la-la',
      'bla-bla-bla'
    ];
    const { pathToFile1, pathToFile2, fileFormat } = getParams(argv);

    expect(fileFormat).toBe('json');
    expect(pathToFile1).toBe('la-la-la');
    expect(pathToFile2).toBe('bla-bla-bla');

  });

  test('toLowerCase', () => {
    const argv = [
      'node',
      'C:\\TEMP\\Programming\\hexlet\\js2\\src\\bin\\gendiff.js',
      '-f',
      'YML',
      'la-la-la',
      'bla-bla-bla'
    ];
    const { fileFormat, pathToFile1, pathToFile2 } = getParams(argv);

    expect(fileFormat).toBe('yml');
    expect(pathToFile1).toBe('la-la-la');
    expect(pathToFile2).toBe('bla-bla-bla');

  });

});
