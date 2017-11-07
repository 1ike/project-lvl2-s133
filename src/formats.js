import yamlParser from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yaml: yamlParser.safeLoad,
  yml: yamlParser.safeLoad,
};

const formats = Object.keys(parsers);

export { parsers, formats };
